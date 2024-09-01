'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// 이미지 경로들
const leagueLogo = '/images/kleague-logo.png'
const earlyYears = '/early-years.jpg'
const modernEra = '/images/modern-era.jpg'
const starPlayers = '/images/star-players.jpg'
const k_2022 = '/k_2022.jpg'
const k_2021 = '/k_2021.jpg'
const k_2020 = '/k_2020.jpg'
const k_2019 = '/k_2019.jpg'
const k_2018 = '/k_2018.jpg'
const k_2017 = '/k_2017.jpg'
const k_2016 = '/k_2016.jpg'
const k_2015 = '/k_2015.jpg'
const k_2014 = '/k_2014.jpg'
const k_2013 = '/k_2013.jpg'
const k_2012 = '/k_2012.jpg'
const k_2011 = '/k_2011.jpg'
const k_2010 = '/k_2010.jpg'
const k_2009 = '/k_2009.jpg'
const k_2008 = '/k_2008.jpg'
const k_2007 = '/k_2007.jpg'
const k_2005 = '/k_2005.jpg'
const k_1998 = '/k_1998.jpg'
const k_1994 = '/k_1994.jpg'
const k_1983 = '/k_1983.jpg'



export default function KLeagueHistoryPage() {
  const [timelineData, setTimelineData] = useState([])

  useEffect(() => {
    const data = [
      {
        year: '2022',
        title: '주요 사건',
        description: 
        `K리그-넥슨, 유소년 축구 지원 프로젝트 ‘Ground N’ 출범
        ‘K리그 공식 서체’ 공개
        K리그-쿠팡플레이, 2025년까지 ‘포괄적 파트너십’ 체결
        육성응원 등 코로나19 관련 제한사항 대부분 해제
        기술 분석을 담은 월간 테크니컬 리포트 ‘월간 TSG’ 창간
        김포FC 리그 참가`,
        image: k_2022
      },
      {
        year: '2021',
        title: '주요 사건',
        description: `권오갑 제12대 한국프로축구연맹 총재 추대
        사회적 가치 실현 위한 '탄소중립리그' 비전 선포
        국내 스포츠 단체 최초 ‘유엔기후변화협약 스포츠 기후 행동 협정’ 참여
        K리그-하나은행-현대오일뱅크-사랑의열매 '그린킥오프' 친환경 캠페인 공동 진행
        K리그-스페셜올림픽코리아 통합축구 활성화를 위한 업무 협약 체결
        K리그 매거진 프로그램 '다이나믹 피치' 런칭`,
        image: k_2021
      },
      {
        year: '2020',
        title: '주요 사건',
        description: `‘코로나19 대응 매뉴얼’을 통해 주요 프로 축구리그 중 최초로 리그 재개
        2020시즌 공식 개막전(전북:수원) 37개국 중계
        한국프로축구연맹-한국e스포츠협회 업무협약 체결
        글로벌 판타지 풋볼 전문업체 ‘Sorare’와 라이센싱 협약
        현대오일뱅크, 축구사랑나눔재단과 ‘K리그 드림어시스트’ 출범
        K리그 공식 e스포츠대회 ‘eK리그 2020’ 개최
        하나금융그룹과 이동약자를 위한 안내 지도 "모두의 축구장, 모두의 K리그!" 선보여
        K리그 신규 엠블럼, BI 리브랜딩 발표
        김천상무 창단, 2021시즌부터 K리그2 참가`,
        image: k_2020
      },
      {
        year: '2019',
        title: '주요 사건',
        description: `K리그1, K리그2 사상 최다 유료관중 기록
        "Responsiball" 선정 전 세계 프로축구리그 사회공헌활동지수 6위 기록
        EA스포츠와 함께 하는 "이달의 선수상" 신설
        K리그 유스 챔피언십 U12&11(초등부) 신설
        K리그 생명나눔캠페인 "다시 뛰는 심장으로" 진행
        중계 및 컨텐츠 전담 부서 "뉴미디어팀" 신설
        K리그2 중계 자체제작 개시
        K리그 아카데미 "은퇴선수진로탐색과정", "외국인선수과정" 신설`,
        image: k_2019
      },
      {
        year: '2018',
        title: '주요 사건',
        description: `경기품질 향상을 위한 그라운드 평가시스템, 그라운드 공인제도 도입
        K리그 홍보대사 BJ감스트 선임
        K리그 발전위원회 공식 출범
        K리그 통합 데이터 포털 공식 오픈
        부정행위 제안 거절하고 신고한 이한샘(아산)에게 7,000만원 포상
        K리그 1부리그 및 2부리그 명칭 변경 (K리그1 / K리그2)`,
        image: k_2018
      },
      {
        year: '2017',
        title: '주요 사건',
        description: `권오갑 제11대 한국프로축구연맹 총재 추대
        KEB하나은행, K리그 타이틀 스폰서로 2020년까지 계약
        한국-베트남 수교 25주년 기념 2017 K리그 올스타전 개최
        K리그 아시아 프로리그 중 최초 VAR(Video Assistant Referee) 도입
        K리그 Youth Trust 도입`,
        image: k_2017
      },
      {
        year: '2016',
        title: '주요 사건',
        description: `K리그 전 구성원 장기기증 동참
        현대오일뱅크 R 리그 개막
        상주상무 선수 7명 ‘선행상 ’ 수여
        김병지/김태영, K리그 홍보대사 위촉
        제2회 K리그 U18 챔피언십 개최
        가수 박재정, K 리그 홍보대사 위촉`,
        image: k_2016
      },
      {
        year: '2015',
        title: '주요 사건',
        description: `서울 이랜드 FC 창단, K리그 챌린지 리그 참가
        로보카폴리, K리그 홍보대사 선정
        허정무 부총재 취임
        K리그 영상 통계 센터 운영
        하나은행 K리그 올스타전 팀 최강희 vs 팀 슈틸리케 개최
        제 1회 K리그 U18 챔피언십 개최
        K리그, 베트남 국영 방송국 Thethao TV, Bongda TV 통해 생중계
        K리그 클럽별 유료 관중 현황 집계
        K리그 클린축구위원회 구성`,
        image: k_2015
      },
      {
        year: '2014',
        title: '주요 사건',
        description: `K리그 U-18리그, "K리그 주니어" 로 대회 명칭 변경
        제 1회 K리그 유소년 페스티벌 "MY FUTURE GREAT" 개최
        제 1회 프로축구 전문 경영인 교육 과정 "K리그 GM아카데미" 개설
        제 1회 K리그 세일즈 아카데미 개최
        하나은행 K리그 올스타전 팀 K리그 vs 팀 박지성 개최
        은퇴 선수와 함께하는 K리그 다문화 축구교실 운영
        K리그 영문 홈페이지 개설
        K리그 심판 간담회 "Talk about Referee" 개최
        국방부, 경찰청과 업무 협약, 군경에 복지혜택 확대`,
        image: k_2014
      },
      {
        year: '2013',
        title: '주요 사건',
        description: `한국프로축구 리그 명칭 및 엠블럼 발표
        1부리그 – K LEAGUE CLASSIC
        2부리그 – K LEAGUE CHALLENGE
        K리그 클래식 (1부리그), K리그 챌린지 (2부리그) 출범
        울산 현대 권오갑 구단주 제10대 한국프로축구연맹 총재 취임
        K리그, 출범 후 첫 경영공시
        K리그 전 구성원 급여 1%기부 캠페인 시행
        K리그 30주년 기념 리셉션 개최
        하나은행 K리그 올스타전 2013 개최
        축구산업아카데미 1기 개강
        상주 상무, K리그 클래식 최초 승격`,
        image: k_2013
      },
      {
        year: '2012',
        title: '주요 사건',
        description: `승강제 도입. 상주 상무와 광주 FC 2부리그 강등
        2부리그 충주 험멜, FC 안양, 고양 HI FC, 부천 FC 1995, 수원 FC 승인
        관중 실 집계 제도 도입
        2002 월드컵 10주년 기념 "2002 월드컵 대표팀 초청 K리그 올스타전" 개최`,
        image: k_2012
      },
      {
        year: '2011',
        title: '주요 사건',
        description: `광주 FC 리그 참가
        상무 축구단 상주시 연고 협약 체결, 상주 상무 피닉스 리그 참가
        부산 아이파크 정몽규 구단주 제9대 한국프로축구연맹 총재 취임
        3,030,586명 관중 입장, 프로축구 총 관중 수 300만 돌파`,
        image: k_2011
      },
      {
        year: '2010',
        title: '주요 사건',
        description: `K리그, 리그컵, R리그로 각 대회 명칭 한글 표기법 변경
        "5분 더 " 캠페인 실시
        국내 프로스포츠 사상 역대 1경기 최다 관중 기록 (60,747명)
        광주시민축구단 창단`,
        image: k_2010
      },
      {
        year: '2009',
        title: '주요 사건',
        description: `한일 프로축구 올스타전 JOMO CUP 개최
        K-리그 예비엔트리제도 시행
        2군리그에서 R-리그(RESERVE-리그)로 명칭 변경
        강원 FC 리그 참가
        K-리그 전국 연고지 실현
        외국인선수 아시아쿼터제도 실시
        6강 플레이오프를 K-리그 챔피언십으로 명칭 변경`,
        image: k_2009
      },
      {
        year: '2008',
        title: '주요 사건',
        description: `이준하 전 부산 아이파크 사장 사무총장 선임
        K-리그 최다 관중 기록(2,945,400명)
        부산 김태영 프로축구 10,000호골 (자책골)
        경기장 안전 캠페인 시행
        강원 FC 창단
        U-18(18세 이하) 고교클럽 챌린지리그 출범`,
        image: k_2008
      },
      {
        year: '2007',
        title: '주요 사건',
        description: `곽정환 회장 만장일치로 2년 연임 가결
        K-리그 중장기 발전 계획(VISION PROJECT K) 발표`,
        image: k_2007
      },
      {
        year: '2005',
        title: '주요 사건',
        description: `성남 일화 곽정환 구단주 제6대 프로축구연맹 회장 취임
        김원동 프로축구연맹 사무국장 사무총장 선임`,
        image: k_2005
      },
      {
        year: '1998',
        title: '주요 사건',
        description: `정몽준 프로축구연맹 회장 사퇴
        포항제철 유상부 회장 만장일치로 2년 임기 제3대 프로축구연맹 회장 추대
        정건일 전 SBS 스포츠국장 프로축구연맹 사무총장 선임
        2,013,812명 관중 입장, 프로축구 총 관중 수 200만 돌파
        K-리그로 프로축구 명칭 확정`,
        image: k_1998
      },
      {
        year: '1994',
        title: '주요 사건',
        description: `한국프로축구연맹 출범
        초대 회장 정몽준 대한축구협회회장, 초대 사무총장 김용집 전 라이베리아 대사 임명
        한국 프로스포츠 사상 최초로 타이틀스폰서제도 도입(하이트배 코리안리그)
        완산 제우 엑스터, 전북 버팔로로 클럽 명칭 변경 후 리그 참가
        전북 다이노스 창단
        전남 드래곤즈 창단`,
        image: k_1994
      },
      {
        year: '1983',
        title: '주요 사건',
        description: `대한축구협회 프로축구 ‘수퍼리그’ 출범 결정
        3월 3일 수퍼리그 위원회 발족
        5월 8일 서울운동장에서 프로축구 원년 개막전 개최
        할렐루야, 유공 등 2개 프로구단과 포항제철, 대우, 국민은행 등 3개 실업구단 리그 참가
        유공 박윤기 프로축구 1호골
        외국인 선수 2명 등록에 2명 출전
        현대, 럭키금성 창단`,
        image: k_1983
      },
    ]
    setTimelineData(data)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Back to Home 버튼 */}
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>

      {/* 페이지 제목 */}
      <h1 className="text-4xl font-bold mb-8 text-center text-green-700">⚽ K리그의 역사</h1>
      
      {/* 타임라인 콘텐츠 */}
      <div className="flex flex-col items-center">
        {timelineData.map((event, index) => (
          <div key={index} className="mb-12 w-full flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <div className="w-full lg:w-1/3 hover:brightness-110">
              <Image src={event.image} alt={event.title} width={500} height={400} className="object-cover w-full h-72" />
            </div>
            <div className="p-6 w-full lg:w-2/3">
              <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition duration-300">{event.year} - {event.title}</h2>
              <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
                {event.description.split('\n').map((line, i) => (
                  <li key={i} className="ml-4">{line.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
