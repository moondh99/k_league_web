'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function MatchesPage() {
  const [matches, setMatches] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/${selectedYear}matches.csv`) // 선택한 연도에 맞는 CSV 파일을 가져옴
        const buffer = await response.arrayBuffer() // ArrayBuffer로 읽기
        const decoder = new TextDecoder('utf-8') // UTF-8로 디코딩
        const data = decoder.decode(buffer)
        const parsedData = parseCSV(data)
        setMatches(parsedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedYear]) // 선택한 연도가 변경될 때마다 데이터를 가져옴

  const parseCSV = (data) => {
    const rows = data.split('\n').map(row => row.split(','))

    return rows.slice(1).map((row, index) => ({
      id: index + 1,
      date: row[1] || '',  // 데이터가 없을 경우 빈 문자열로 설정
      homeTeam: row[2] || '',  // 데이터가 없을 경우 빈 문자열로 설정
      awayTeam: row[3] || '',  // 데이터가 없을 경우 빈 문자열로 설정
      homeScore: row[18],
      awayScore: row[19],
      result: row[26],
      stats: {
        코너킥: { 홈팀: parseInt(row[4]), 원정팀: parseInt(row[5]) },
        슛: { 홈팀: parseInt(row[6]), 원정팀: parseInt(row[7]) },
        유효슛: { 홈팀: parseInt(row[8]), 원정팀: parseInt(row[9]) },
        반칙: { 홈팀: parseInt(row[10]), 원정팀: parseInt(row[11]) },
        점유율: { 홈팀: parseInt(row[12]), 원정팀: parseInt(row[13]) },
        프리킥: { 홈팀: parseInt(row[14]), 원정팀: parseInt(row[15]) },
        오프사이드: { 홈팀: parseInt(row[16]), 원정팀: parseInt(row[17]) }
      }
    }))
  }

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const filteredMatches = matches ? matches.filter(match => 
    (match.homeTeam && match.homeTeam.toLowerCase().includes(searchTerm)) || 
    (match.awayTeam && match.awayTeam.toLowerCase().includes(searchTerm)) || 
    (match.date && match.date.includes(searchTerm))
  ) : []

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    )
  }

  if (!matches) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-red-500">Error loading data.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back to Home 버튼 */}
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>

      {/* 페이지 제목 */}
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">🏆 경기 목록</h1>

      {/* 연도 선택 드롭다운 및 검색 기능 */}
      <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <select 
          className="p-2 border border-gray-300 rounded-md text-lg" 
          value={selectedYear} 
          onChange={handleYearChange}
        >
          <option value="2021">2021년</option>
          <option value="2022">2022년</option>
          <option value="2023">2023년</option>
          <option value="2024">2024년</option>
        </select>
        <input 
          type="text" 
          className="p-2 border border-gray-300 rounded-md text-lg" 
          placeholder="팀명 또는 날짜로 검색..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
      </div>
      
      {/* 경기 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map(match => (
          <Link key={match.id} href={`/matches/${match.id}?match=${encodeURIComponent(JSON.stringify(match))}`}>
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-bold text-gray-800">{match.date}</div>
                <div className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  match.result === '승' ? 'bg-green-200 text-green-800' :
                  match.result === '패' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {match.result === '승' ? '승리' :
                  match.result === '패' ? '패배' :
                  '무승부'}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-blue-700">{match.homeTeam}</div>
                <div className="text-2xl font-extrabold text-gray-800">{match.homeScore} - {match.awayScore}</div>
                <div className="text-xl font-bold text-red-700">{match.awayTeam}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
