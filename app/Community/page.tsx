import Link from 'next/link'
import { ArrowLeft, Newspaper, Users, MessageSquare, Gift, ExternalLink } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const news = [
  {
    "title": "'2연승' 목표 홍명보호, 논란 속 2일 첫 출항...주요 해외파는 순차 합류",
    "content": "5일 팔레스타인·10일 오만과 북중미 월드컵 3차 예선 1·2차전",
    "date": "2024.09.01",
    "author": "이종균 ljk@maniareport.com",
    "url": "https://m.sports.naver.com/kfootball/article/425/0000153502"
  },
  {
    "title": "SON 앞선 국가대표 양민혁' 2위 강원FC vs '안데르손 폭발' 3위 수원FC, 선두권 경쟁의 분수령 '누가 웃을까",
    "content": "윤정환 감독의 강원FC는 1일 강릉종합운동장에서 김은중 감독의 수원FC와 '하나은행 K리그1 2024' 29라운드 대결을 벌인다.",
    "date": "2024.09.01",
    "author": "김가을(epi17@sportschosun.com)",
    "url": "https://m.sports.naver.com/kfootball/article/076/0004188174"
  },
  {
    "title": "대구FC 황재원, 대표팀에 뒤늦게 합류",
    "content": "김문환(대전) 부상에 따른 대체선수로…두번째 발탁 2일 소집 훈련 뒤 5일 팔레스타인과 월드컵 3차 예선",
    "date": "2024.09.01",
    "author": "전창훈 기자 apolonj@imaeil.com",
    "url": "https://m.sports.naver.com/kfootball/article/088/0000902079"
  },
  {
    "title": "울산의 새 희망, ‘제2의 바코’로 주목받는 아라비제",
    "content": "프로축구 울산 HD 유니폼을 입은 기오르기 아라비제(26)는 지난 7월 31일 “지난해까지 울산에서 뛰었던 바코(31·산둥)가 팬들에게 얼마나 많은 사랑을 받았는지 알고 있다”고 말했다.",
    "date": "2024.09.01",
    "author": "황민국 기자 stylelomo@kyunghyang.com",
    "url": "https://m.sports.naver.com/kfootball/article/144/0000985725"
  },
  {
    "title": "대구FC, '꼴찌' 인천에 뼈아픈 역전패",
    "content": "전반 선제골, 후반 잇따라 실점하며 1대 2로 져",
    "date": "2024.09.01",
    "author": "전창훈 기자 apolonj@imaeil.com",
    "url": "https://m.sports.naver.com/kfootball/article/088/0000902053"
  },
  {
    "title": "광양제철소, K리그 전남드래곤즈와 업무협약 체결",
    "content": "광양제철소와 K리그 전남드래곤즈가 업무협약을 체결하고 지역 사회 공헌 활동을 강화하기로 했다. 협약을 통해 지역 축구 발전에 기여할 예정이라고 밝혔다.",
    "date": "2024.08.26",
    "author": "김지현 기자(jhkim@newsis.com)",
    "url": "https://n.news.naver.com/mnews/article/003/0014321574"
  },
  {
    "title": "K리그1 울산, 포항 5-4 격파…시즌 3번째 동해안더비 접수",
    "content": "프로축구 K리그1 울산 HD가 난타전 끝에 포항 스틸러스를 잡고 '동해안더비'를 승리로 장식했다.",
    "date": "2024.08.31",
    "author": "하근수 기자",
    "url": "https://sports.news.naver.com/news.nhn?oid=413&aid=0000166666"
  },
  {
    "title": "\"1억 안 갚아\"…유럽·K리그 출신 축구선수 혼인 빙자 사기 논란",
    "content": "게티이미지뱅크유럽 및 프로축구 K리그에서 활약했던 축구선수 A씨가 혼인 빙자 사기 논란에 휩싸였다.A씨는 대학 재학 중 유럽 리그에 진출해 뛰었고, 이후 한국으로 돌아와 K리그에서 활동했다.",
    "date": "2024.08.30",
    "author": "김소연 한경닷컴 기자 sue123@hankyung.com",
    "url": "https://n.news.naver.com/mnews/article/015/0004856143"
  },
  {
    "title": "\"혼인 빙자 사기, 빌려간 1억 갚아라\" K리그 출신 축구선수 논란",
    "content": "전 연인 B씨 \"결혼 전제로 교제\"\"카드·현금 합해 총 1억 원 이상 지원\"축구선수 A씨 \"1억 빌린 적 없고, 일부 갚았다\"(서울=연합뉴스) 송은경 기자 = 유럽과 프로축구 K리그에서 활약한 축구선수가 혼인 빙자 사기 논란에 휘말렸다. ",
    "date": "2024.08.30",
    "author": "정예원 인턴기자 ywjung@asiae.co.kr",
    "url": "https://n.news.naver.com/mnews/article/277/0005178695"
  },
  {
    "title": "[2025예산]'이색사업' e스포츠 내셔널리그·K-패스 다자녀 신설",
    "content": "2025년 예산안에 K리그 출신 축구선수를 위한 지원 사업이 포함됐다. 보건복지부는 2025년 예산안에서 다자녀 가구 지원을 위한 'K-패스' 신설 및 K리그 출신 축구선수들을 위한 새로운 지원 사업을 포함했다고 30일 밝혔다.",
    "date": "2024.08.27",
    "author": "송정은(sje@yna.co.kr)",
    "url": "https://n.news.naver.com/mnews/article/001/0014706789"
  },
  {
    "title": "제주항공,K-리그 제주유나이티드와업무협약체결",
    "content": "경기 관람객 대상 항공권 프로모션 등 진행\"스포츠 마케팅 강화 차원\"김이배 제주항공 대표이사는 \"이번 협약으로 양사가 상호 보완적인 관계를 형성하게 됐다\"며 \"제주를 방문하는 K리그 팬들에게 더욱 다양한 혜택을 제공할 것\"이라고 밝혔다.",
    "date": "2024.08.27",
    "author": "정인혁 기자 (jinh@dailian.co.kr)",
    "url": "https://n.news.naver.com/mnews/article/119/0002653756"
  },
  {
    "title": "울산 현대중, 'K리그 U14 챔피언십' 우승…2년 연속 정상",
    "content": "정우진 극장골, 전북현대 FC 1-0으로 꺾어[울산=뉴시스] K리그 U14 챔피언십에서 울산 현대중학교가 2년 연속 우승을 차지했다. 27일 울산시 울주군 울산종합운동장에서 열린 결승전에서 울산 현대중학교가 정우진의 극장골로 전북현대 FC를 1-0으로 제압했다.",
    "date": "2024.08.26",
    "author": "구미현 기자(gorgeouskoo@newsis.com)",
    "url": "https://n.news.naver.com/mnews/article/003/0014321574"
  },

]

