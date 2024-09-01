'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ModelDescriptionPage() {
  // 선택 가능한 모델 HTML 파일들
  const modelFiles = [
    { label: '모델 : 승패_MLP 예측', file: 'k_league_cls_승패_mlp.html' },
    { label: '모델 : 승패_catboost 예측', file: 'k_league_cls_승패_cat.html' },
    { label: '모델 : 승무패_mlp 예측', file: 'k_league_cls_승무패_mlp.html' },
    { label: '모델 : 승무패_catboost 예측', file: 'k_league_cls_승무패_cat.html' },
    { label: '모델링 구조', file: 'modelingshape.html' } // 설명과 이미지가 포함된 HTML 파일
  ]

  // 선택된 모델 파일 상태
  const [selectedFile, setSelectedFile] = useState(modelFiles[0].file)

  const handleModelChange = (event) => {
    setSelectedFile(event.target.value)
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Back to Home 버튼 */}
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>

      {/* 페이지 제목 */}
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">🏆 승률 예측 모델 개발 과정</h1>
      
      {/* 모델 선택 드롭다운 */}
      <div className="mb-6 flex justify-center">
        <select 
          className="p-2 border border-gray-300 rounded-md text-lg"
          onChange={handleModelChange}
          value={selectedFile}
        >
          {modelFiles.map((model, index) => (
            <option key={index} value={model.file}>{model.label}</option>
          ))}
        </select>
      </div>
      
      {/* 선택된 모델의 설명 HTML을 iframe으로 표시 */}
      <div className="flex justify-center">
        <iframe 
          src={`/${selectedFile}`} 
          title="승률 예측 모델 개발 과정" 
          width="80%" 
          height="900" 
          className="border border-gray-300 rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}
