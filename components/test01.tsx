'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BarChart, Calendar, Users, MessageSquare, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: "K리그의 역사", href: "/KLeagueHistoryPage" },
    { name: "AI 예측", href: "/Predict" },
    { name: "팀별 선수 정보", href: "/team" },
    { name: "경기기록", href: "/matches" },
    { name: "팀별 전략 분석", href: "/TeamStrategy" },
    { name: "전력균형 지수", href: "/KLeagueBalanceIndex" },
    { name: "커뮤니티", href: "/Community" }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="px-4 lg:px-6 h-20 flex items-center fixed w-full bg-white/80 backdrop-blur-md z-50">
        <Link className="flex items-center justify-center" href="/">
          <span className="sr-only">K-League Analysis</span>
          <img src="/emblem.jpg?height=60&width=60" alt="Logo" className="h-20 w-20" />
          <span className="ml-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">K-League Analysis</span>
        </Link>
        <div className="ml-auto relative">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:opacity-90 transition duration-300 flex items-center"
          >
            Menu <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          {isMenuOpen && (
            <nav className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <main className="flex-3 pt-24"> {/* pt-24로 상단 헤더의 높이를 고려한 패딩 적용 */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-6 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-9">
                <h1 className="text-4xl font-bold tracking-snug sm:text-5xl md:text-6xl lg:text-7xl leading-snug bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  K리그 승률예측 프로젝트
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                  K리그 데이터를 심층 분석하여 팬들에게 통찰력 있는 인사이트를 제공합니다.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:opacity-90 transition duration-300">
                  <Link href="/Projectintro">프로젝트 소개</Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-50 transition duration-300">
                  <Link href="/ModelDescriptionPage">승률예측 모델 소개</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">주요 기능</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: BarChart, title: "데이터 분석", description: "심층적인 K리그 데이터 분석을 제공합니다." },
                { icon: Calendar, title: "경기 일정", description: "최신 K리그 경기 일정을 확인하세요." },
                { icon: Users, title: "팀 분석", description: "각 팀의 전략과 성과를 분석합니다." },
                { icon: MessageSquare, title: "커뮤니티", description: "팬들과 함께 K리그에 대해 토론하세요." }
              ].map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <feature.icon className="h-12 w-12 text-blue-500 mb-4 group-hover:text-purple-500 transition-colors duration-300" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2023 K-League Analysis Project. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 md:mt-0">
              <Link className="text-sm hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline underline-offset-4" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
