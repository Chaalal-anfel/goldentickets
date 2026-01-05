
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah L",
    rating: 5,
    text: "Golden Ticket made my vacation unforgettable! The entire process was smooth, and the destinations were breathtaking!",
    source: "View on Tripadvisor",
    image: "/02.jpg",
  },
  {
    id: 2,
    name: "James K",
    rating: 5,
    text: "I felt like a VIP! Golden Ticket exceeded my expectations with their exceptional service and recommendations.",
    source: "View on Tripadvisor",
    image: "/02.jpg",
  },
  {
    id: 3,
    name: "Anna R",
    rating: 5,
    text: "Golden Ticket turned my dream vacation into reality. Stress-free and luxurious! Highly recommended.",
    source: "View on Tripadvisor",
    image: "/02.jpg",
  },
]

export default function GoldenTicketExperiences() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const goToPrevious = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToNext = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentTestimonial.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto text-center py-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-golden-400 mb-8 tracking-widest"
        >
          GOLDEN TICKET EXPERIENCES
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white text-lg md:text-xl mb-12 font-light leading-relaxed"
        >
          Discover what our happy travelers have to say about their seamless journeys with Golden Ticket!
        </motion.p>

        {/* Star Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-2xl text-gold-400">
              ★
            </span>
          ))}
        </motion.div>

        <div className="relative w-full">
          <motion.blockquote
            key={`quote-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl md:text-3xl font-light mb-8 leading-relaxed"
          >
            "{currentTestimonial.text}"
          </motion.blockquote>

          {/* Author Information */}
          <motion.div
            key={`author-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 justify-center flex-wrap"
          >
            <span className="text-golden-400 font-semibold text-lg">{currentTestimonial.name}</span>
            <span className="text-white/40 text-lg">|</span>
            <a href="#" className="text-golden-400 hover:text-amber-400 transition-colors text-lg font-medium">
              {currentTestimonial.source}
            </a>
          </motion.div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        disabled={isTransitioning}
        className="absolute left-6 md:left-12 z-20 top-1/2 -translate-y-1/2 text-white hover:text-golden-400 transition-colors duration-300 p-2"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={48} strokeWidth={1.5} />
      </button>

      <button
        onClick={goToNext}
        disabled={isTransitioning}
        className="absolute right-6 md:right-12 z-20 top-1/2 -translate-y-1/2 text-white hover:text-golden-400 transition-colors duration-300 p-2"
        aria-label="Next testimonial"
      >
        <ChevronRight size={48} strokeWidth={1.5} />
      </button>

      {/* Dot Navigation Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlay(false)
            }}
            whileHover={{ scale: 1.1 }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-golden-400 w-10" : "bg-white/30 w-3 hover:bg-white/60"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
