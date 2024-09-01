'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamPlayerPage() {
  const [players, setPlayers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedTeams, setExpandedTeams] = useState<string[]>([])

  useEffect(() => {
    // CSV 파일 경로 설정 (public 폴더 내 위치 가정)
    const csvFilePath = '/players.csv'

    // 파일 읽기
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
            setPlayers(results.data)
          },
        })
      })
  }, [])

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)
  }

  const toggleTeam = (team) => {
    setExpandedTeams(prev => 
      prev.includes(team) 
        ? prev.filter(t => t !== team) 
        : [...prev, team]
    )
  }

  // 팀 목록에 이미지 경로 및 추가 정보 포함
  const teams = [
    {
      id: "ulsan", 
      name: "울산 HD FC", 
      logo: "/ulsan.png",
      coach: "김판곤",
      founded: "1983년",
      stadium: "울산문수축구경기장",
      keyPlayers: ["이청용", "오세훈", "박용우"],
      formation: "4-3-3"
    },
    {
      id: "jeonbuk", 
      name: "전북 현대 모터스", 
      logo: "/jeonbuk.png",
      coach: "김두현",
      founded: "1994년",
      stadium: "전주월드컵경기장",
      keyPlayers: ["구자철", "송민규", "김진수"],
      formation: "4-2-3-1"
    },
    {
      id: "daegu", 
      name: "대구FC", 
      logo: "/daegu.png",
      coach: "박창현",
      founded: "2002년",
      stadium: "DGB대구은행파크",
      keyPlayers: ["세징야", "정태욱", "에드가"],
      formation: "3-5-2"
    },
    {
      id: "jeju", 
      name: "제주 유나이티드", 
      logo: "/jeju.png",
      coach: "김학범",
      founded: "1982년",
      stadium: "제주월드컵경기장",
      keyPlayers: ["김승대", "윤빛가람", "최영준"],
      formation: "4-4-2"
    },
    {
      id: "incheon", 
      name: "인천 유나이티드", 
      logo: "/incheon.png",
      coach: "최영근",
      founded: "2003년",
      stadium: "인천축구전용경기장",
      keyPlayers: ["무고사", "김도혁", "김동민"],
      formation: "3-4-3"
    },
    {
      id: "pohang", 
      name: "포항 스틸러스", 
      logo: "/pohang.png",
      coach: "박태하",
      founded: "1973년",
      stadium: "포항스틸야드",
      keyPlayers: ["일류첸코", "신진호", "에드가"],
      formation: "3-5-2"
    },
    {
      id: "gangwon", 
      name: "강원FC", 
      logo: "/gangwon.png",
      coach: "윤정환",
      founded: "2008년",
      stadium: "강릉종합운동장",
      keyPlayers: ["세징야", "정태욱", "에드가"],
      formation: "3-5-2"
    },
    {
      id: "suwon", 
      name: "수원FC", 
      logo: "/suwon.png",
      coach: "김은중",
      founded: "2003년",
      stadium: "수원종합운동장",
      keyPlayers: ["세징야", "정태욱", "에드가"],
      formation: "3-5-2"
    },
    {
      id: "seoul", 
      name: "FC서울", 
      logo: "/seoul.png",
      coach: "김기동",
      founded: "1983년",
      stadium: "서울상암월드컵경기장",
      keyPlayers: ["세징야", "정태욱", "에드가"],
      formation: "3-5-2"
    },
    {
      id: "gwangju", 
      name: "광주FC", 
      logo: "/gwangju.png",
      coach: "이정효",
      founded: "2010년",
      stadium: "광주축구전용구장",
      keyPlayers: ["세징야", "정태욱", "에드가"],
      formation: "3-5-2"
    },
    {
      id: "daejeon", 
      name: "대전 하나 시티즌", 
      logo: "/daejeon.png",
      coach: "황선홍",
      founded: "1997년",
      stadium: "대전월드컵경기장",
      keyPlayers: ["세징야", "정태욱", "에드가"],
      formation: "3-5-2"
    },
    {
      id: "kimcheon", 
      name: "김천 상무 프로축구단", 
      logo: "/kimcheon.png",
      coach: "정정용",
      founded: "1984년",
      stadium: "김천종합운동장",
      keyPlayers: ["세징야", "정태욱", "에드가"],
      formation: "3-5-2"
    }
    // 나머지 팀들에 대한 정보를 동일한 형식으로 추가합니다.
  ];

  const filteredPlayers = players.filter(player => player.성명.toLowerCase().includes(searchQuery))

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-md bg-white">
        <Link className="flex items-center justify-center" href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">팀별 선수 정보</h1>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="선수 이름으로 검색..."
          className="mb-8 w-full p-2 border border-gray-300 rounded-md"
        />

        {searchQuery ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center">
                    {player.등번 && player.성명 ? (
                      <img 
                        src={`/images/players/${player.등번}. ${player.성명}.jpg`} 
                        alt={`${player.성명} 사진`} 
                        className="w-48 h-48 mb-2" // 이미지 크기 확대
                      />
                    ) : (
                      <div className="w-24 h-24 mb-2 bg-gray-200"></div> // 사진이 없을 경우
                    )}
                    <h3 className="text-lg font-semibold">{player.성명}</h3> {/* 성명 사진 아래에 표시 */}
                  </CardHeader>
                  <CardContent>
                    <CardDescription>소속 클럽: {player.소속클럽}</CardDescription>
                    <CardDescription>등번: {player.등번}</CardDescription>
                    <CardDescription>포지션: {player.포지션}</CardDescription>
                    <CardDescription>키: {player.키}</CardDescription>
                    <CardDescription>몸무게: {player.몸무게}</CardDescription>
                    <CardDescription>생년월일: {player.생년월일}</CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-xl text-gray-500">검색 결과가 없습니다.</p>
            )}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {teams.map((team, index) => (
              <div key={index} className="text-center cursor-pointer" onClick={() => toggleTeam(team.name)}>
                <img src={team.logo} alt={`${team.name} 로고`} className="mx-auto w-24 h-24 mb-2"/>
                <h2 className="text-xl font-semibold mb-2 text-blue-500">{team.name}</h2>
                <p className="text-gray-700">감독: {team.coach}</p>
                <p className="text-gray-700">창설년도: {team.founded}</p>
                <p className="text-gray-700">홈구장: {team.stadium}</p>
                <p className="text-gray-700">주요 선수: {team.keyPlayers.join(', ')}</p>
                <p className="text-gray-700">선호 전술: {team.formation}</p>
              </div>
            ))}
          </div>
        )}

        {teams.map((team, index) => (
          expandedTeams.includes(team.name) && !searchQuery && (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-500">{team.name} 선수단</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {players
                  .filter(player => player.소속클럽 === team.name)
                  .map((player, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="flex flex-col items-center">
                        {player.등번 && player.성명 ? (
                          <img 
                            src={`/images/players/${player.등번}. ${player.성명}.jpg`} 
                            alt={`${player.성명} 사진`} 
                            className="w-48 h-48 mb-2" // 이미지 크기 확대
                          />
                        ) : (
                          <div className="w-24 h-24 mb-2 bg-gray-200"></div> // 사진이 없을 경우
                        )}
                        <h3 className="text-lg font-semibold">{player.성명}</h3> {/* 성명 사진 아래에 표시 */}
                      </CardHeader>
                      <CardContent>
                        <CardDescription>등번: {player.등번}</CardDescription>
                        <CardDescription>포지션: {player.포지션}</CardDescription>
                        <CardDescription>키: {player.키}</CardDescription>
                        <CardDescription>몸무게: {player.몸무게}</CardDescription>
                        <CardDescription>생년월일: {player.생년월일}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )
        ))}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 K-League Analysis Project. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}