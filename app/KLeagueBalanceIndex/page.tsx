'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

// CSV 파일 경로
const CSV_FILES = {
  '2021': '/2021matches.csv',
  '2022': '/2022matches.csv',
  '2023': '/2023matches.csv',
};

const KLeagueBalanceIndex: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2021');
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [team1, setTeam1] = useState<string>('');
  const [team2, setTeam2] = useState<string>('');
  const [compareData, setCompareData] = useState<any[]>([]);
  const filteredTeamsData = teamsData.slice(0, 12);

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
        const data = calculateTeamStats(csvData);
        setTeamsData(data);
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, [selectedYear]);

  const calculateTeamStats = (data: any[]) => {
    const teams = data.reduce((acc: any, item: any) => {
      const homeTeam = item["홈 팀 이름"];
      const awayTeam = item["원정 팀 이름"];

      if (!acc[homeTeam]) {
        acc[homeTeam] = {
          name: homeTeam,
          homeBalanceIndex: 0,
          homeAttack: 0,
          homeDefense: 0,
          awayBalanceIndex: 0,
          awayAttack: 0,
          awayDefense: 0,
          count: 0,
        };
      }

      if (!acc[awayTeam]) {
        acc[awayTeam] = {
          name: awayTeam,
          homeBalanceIndex: 0,
          homeAttack: 0,
          homeDefense: 0,
          awayBalanceIndex: 0,
          awayAttack: 0,
          awayDefense: 0,
          count: 0,
        };
      }

      // 홈 팀 공격력 지표
      const homeAttackIndicators = [
        parseInt(item["홈 팀 코너킥 수"]) || 0,
        parseInt(item["홈 팀 슛 수"]) || 0,
        parseInt(item["홈 팀 유효 슛 수"]) || 0,
        parseInt(item["홈 팀 득점 수"]) || 0,
        parseFloat(item["홈 팀 기대 득점 (xG)"]) || 0,
        parseFloat(item["홈 팀 패스 성공률"]) || 0,
        parseFloat(item["홈 팀 공격진영 패스 성공률"]) || 0,
        parseInt(item["홈 팀 키패스 수"]) || 0,
        parseInt(item["홈 팀 크로스 시도"]) || 0,
        parseFloat(item["홈 팀 크로스 성공률"]) || 0,
      ];

      // 홈 팀 수비력 지표
      const homeDefenseIndicators = [
        parseFloat(item["홈 팀 수비진영 패스 성공률"]) || 0,
        parseInt(item["홈 팀 클리어링"]) || 0,
        parseInt(item["홈 팀 인터셉트"]) || 0,
        parseInt(item["홈 팀 차단"]) || 0,
        parseInt(item["홈 팀 블락"]) || 0,
      ];

      // 원정 팀 공격력 지표
      const awayAttackIndicators = [
        parseInt(item["원정 팀 코너킥 수"]) || 0,
        parseInt(item["원정 팀 슛 수"]) || 0,
        parseInt(item["원정 팀 유효 슛 수"]) || 0,
        parseInt(item["원정 팀 득점 수"]) || 0,
        parseFloat(item["원정 팀 기대 득점 (xG)"]) || 0,
        parseFloat(item["원정 팀 패스 성공률"]) || 0,
        parseFloat(item["원정 팀 공격진영 패스 성공률"]) || 0,
        parseInt(item["원정 팀 키패스 수"]) || 0,
        parseInt(item["원정 팀 크로스 시도"]) || 0,
        parseFloat(item["원정 팀 크로스 성공률"]) || 0,
      ];

      // 원정 팀 수비력 지표
      const awayDefenseIndicators = [
        parseFloat(item["원정 팀 수비진영 패스 성공률"]) || 0,
        parseInt(item["원정 팀 클리어링"]) || 0,
        parseInt(item["원정 팀 인터셉트"]) || 0,
        parseInt(item["원정 팀 차단"]) || 0,
        parseInt(item["원정 팀 블락"]) || 0,
      ];

      const homeAttackScore = homeAttackIndicators.reduce((sum, val) => sum + val, 0) / homeAttackIndicators.length;
      const homeDefenseScore = homeDefenseIndicators.reduce((sum, val) => sum + val, 0) / homeDefenseIndicators.length;
      const awayAttackScore = awayAttackIndicators.reduce((sum, val) => sum + val, 0) / awayAttackIndicators.length;
      const awayDefenseScore = awayDefenseIndicators.reduce((sum, val) => sum + val, 0) / awayDefenseIndicators.length;

      // 홈 팀 통계 업데이트
      acc[homeTeam].homeAttack += homeAttackScore;
      acc[homeTeam].homeDefense += homeDefenseScore;
      acc[homeTeam].count += 1;

      // 원정 팀 통계 업데이트
      acc[awayTeam].awayAttack += awayAttackScore;
      acc[awayTeam].awayDefense += awayDefenseScore;
      acc[awayTeam].count += 1;

      return acc;
    }, {});

    // 팀별 평균 전력 균형 지수 계산
    const finalTeamsData = Object.values(teams).map((team: any) => ({
      ...team,
      homeAttack: team.homeAttack / team.count,
      homeDefense: team.homeDefense / team.count,
      awayAttack: team.awayAttack / team.count,
      awayDefense: team.awayDefense / team.count,
      homeBalanceIndex: (team.homeAttack + team.homeDefense) / 2,
      awayBalanceIndex: (team.awayAttack + team.awayDefense) / 2,
    }));

    // 전력 균형 지수, 공격 지수, 수비 지수 순위 계산
    finalTeamsData.sort((a: any, b: any) => b.homeBalanceIndex - a.homeBalanceIndex);
    finalTeamsData.forEach((team: any, index: number) => team.homeBalanceRank = index + 1);

    finalTeamsData.sort((a: any, b: any) => b.awayBalanceIndex - a.awayBalanceIndex);
    finalTeamsData.forEach((team: any, index: number) => team.awayBalanceRank = index + 1);

    finalTeamsData.sort((a: any, b: any) => b.homeAttack - a.homeAttack);
    finalTeamsData.forEach((team: any, index: number) => team.attackRank = index + 1);

    finalTeamsData.sort((a: any, b: any) => b.homeDefense - a.homeDefense);
    finalTeamsData.forEach((team: any, index: number) => team.defenseRank = index + 1);

    return finalTeamsData;
  };

  const handleTeamClick = (team: any) => {
    setSelectedTeam(team);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCompare = () => {
    const compare = teamsData.filter(team => team.name === team1 || team.name === team2);
    setCompareData(compare);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">K리그 전력 균형 지수</h1>

        {/* 전력 균형 지수 설명 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-700">전력 균형 지수란?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              전력 균형 지수는 팀의 전반적인 경기력을 나타내는 지표입니다. 이 지수는 공격력과 수비력의 조화를 평가하여 계산되며, 팀이 얼마나 균형 잡힌 경기를 펼치는지를 보여줍니다.
              전력 균형 지수는 리그 내의 경쟁력을 파악하고, 향후 경기 성과를 예측하는 데 유용합니다.
            </p>
          </CardContent>
        </Card>

        {/* 년도 선택 */}
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

        {/* 전체 팀 전력 균형 지수 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-700">팀 홈 VS 원정 전력 균형 지수</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredTeamsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax + 5']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="homeBalanceIndex" stroke="#3b82f6" name="홈 전력 균형 지수" />
                <Line type="monotone" dataKey="awayBalanceIndex" stroke="#ef4444" name="원정 전력 균형 지수" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 팀 검색 및 비교 */}
        <div className="mb-6 flex justify-center space-x-4">
          <input
            type="text"
            placeholder="팀 1 검색"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="팀 2 검색"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="border p-2"
          />
          <button onClick={handleCompare} className="px-4 py-2 bg-blue-500 text-white rounded">
            비교하기
          </button>
        </div>

        {/* 팀 비교 결과 */}
        {compareData.length === 2 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-700">팀 비교 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={compareData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="homeBalanceIndex" fill="#3b82f6" name="홈 전력 균형 지수" />
                  <Bar dataKey="awayBalanceIndex" fill="#ef4444" name="원정 전력 균형 지수" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* 팀별 상세 데이터 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-semibold text-blue-700">팀별 상세 데이터</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="w-[100px] px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">팀</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">홈 전력 균형 지수</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">홈 전력 균형 지수 순위</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">원정 전력 균형 지수</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">원정 전력 균형 지수 순위</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">공격 지수 순위</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">수비 지수 순위</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">상세 정보</th>
                </tr>
              </thead>
              <tbody>
                {teamsData.map((team) => (
                  <tr key={team.name}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 font-medium text-gray-900">{team.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{team.homeBalanceIndex.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{team.homeBalanceRank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{team.awayBalanceIndex.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{team.awayBalanceRank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{team.attackRank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{team.defenseRank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                      <button
                        onClick={() => handleTeamClick(team)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        자세히 보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* 모달 */}
        {isDialogOpen && selectedTeam && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedTeam.name} 상세 정보</h3>
                <div className="mt-2 px-7 py-3">
                  <p>홈 전력 균형 지수: {selectedTeam.homeBalanceIndex.toFixed(2)}</p>
                  <p>원정 전력 균형 지수: {selectedTeam.awayBalanceIndex.toFixed(2)}</p>
                  <p>홈 공격력: {selectedTeam.homeAttack.toFixed(2)}</p>
                  <p>원정 공격력: {selectedTeam.awayAttack.toFixed(2)}</p>
                  <p>홈 수비력: {selectedTeam.homeDefense.toFixed(2)}</p>
                  <p>원정 수비력: {selectedTeam.awayDefense.toFixed(2)}</p>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    onClick={handleCloseDialog}
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KLeagueBalanceIndex;
