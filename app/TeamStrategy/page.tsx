'use client'
import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Link from 'next/link'; // Back to Home을 위한 Link 컴포넌트

// CSV 파일 경로
const CSV_FILES = {
  '2021': '/2021matches.csv',
  '2022': '/2022matches.csv',
  '2023': '/2023matches.csv'
};

export default function TeamStrategyAnalysis() {
  const [teamData, setTeamData] = useState<any>({});
  const [teamList, setTeamList] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [compareTeam, setCompareTeam] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2021');

  useEffect(() => {
    fetch(CSV_FILES[selectedYear])
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n').map(row => row.split(','));
        const headers = rows[0].map(header => header.trim());
        const csvData = rows.slice(1).map(row => {
          const item: any = {};
          headers.forEach((header, index) => {
            item[header] = row[index]?.trim();
          });
          return item;
        });

        // 데이터 가공
        const data = processTeamData(csvData);
        setTeamData(data);
        setTeamList(Object.keys(data));
        setSelectedTeam(Object.keys(data)[0]);
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, [selectedYear]); // selectedYear가 변경될 때마다 데이터 로드

  const processTeamData = (data: any[]) => {
    const teams: any = {};

    data.forEach(item => {
      const homeTeam = item["홈 팀 이름"];
      const awayTeam = item["원정 팀 이름"];

      if (!teams[homeTeam]) {
        teams[homeTeam] = initializeTeamData(homeTeam);
      }
      if (!teams[awayTeam]) {
        teams[awayTeam] = initializeTeamData(awayTeam);
      }

      // 홈 팀 데이터 업데이트
      updateTeamStats(teams[homeTeam], item, true);

      // 원정 팀 데이터 업데이트
      updateTeamStats(teams[awayTeam], item, false);
    });

    return teams;
  };

  const initializeTeamData = (teamName: string) => ({
    name: teamName,
    // formation: "Unknown", // 실제 데이터에 기반하여 설정
    possessionRate: 0,
    passAccuracy: 0,
    shotsPerGame: 0,
    tacklesPerGame: 0,
    goalsScored: 0,
    goalsConceded: 0,
    matchCount: 0
  });

  const updateTeamStats = (team: any, item: any, isHome: boolean) => {
    const possessionRateKey = isHome ? "홈 팀 점유율" : "원정 팀 점유율";
    const passAccuracyKey = isHome ? "홈 팀 패스 성공률" : "원정 팀 패스 성공률";
    const shotsPerGameKey = isHome ? "홈 팀 슛 수" : "원정 팀 슛 수";
    const tacklesPerGameKey = isHome ? "홈 팀 태클 성공" : "원정 팀 태클 성공";
    const goalsScoredKey = isHome ? "홈 팀 득점 수" : "원정 팀 득점 수";
    const goalsConcededKey = isHome ? "원정 팀 득점 수" : "홈 팀 득점 수";

    team.possessionRate += parseFloat(item[possessionRateKey]) || 0;
    team.passAccuracy += parseFloat(item[passAccuracyKey]) || 0;
    team.shotsPerGame += parseInt(item[shotsPerGameKey]) || 0;
    team.tacklesPerGame += parseInt(item[tacklesPerGameKey]) || 0;
    team.goalsScored += parseInt(item[goalsScoredKey]) || 0;
    team.goalsConceded += parseInt(item[goalsConcededKey]) || 0;
    team.matchCount += 1;
  };

  const resetData = () => {
    setSelectedTeam(teamList[0]);
    setCompareTeam(null);
  };

  const radarData = selectedTeam && teamData[selectedTeam]
    ? [
        { subject: '점유율', A: (teamData[selectedTeam].possessionRate / teamData[selectedTeam].matchCount).toFixed(2), B: compareTeam && teamData[compareTeam] ? (teamData[compareTeam].possessionRate / teamData[compareTeam].matchCount).toFixed(2) : null, fullMark: 100 },
        { subject: '패스 정확도', A: (teamData[selectedTeam].passAccuracy / teamData[selectedTeam].matchCount).toFixed(2), B: compareTeam && teamData[compareTeam] ? (teamData[compareTeam].passAccuracy / teamData[compareTeam].matchCount).toFixed(2) : null, fullMark: 100 },
        { subject: '슈팅', A: (teamData[selectedTeam].shotsPerGame / teamData[selectedTeam].matchCount).toFixed(2), B: compareTeam && teamData[compareTeam] ? (teamData[compareTeam].shotsPerGame / teamData[compareTeam].matchCount).toFixed(2) : null, fullMark: 20 },
        { subject: '태클', A: (teamData[selectedTeam].tacklesPerGame / teamData[selectedTeam].matchCount).toFixed(2), B: compareTeam && teamData[compareTeam] ? (teamData[compareTeam].tacklesPerGame / teamData[compareTeam].matchCount).toFixed(2) : null, fullMark: 30 },
        { subject: '득점', A: teamData[selectedTeam].goalsScored, B: compareTeam && teamData[compareTeam] ? teamData[compareTeam].goalsScored : null, fullMark: 80 },
        { subject: '실점', A: 100 - teamData[selectedTeam].goalsConceded, B: compareTeam && teamData[compareTeam] ? 100 - teamData[compareTeam].goalsConceded : null, fullMark: 100 },
      ]
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home 버튼 */}
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        K리그 팀별 전략 분석
      </h1>

      {/* 연도 선택 드롭다운 */}
      <div className="mb-6 text-center">
        <select
          className="border border-gray-300 rounded p-2"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          <option value="2021">2021년</option>
          <option value="2022">2022년</option>
          <option value="2023">2023년</option>
        </select>
      </div>
      
      {/* 팀 선택 드롭다운 */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        >
          {teamList.map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
        
        {/* 비교 팀 선택 드롭다운 */}
        <select
          value={compareTeam || ''}
          onChange={(e) => setCompareTeam(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
        >
          <option value="">비교할 팀 선택</option>
          {teamList.filter((team) => team !== selectedTeam).map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>

      {/* 리셋 버튼 */}
      <button 
        onClick={resetData}
        className="mb-6 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        데이터 초기화
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedTeam && teamData[selectedTeam] && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{selectedTeam} 전략 개요</h2>
            <div>
              {/* <p><strong>주 포메이션:</strong> {teamData[selectedTeam]?.formation}</p> */}
              <p className="text-1xl"><strong>점유율:</strong> {(teamData[selectedTeam]?.possessionRate / teamData[selectedTeam]?.matchCount).toFixed(2)}%</p>
              <p className="text-1xl"><strong>패스 정확도:</strong> {(teamData[selectedTeam]?.passAccuracy / teamData[selectedTeam]?.matchCount).toFixed(2)}%</p>
              <p className="text-1xl"><strong>경기당 슈팅:</strong> {(teamData[selectedTeam]?.shotsPerGame / teamData[selectedTeam]?.matchCount).toFixed(2)}</p>
              <p className="text-1xl"><strong>경기당 태클:</strong> {(teamData[selectedTeam]?.tacklesPerGame / teamData[selectedTeam]?.matchCount).toFixed(2)}</p>
              <p className="text-1xl"><strong>득점:</strong> {teamData[selectedTeam]?.goalsScored}</p>
              <p className="text-1xl"><strong>실점:</strong> {teamData[selectedTeam]?.goalsConceded}</p>
            </div>
          </div>
        )}

        {selectedTeam && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{selectedTeam} 전략 분석</h2>
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name={selectedTeam} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  {compareTeam && teamData[compareTeam] && (
                    <Radar name={compareTeam} dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  )}
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedTeam && teamData[selectedTeam] && (
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{selectedTeam} 전략 분석 리포트</h2>
            <div>
              <p>
                {selectedTeam}은(는) {teamData[selectedTeam]?.formation} 포메이션을 주로 사용하며, 
                {(teamData[selectedTeam]?.possessionRate / teamData[selectedTeam]?.matchCount).toFixed(2)}%의 높은 점유율을 바탕으로 경기를 운영합니다. 
                {(teamData[selectedTeam]?.passAccuracy / teamData[selectedTeam]?.matchCount).toFixed(2)}%의 정확한 패스 플레이로 공격의 기회를 만들어내고 있으며, 
                경기당 평균 {(teamData[selectedTeam]?.shotsPerGame / teamData[selectedTeam]?.matchCount).toFixed(2)}회의 슈팅으로 꾸준한 득점 기회를 만들어내고 있습니다.
              </p>
              <p className="mt-4">
                수비적인 면에서는 경기당 {(teamData[selectedTeam]?.tacklesPerGame / teamData[selectedTeam]?.matchCount).toFixed(2)}회의 태클로 상대의 공격을 차단하고 있습니다. 
                이번 시즌 {teamData[selectedTeam]?.goalsScored}골을 넣었고, {teamData[selectedTeam]?.goalsConceded}골을 실점하여 
                공수 밸런스가 잘 잡힌 팀이라고 평가할 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
