import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Plane, Hotel, Map, Car, Calendar, Clock } from "lucide-react"
import { useInView } from "react-intersection-observer"

const services = [
  {
    id: "flights",
    title: "Flight Tickets",
    image: "/plane.webp",
    features: [
      { icon: Plane, text: "Economy/Business Class" },
      { icon: Calendar, text: "Flexible Dates" },
      { icon: Clock, text: "24/7 Support" },
    ],
  },
  {
    id: "hotels",
    title: "Hotel Bookings",
    image: "/hotel.jpg",
    features: [
      { icon: Hotel, text: "Luxury & Budget Options" },
      { icon: Map, text: "Prime Locations" },
      { icon: Clock, text: "Instant Confirmation" },
    ],
  },
  {
    id: "tours",
    title: "Tour Packages",
    image: "/packege.jpg",
    features: [
      { icon: Map, text: "Guided Experiences" },
      { icon: Calendar, text: "Customizable Itineraries" },
      { icon: Clock, text: "All-Inclusive Options" },
    ],
  },
  {
    id: "transfers",
    title: "Airport Transfers",
    image: "/transfer.jpg",
    features: [
      { icon: Car, text: "Private & Shared Options" },
      { icon: Clock, text: "Punctual Service" },
      { icon: Map, text: "Door-to-Door Convenience" },
    ],
  },
]

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const intervalRef = useRef(null)

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1))
    }, 5000)
  }

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    if (inView) {
      startAutoSlide()
    } else {
      stopAutoSlide()
    }

    return () => stopAutoSlide()
  }, [inView])

  const handlePrev = () => {
    stopAutoSlide()
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1))
    startAutoSlide()
  }

  const handleNext = () => {
    stopAutoSlide()
    setDirection(1)
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1))
    startAutoSlide()
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section ref={ref} className="py-20 px-4 bg-black text-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-light text-center mb-16 text-golden-400"
        >
          GOLDEN TICKET SERVICES
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden rounded-lg relative h-[400px] md:h-[500px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="relative h-full w-full">
                  <img
                    src={services[currentIndex].image || "/sky.jpg?height=600&width=800"}
                    alt={services[currentIndex].title}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                    <h3 className="text-4xl md:text-5xl font-light mb-8">{services[currentIndex].title}</h3>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      {services[currentIndex].features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <feature.icon className="text-golden-400" size={20} />
                          <span className="text-lg">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  stopAutoSlide()
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                  startAutoSlide()
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-golden-400 w-6" : "bg-gray-500 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSlider
