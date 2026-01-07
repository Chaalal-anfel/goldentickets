"use client"

import { useEffect, useState, useRef } from "react"

export default function LuxuryHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY.current ? "down" : "up"

      setOffsetX((prev) => {
        if (direction === "down") {
          return Math.min(prev + 1.5, 120) // limite droite
        } else {
          return Math.max(prev - 1.5, -120) // limite gauche
        }
      })

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/18.jpg" alt="Luxury beach resort" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">

          {/* BADGE */}
          <div
            className={`mx-auto mb-8 transition-all duration-1000 ${
              isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
            }`}
          >
            <div className="relative inline-flex h-48 w-48 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                  />
                </defs>
                <text className="fill-white text-[13px] font-light tracking-[0.3em]">
                  <textPath xlinkHref="#circlePath">
                    LUXURY TRAVEL EXPERIENCES • GOLDEN • LUXURY TRAVEL
                  </textPath>
                </text>
              </svg>


            </div>
          </div>

          {/* 🔥 H1 SLIDE HORIZONTAL */}
          <h1
            className={`text-left! text-[250px] font-light leading-none tracking-tight text-white/40 transition-transform duration-300 ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(${offsetX}px)`,
            }}
          >
            Golden Ticket
          </h1>
        </div>
      </div>
    </div>
  )
}