const columns = [
  { title: "4-3-3 vs 3-5-2: K리그에서의 전술 트렌드", author: "김전술", content: "최근 K리그에서 자주 볼 수 있는 두 가지 전술 체계를 비교 분석합니다." },
  { title: "데이터로 보는 K리그 공격수의 효율성", author: "이통계", content: "득점, 슈팅, 패스 성공률 등의 데이터를 바탕으로 K리그 공격수들의 효율성을 분석합니다." },
  { title: "K리그의 미래: 유스 시스템 발전 방향", author: "박육성", content: "K리그 각 구단의 유스 시스템 현황과 앞으로의 발전 방향에 대해 논의합니다." },
]

const discussions = [
  { title: "이번 주 울산 vs 전북 경기, 누가 이길까요?", replies: 28, views: 342, author: "축구팬1" },
  { title: "우리 팀의 승률 예측 모델이 정확한가요?", replies: 15, views: 203, author: "데이터분석가" },
  { title: "데이터 분석으로 본 우리 팀의 약점", replies: 22, views: 287, author: "전술통" },
]

const events = [
  { title: "K리그 데이터 챌린지", sponsor: "테크기업 A", content: "K리그 경기 데이터를 활용한 예측 모델 개발 대회" },
  { title: "팬 참여형 전술 분석 이벤트", sponsor: "스포츠 브랜드 B", content: "팬들이 직접 참여하여 좋아하는 팀의 전술을 분석하는 이벤트" },
]

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-md bg-white">
        <Link className="flex items-center justify-center" href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">커뮤니티</h1>
        
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="news" className="flex items-center"><Newspaper className="w-4 h-4 mr-2" /> 뉴스</TabsTrigger>
            <TabsTrigger value="columns" className="flex items-center"><Users className="w-4 h-4 mr-2" /> 컬럼 & 전문가 분석</TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> 토론</TabsTrigger>
            <TabsTrigger value="events" className="flex items-center"><Gift className="w-4 h-4 mr-2" /> 이벤트</TabsTrigger>
          </TabsList>
          <TabsContent value="news">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
                        {item.title}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </CardTitle>
                    <CardDescription>{item.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{item.content}</p>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder.svg?text=${item.author[0]}`} alt={item.author} />
                        <AvatarFallback>{item.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500">{item.author}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="columns">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {columns.map((column, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{column.title}</CardTitle>
                    <CardDescription>by {column.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{column.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="discussions">
            <div className="space-y-4">
              {discussions.map((discussion, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{discussion.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center justify-between">
                        <span>댓글 {discussion.replies} | 조회수 {discussion.views}</span>
                        <span>by {discussion.author}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button>토론 참여하기</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>후원: {event.sponsor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{event.content}</p>
                    <Button>자세히 보기</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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