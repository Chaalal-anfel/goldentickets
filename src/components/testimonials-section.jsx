import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    comment:
      "Golden Ticket made our honeymoon absolutely perfect! From the flight bookings to the hotel reservations, everything was seamless. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    comment:
      "I've been using Golden Ticket for all my business trips for the past 2 years. Their customer service is exceptional and they always find the best deals.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emma Rodriguez",
    location: "London, UK",
    comment:
      "Our family vacation was stress-free thanks to Golden Ticket. The tour package they arranged was perfect for our needs and the kids loved every moment!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!inView) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [inView])

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-50 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what travelers have to say about their experience with Golden
            Ticket.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              className={`bg-white p-8 rounded-lg shadow-sm transition-all duration-500 ${
                activeIndex === index ? "border-l-4 border-golden-400" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="flex items-center mb-4"
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                  >
                    <Star className="h-5 w-5 fill-golden-400 text-golden-400" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  className="relative h-12 w-12 rounded-full overflow-hidden mr-4"
                >
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                >
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial navigation dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-10 space-x-2"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-golden-400 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
