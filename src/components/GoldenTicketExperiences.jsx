// "use client"

// import { Star } from "lucide-react"
// import { motion } from "framer-motion"
// import { useInView } from "react-intersection-observer"
// import { useState, useEffect } from "react"

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     location: "New York, USA",
//     comment:
//       "Golden Ticket made our honeymoon absolutely perfect! From the flight bookings to the hotel reservations, everything was seamless. Highly recommended!",
//     rating: 5,
//     image: "/02.jpg?height=100&width=100",
//   },
//   {
//     name: "Michael Chen",
//     location: "Toronto, Canada",
//     comment:
//       "I've been using Golden Ticket for all my business trips for the past 2 years. Their customer service is exceptional and they always find the best deals.",
//     rating: 5,
//     image: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     name: "Emma Rodriguez",
//     location: "London, UK",
//     comment:
//       "Our family vacation was stress-free thanks to Golden Ticket. The tour package they arranged was perfect for our needs and the kids loved every moment!",
//     rating: 5,
//     image: "/placeholder.svg?height=100&width=100",
//   },
// ]

// const TestsimonialsSection = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: false,
//     threshold: 0.1,
//   })

//   const [activeIndex, setActiveIndex] = useState(0)

//   // Auto-rotate testimonials
//   useEffect(() => {
//     if (!inView) return

//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % testimonials.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [inView])

//   return (
//     <section ref={ref} className="py-20 px-4 bg-gray-50 overflow-hidden">
//       <div className="container mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-light mb-4">What Our Clients Say</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Don't just take our word for it. Here's what travelers have to say about their experience with Golden
//             Ticket.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
//               className={`bg-white p-8 rounded-lg shadow-sm transition-all duration-500 ${
//                 activeIndex === index ? "border-l-4 border-golden-400" : ""
//               }`}
//             >
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={inView ? { opacity: 1 } : { opacity: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
//                 className="flex items-center mb-4"
//               >
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
//                   >
//                     <Star className="h-5 w-5 fill-golden-400 text-golden-400" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//               <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
//               <div className="flex items-center">
//                 <motion.div
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
//                   className="relative h-12 w-12 rounded-full overflow-hidden mr-4"
//                 >
//                   <img
//                     src={testimonial.image || "/placeholder.svg"}
//                     alt={testimonial.name}
//                     fill
//                     className="object-cover"
//                   />
//                 </motion.div>
//                 <motion.div
//                   initial={{ x: 20, opacity: 0 }}
//                   animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
//                 >
//                   <h4 className="font-medium">{testimonial.name}</h4>
//                   <p className="text-sm text-gray-500">{testimonial.location}</p>
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Testimonial navigation dots */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : { opacity: 0 }}
//           transition={{ duration: 0.5, delay: 0.8 }}
//           className="flex justify-center mt-10 space-x-2"
//         >
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveIndex(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 activeIndex === index ? "bg-golden-400 w-6" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default TestsimonialsSection


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
          className="text-4xl md:text-5xl font-bold text-amber-500 mb-8 tracking-widest"
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
            <span key={i} className="text-2xl text-amber-500">
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
            <span className="text-amber-500 font-semibold text-lg">{currentTestimonial.name}</span>
            <span className="text-white/40 text-lg">|</span>
            <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors text-lg font-medium">
              {currentTestimonial.source}
            </a>
          </motion.div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        disabled={isTransitioning}
        className="absolute left-6 md:left-12 z-20 top-1/2 -translate-y-1/2 text-white hover:text-amber-500 transition-colors duration-300 p-2"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={48} strokeWidth={1.5} />
      </button>

      <button
        onClick={goToNext}
        disabled={isTransitioning}
        className="absolute right-6 md:right-12 z-20 top-1/2 -translate-y-1/2 text-white hover:text-amber-500 transition-colors duration-300 p-2"
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
              index === currentIndex ? "bg-amber-500 w-10" : "bg-white/30 w-3 hover:bg-white/60"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
