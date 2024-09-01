'use client'
import Link from 'next/link'
import { ArrowLeft, Target, Code, Database, PieChart, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import React from 'react'

const data = [
  { name: '1000', Train: 20, Validation: 15, Test: 50 },
  { name: '2000', Train: 25, Validation: 20, Test: 60 },
  { name: '3000', Train: 30, Validation: 25, Test: 70 },
  { name: '5000', Train: 22, Validation: 18, Test: 55 },
  { name: '10000', Train: 28, Validation: 23, Test: 65 },
];

const developmentPhases = [
  { name: '데이터 수집 및 전처리', description: '', percentage: 60 },
  { name: '모델 개발 및 훈련', description: '', percentage: 30 },
  { name: '모델 평가 및 튜닝', description: '', percentage: 25 },
  { name: '결과 시각화 및 보고서 작성', description: '', percentage: 20 },
];

export default function ProjectIntroPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-md bg-white">
        <Link className="flex items-center justify-center" href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">프로젝트 소개</h1>
        
        <Tabs defaultValue="goal" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="goal" className="flex items-center"><Target className="w-4 h-4 mr-2" /> 프로젝트 목표</TabsTrigger>
            <TabsTrigger value="process" className="flex items-center"><Code className="w-4 h-4 mr-2" /> 개발 과정</TabsTrigger>
            <TabsTrigger value="data" className="flex items-center"><Database className="w-4 h-4 mr-2" /> 사용된 데이터</TabsTrigger>
          </TabsList>
          
          <TabsContent value="goal">
            <Card>
              <CardHeader>
                <CardTitle>우리의 궁극적인 목표</CardTitle>
                <CardDescription>K리그 분석을 통한 혁신적인 인사이트 제공</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6"> {/* 여백을 더 주기 위해 mb-6으로 변경 */}
                  본 프로젝트는 K리그의 복잡하고 역동적인 데이터를 활용하여, 팬들과 구단 모두에게 혁신적인 인사이트를 제공하는 것을 목표로 합니다.
                  우리는 단순한 데이터 분석을 넘어, 실제로 경기 현장에서 적용 가능한 예측 모델과 전략 도구를 개발하여 K리그의 성장을 지원하고자 합니다.
                </p>
                <p className="text-gray-600 mb-6"> {/* 여백을 더 주기 위해 mb-6으로 변경 */}
                  이 프로젝트는 K리그 팬들이 경기와 팀에 대한 이해를 심화할 수 있도록 돕고, 구단들이 데이터를 기반으로 더욱 전략적인 결정을 내릴 수 있도록
                  하는 것을 지향합니다. 우리의 접근 방식은 다음과 같은 주요 목표에 의해 주도됩니다.
                </p>
                <ul className="list-disc pl-5 space-y-6 text-gray-600"> {/* 각 항목 간 여백을 주기 위해 space-y-6 적용 */}
                  <li>
                    <strong>경기 결과 예측 모델 개발:</strong> 
                    <span>
                      K리그 경기 결과를 예측하는 것은 단순히 승패를 맞추는 것 이상의 의미를 지닙니다. 우리는 각 팀의 이전 경기 데이터, 선수들의 컨디션, 경기 장소 등의 다양한 요소를 종합적으로 분석하여, 최종적인 경기 결과를 예측할 수 있는 정교한 모델을 개발하고자 합니다. 이러한 예측 모델은 팬들이 경기 결과를 예측하며 즐길 수 있는 요소를 제공할 뿐만 아니라, 구단들이 상대 팀의 전략에 대응할 수 있도록 도움을 줄 수 있습니다. 또한, 이 모델은 경기 당일의 예측뿐만 아니라 시즌 전체의 흐름을 파악하는 데에도 기여할 것입니다.
                    </span>
                  </li>
                  <li>
                    <strong>선수 퍼포먼스 평가 시스템 구축:</strong> 
                    <span>
                      선수 개개인의 퍼포먼스를 객관적으로 평가하는 것은 팀 전체의 전략을 세우는 데 매우 중요한 요소입니다. 우리는 다양한 통계적 지표를 활용하여 선수들의 경기력, 체력, 기여도 등을 종합적으로 평가할 수 있는 시스템을 구축할 계획입니다. 이 시스템은 구단의 스카우팅 및 선수 기용 전략에 큰 도움이 될 것입니다. 예를 들어, 특정 선수가 상대적으로 더 좋은 성과를 보이는 경기 환경이나 포지션을 파악함으로써, 구단은 이 선수를 최적의 조건에서 활용할 수 있게 됩니다. 또한, 팬들은 이러한 데이터를 통해 자신이 응원하는 선수의 기량을 더욱 깊이 이해할 수 있을 것입니다.
                    </span>
                  </li>
                  <li>
                    <strong>팀 전략 분석 도구 제공:</strong> 
                    <span>
                      축구는 팀 스포츠로서, 팀 전체의 전략과 전술이 경기 결과에 큰 영향을 미칩니다. 우리는 각 팀의 전술적 움직임, 포메이션 변화, 공수 전환 패턴 등을 분석하여, 팀의 전략적 강점과 약점을 명확히 파악할 수 있는 도구를 제공합니다. 이러한 도구는 구단이 상대 팀을 분석하고, 맞춤형 전략을 수립하는 데 큰 도움이 될 것입니다. 예를 들어, 상대 팀이 주로 사용하는 공격 루트나 수비 전술을 미리 파악하여, 경기에 앞서 더 나은 대비책을 마련할 수 있습니다. 이로 인해, 구단은 보다 전략적인 접근을 통해 경기에서 우위를 점할 수 있습니다.
                    </span>
                  </li>
                  <li>
                    <strong>K리그에 대한 팬들의 이해도 향상:</strong> 
                    <span>
                      팬들은 단순히 경기를 관람하는 것 이상으로, 자신이 응원하는 팀과 리그 전반에 대한 깊이 있는 이해를 원합니다. 우리는 복잡한 데이터를 시각화하고, 이를 쉽게 접근할 수 있는 형태로 제공함으로써, 팬들이 K리그의 전반적인 흐름과 각 팀의 특성을 더욱 잘 이해할 수 있도록 지원합니다. 이러한 정보는 팬들이 경기의 미묘한 부분들을 이해하는 데 도움을 주며, 나아가 K리그에 대한 팬들의 열정과 참여도를 더욱 높이는 데 기여할 것입니다. 예를 들어, 시즌 중 팀의 성적 변화, 선수 교체가 경기력에 미치는 영향 등을 쉽게 파악할 수 있는 도구를 제공합니다.
                    </span>
                  </li>
                  <li>
                    <strong>데이터 기반의 의사결정 지원:</strong> 
                    <span>
                      축구 구단 운영에 있어 데이터 기반의 의사결정은 점점 더 중요한 역할을 하고 있습니다. 우리는 구단들이 데이터에 기반한 더 나은 의사결정을 내릴 수 있도록 다양한 분석 도구와 인사이트를 제공합니다. 이러한 지원은 선수 기용, 전술 선택, 경기 중 전략 수정 등 다양한 영역에서 활용될 수 있습니다. 예를 들어, 특정 선수의 컨디션과 경기 성과 데이터를 바탕으로 다음 경기에 해당 선수를 선발로 기용할지 여부를 결정하거나, 상대 팀의 전술적 약점을 분석하여 그에 맞는 전략을 세우는 등의 의사결정 과정을 지원합니다. 이는 결국 구단의 성과 향상과 리그의 전반적인 수준을 높이는 데 기여할 것입니다.
                    </span>
                  </li>
                </ul>
                <p className="text-gray-600 mt-6"> {/* 여백을 더 주기 위해 mt-6으로 변경 */}
                  최종적으로, 이 프로젝트는 K리그의 데이터 활용도를 극대화하여, 리그의 전체적인 발전에 기여하고, 팬과 구단 모두에게 새로운 가치를 제공하는 것을 목표로 하고 있습니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>


          
          <TabsContent value="process">
            <Card>
              <CardHeader>
                <CardTitle>우리의 개발 과정</CardTitle>
                <CardDescription>프로젝트의 단계별 개발 흐름</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">개요</h3>
                <p className="text-gray-600 mb-4">
                이 프로젝트에서는 K리그 경기 결과를 예측하기 위해 다층 퍼셉트론(MLP)과 그래디언트 부스팅 모델(Gradient Boosting)을 사용한 예측 모델을 개발하고 훈련하였습니다. 
                다양한 데이터 전처리 기법과 하이퍼파라미터 튜닝을 통해 모델의 성능을 최적화하였으며, 최종 모델은 경기 결과를 높은 정확도로 예측할 수 있도록 구성되었습니다.
                  <span className="block mt-2">사용된 데이터 소스: K리그 공식 데이터, 외부 API 등</span>
                </p>
                <h3 className="text-xl font-semibold mb-2">1단계 : 데이터 수집 및 전처리</h3>
                <p className="text-gray-600 mb-4">
                  다양한 소스에서 K리그 관련 데이터를 수집하고, 결측치 처리 및 데이터 정규화와 같은 전처리 작업을 수행하였습니다.
                  <span className="block mt-2">사용된 데이터 소스: K리그 공식 데이터, 외부 API 등</span>
                </p>
                <h3 className="text-xl font-semibold mb-2">2단계 : 피처 엔지니어링 및 데이터 변환</h3>
                <p className="text-gray-600 mb-4">
                  데이터를 분석하기에 적합한 형태로 변환하기 위해 다양한 피처 엔지니어링 기법을 적용하였습니다. 이는 팀별 승리 비율 계산, 연도 및 월별 특성 추출 등을 포함합니다.
                  <span className="block mt-2">사용된 기법: Label Encoding, One-Hot Encoding, Feature Scaling 등</span>
                </p>
                <h3 className="text-xl font-semibold mb-2">3단계 : 모델 개발 및 훈련</h3>
                <p className="text-gray-600 mb-4">
                  다층 퍼셉트론(MLP)과 그래디언트 부스팅 모델을 사용하여 경기 결과를 예측하는 모델을 개발하고 훈련했습니다.
                  <span className="block mt-2">사용된 기술: Python, TensorFlow, Scikit-Learn, XGBoost, LightGBM 등</span>
                </p>
                <h3 className="text-xl font-semibold mb-2">4단계 : 모델 평가 및 하이퍼파라미터 튜닝</h3>
                <p className="text-gray-600 mb-4">
                  모델의 성능을 평가하기 위해 교차 검증을 수행하고, Optuna를 사용하여 하이퍼파라미터를 최적화하였습니다. 최종 모델은 테스트 데이터에서 우수한 예측 정확도를 보였습니다.
                  <span className="block mt-2">사용된 방법: Cross-Validation, GridSearchCV, Optuna 등</span>
                </p>
                <h3 className="text-xl font-semibold mb-2">5단계 : 모델 해석 및 인사이트 도출</h3>
                <p className="text-gray-600 mb-4">
                  SHAP 값을 이용하여 모델의 예측 결과를 해석하고, 주요 피처들이 경기 결과에 미치는 영향을 분석하였습니다. 이를 통해 구단과 팬들에게 유의미한 인사이트를 제공하였습니다.
                  <span className="block mt-2">사용된 도구: SHAP, Matplotlib 등</span>
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="text-lg font-medium mb-2">단계별 시간 소요</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={developmentPhases}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="percentage" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <h3 className="text-xl font-semibold mb-2"> 오버샘플링 비율 별 데이터 성능 변화</h3>
                <p className="text-gray-600 mb-4">
                  여기 수정 필요!!!! 오버샘플링 비율을 조정하면서 모델의 성능 변화를 평가하였습니다. 각기 다른 비율로 오버샘플링을 적용한 결과, 적절한 비율에서 모델의 성능이 크게 향상되었으며, 과도한 오버샘플링은 오히려 성능 저하를 초래했습니다.
                  <span className="block mt-2">결과: 오버샘플링 비율 1:1에서 최적의 성능을 보였으며, 정확도는 78%로 향상되었습니다. 반면, 비율이 지나치게 높아지면 모델이 과적합되어 성능이 떨어졌습니다.</span>
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="text-lg font-medium mb-2">성능 그래프</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Train" stroke="#8884d8" />
                      <Line type="monotone" dataKey="Validation" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="Test" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <h3 className="text-xl font-semibold mb-2"> 실제 예측 결과 비교 및 분석</h3>
                <p className="text-gray-600 mb-4">
                  개발된 모델을 사용하여 실제 클럽별 순위를 예측하고, 이를 실제 시즌 결과와 비교 분석하였습니다. 이를 통해 모델이 각 팀의 성과를 얼마나 정확하게 예측했는지를 평가할 수 있었으며, 일부 팀에 대한 예측은 실제 성적과 매우 유사한 결과를 보였습니다.
                  <span className="block mt-2">결과: 특정 팀의 순위 예측에서 모델의 정확도가 특히 높았으며, 이는 모델이 팀의 전반적인 경기력을 효과적으로 반영하고 있음을 보여줍니다.</span>
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>사용된 데이터 소개</CardTitle>
                <CardDescription>주요 피처 및 데이터 소스</CardDescription>
              </CardHeader>
                <CardContent>
                <p className="text-gray-600 mb-4">
                  우리는 K리그 공식 데이터와 함께 다양한 소스에서 수집한 데이터를 사용했습니다. 주요 피처는 다음과 같이 분류할 수 있습니다:
                </p>
                
                <h4 className="text-lg font-semibold mb-2">1. 팀 및 경기 정보</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>경기 날짜 (GMT)</li>
                  <li>홈 팀 이름 및 원정 팀 이름</li>
                  <li>홈 팀 결과 (승/무/패)</li>
                  <li>홈 팀 및 원정 팀 득점 수</li>
                  <li>홈 팀 및 원정 팀 전반 득점 수</li>
                  <li>홈 팀 및 원정 팀 아디다스 점수</li>
                  <li>홈 팀 경기당 득점 및 원정 팀 경기당 득점</li>
                </ul>
                
                <h4 className="text-lg font-semibold mb-2">2. 공격 및 수비 성과 지표</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>코너킥 수 (홈/원정)</li>
                  <li>슛 수 및 유효 슛 수 (홈/원정)</li>
                  <li>경고 및 퇴장 수 (홈/원정)</li>
                  <li>태클 성공률 (홈/원정)</li>
                  <li>클리어링, 인터셉트, 차단, 획득 (홈/원정)</li>
                  <li>블락, 볼미스 (홈/원정)</li>
                </ul>

                <h4 className="text-lg font-semibold mb-2">3. 경기 운영 및 패스 성과 지표</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>팀 점유율 (홈/원정)</li>
                  <li>프리킥 수 및 오프사이드 수 (홈/원정)</li>
                  <li>패스 시도 및 성공 수 (홈/원정)</li>
                  <li>패스 성공률 (전방패스, 횡패스, 롱패스, 중거리패스, 단거리패스, 크로스 등 세부 유형별로 홈/원정)</li>
                  <li>드리블 성공률 (홈/원정)</li>
                  <li>지상 경합 및 공중 경합 성공률 (홈/원정)</li>
                </ul>

                <h4 className="text-lg font-semibold mb-2">4. 배당률 및 기대 득점 지표</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                  <li>홈 팀 승리 배당률, 무승부 배당률, 원정 팀 승리 배당률</li>
                  <li>양팀 득점 배당률 (Yes/No)</li>
                  <li>홈 팀 및 원정 팀 기대 득점 (xG)</li>
                </ul>

                <p className="text-gray-600">
                  이러한 다양한 데이터를 결합하여 종합적인 분석을 수행하고, 정확한 예측 모델을 구축했습니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
