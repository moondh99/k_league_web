'use client'
import { useState } from "react"
import Link from 'next/link'  
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [selectedMonth, setSelectedMonth] = useState("March")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const monthlyImages = {
    March: [
      { src: "/k_2006.png", description: "K_league_CatBoost_model_승패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승패" },
      { src: "/k_2006.png", description: "K_League_CatBoost_model_승무패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승무패" }
    ],
    April: [
      { src: "/k_2006.png", description: "K_league_CatBoost_model_승패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승패" },
      { src: "/k_2006.png", description: "K_League_CatBoost_model_승무패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승무패" }
    ],
    May: [
      { src: "/k_2006.png", description: "K_league_CatBoost_model_승패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승패" },
      { src: "/k_2006.png", description: "K_League_CatBoost_model_승무패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승무패" }
    ],
    June: [
      { src: "/k_2006.png", description: "K_league_CatBoost_model_승패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승패" },
      { src: "/k_2006.png", description: "K_League_CatBoost_model_승무패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승무패" }
    ],
    July: [
      { src: "/k_2006.png", description: "K_league_CatBoost_model_승패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승패" },
      { src: "/k_2006.png", description: "K_League_CatBoost_model_승무패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승무패" }
    ],
    August: [
      { src: "/k_2006.png", description: "K_league_CatBoost_model_승패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승패" },
      { src: "/cat8_3.png", description: "K_League_CatBoost_model_승무패" },
      { src: "/k_2006.png", description: "K_League_MLP_model_승무패" }
    ]
  }

  const handleImageClick = (image) => {
    setSelectedImage(image.src)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to Home
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI 순위 예측
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:opacity-90 transition duration-300">
                {selectedMonth}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end">
              <DropdownMenuItem onClick={() => setSelectedMonth("March")}>March</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedMonth("April")}>April</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedMonth("May")}>May</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedMonth("June")}>June</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedMonth("July")}>July</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedMonth("August")}>August</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {monthlyImages[selectedMonth].map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => handleImageClick(image)}
              style={{ height: "390px" }}
            >
              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="text-white">
                  <ZoomInIcon className="h-6 w-6" />
                  View
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-center">
                {image.description}
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative max-w-7xl w-full mx-4 sm:mx-6 lg:mx-8">
              <img
                src={selectedImage}
                alt="Enlarged Image"
                width="auto"
                height="auto"
                className="w-full h-auto object-contain rounded-md"
                style={{ maxHeight: "100vh", maxWidth: "100vw", objectFit: "contain" }}
              />
              <Button
                variant="outline"
                className="absolute top-4 right-4 text-white flex items-center space-x-2"
                onClick={handleModalClose}
              >
                <XIcon className="h-6 w-6" />
                <span className="opacity-100">Close</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function ZoomInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  )
}
