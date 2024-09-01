'use client'
import Link from 'next/link'
import { ArrowLeft, BarChart2, PieChart, Info } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from 'recharts'
import { useSearchParams } from 'next/navigation'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC0CB']

export default function MatchAnalysisPage() {
  const searchParams = useSearchParams()
  const match = JSON.parse(searchParams.get('match'))

  if (!match) {
    return <div>Error loading data.</div>
  }

  const matchData = [
    { name: '코너킥', [match.homeTeam]: match.stats.코너킥.홈팀, [match.awayTeam]: match.stats.코너킥.원정팀 },
    { name: '슛', [match.homeTeam]: match.stats.슛.홈팀, [match.awayTeam]: match.stats.슛.원정팀 },
    { name: '유효슛', [match.homeTeam]: match.stats.유효슛.홈팀, [match.awayTeam]: match.stats.유효슛.원정팀 },
    { name: '반칙', [match.homeTeam]: match.stats.반칙.홈팀, [match.awayTeam]: match.stats.반칙.원정팀 },
    { name: '점유율', [match.homeTeam]: match.stats.점유율.홈팀, [match.awayTeam]: match.stats.점유율.원정팀 },
    { name: '프리킥', [match.homeTeam]: match.stats.프리킥.홈팀, [match.awayTeam]: match.stats.프리킥.원정팀 },
    { name: '오프사이드', [match.homeTeam]: match.stats.오프사이드.홈팀, [match.awayTeam]: match.stats.오프사이드.원정팀 },
  ]

  const featureImportance = [
    { name: '점유율', value: match.stats.점유율.홈팀 },
    { name: '슛', value: match.stats.슛.홈팀 },
    { name: '코너킥', value: match.stats.코너킥.홈팀 },
    { name: '유효슛', value: match.stats.유효슛.홈팀 },
    { name: '반칙', value: match.stats.반칙.홈팀 },
    { name: '오프사이드', value: match.stats.오프사이드.홈팀 },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-200 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-md bg-white">
        <Link className="flex items-center justify-center" href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-medium text-blue-600">Back to Home</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">{match.date} - 경기 결과 분석</h1>
        
        <Tabs defaultValue="match-stats" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-6">
            <TabsTrigger value="match-stats" className="flex items-center justify-center text-lg font-medium text-blue-700 border-b-4 border-blue-700 pb-2">
              <BarChart2 className="w-5 h-5 mr-2" /> 경기 통계 비교
            </TabsTrigger>
            <TabsTrigger value="model-features" className="flex items-center justify-center text-lg font-medium text-blue-700 border-b-4 border-blue-700 pb-2">
              <PieChart className="w-5 h-5 mr-2" /> 모델 피처 중요도
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="match-stats">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">경기 통계 비교</CardTitle>
                <CardDescription className="text-sm text-gray-600">{match.homeTeam} vs {match.awayTeam}의 주요 경기 지표 비교</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={matchData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}
                        labelStyle={{ fontWeight: 'bold' }}
                      />
                      <Legend />
                      <Bar dataKey={match.homeTeam} fill="#1f77b4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey={match.awayTeam} fill="#ff7f0e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-gray-600 text-sm">
                  이 차트는 {match.homeTeam}와 {match.awayTeam} 간의 주요 경기 통계를 비교합니다. 각 지표의 높이 차이를 통해 팀 간 퍼포먼스 격차를 쉽게 파악할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="model-features">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">모델링에 사용된 피처와 중요도</CardTitle>
                <CardDescription className="text-sm text-gray-600">경기 결과 예측 모델의 주요 피처</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={featureImportance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {featureImportance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-gray-600 text-sm">
                  이 파이 차트는 {match.homeTeam}의 경기 결과 예측 모델에서 각 피처의 중요도를 보여줍니다. 각 섹터의 크기는 해당 피처가 모델의 예측에 미치는 영향력을 나타냅니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
              <Info className="w-5 h-5 mr-2" />
              분석 결과 해석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              경기 통계와 모델 피처 중요도를 종합적으로 분석한 결과, 점유율과 슛이 경기 결과에 가장 큰 영향을 미치는 것으로 나타났습니다. 
              그러나 다른 요소들도 경기 결과에 상당한 영향을 미치므로, 팀의 전반적인 밸런스가 중요합니다. 
              이러한 분석을 바탕으로 {match.homeTeam}와 {match.awayTeam}는 자신의 강점을 극대화하고 약점을 보완하는 전략을 수립할 수 있습니다.
            </p>
          </CardContent>
        </Card>
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
