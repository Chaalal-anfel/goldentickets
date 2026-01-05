"use client"

import { motion } from "framer-motion"
import { Armchair, Plane, Shield } from "lucide-react"

const ExclusiveOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Luxury Lounge Access",
      description: "Enjoy premium lounge access before your flight with world-class amenities.",
      image: "https://www.goldentkts.com/img/pricing/airport-lounge-view-stockcake.jpg",
      icon: Armchair,
    },
    {
      id: 2,
      title: "Priority Boarding",
      description: "Skip the lines and board your flight with ease for a seamless experience.",
      image: "https://www.goldentkts.com/img/pricing/how-to-get-airport-lounge-access.jpg",
      icon: Plane,
    },
    {
      id: 3,
      title: "Travel Insurance",
      description: "Stay covered with comprehensive travel insurance tailored to your needs.",
      image: "https://www.goldentkts.com/img/pricing/images.jpg",
      icon: Shield,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const hoverVariants = {
    initial: { opacity: 0, x: 100 },
    hover: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-24 px-4 md:px-8 bg-stone-100">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <p className="text-amber-600 text-xs md:text-sm tracking-widest font-medium mb-3">PRICING PLAN</p>
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900">EXCLUSIVE OFFERS</h2>
        </motion.div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {offers.map((offer, index) => {
            const IconComponent = offer.icon

            return (
              <motion.div
                key={offer.id}
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl h-96 group cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Dark Overlay - Always visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>

                {/* Title - Always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-white text-2xl md:text-3xl font-serif text-center leading-tight">
                    {offer.title}
                  </h3>
                </div>

                {/* Hover Content - Slides in from right */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/90 flex flex-col items-center justify-center p-8 z-20 gap-6"
                  variants={hoverVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  {/* Icon Circle */}
                  <div className="bg-gradient-to-br from-amber-500/30 to-amber-600/20 p-5 rounded-full backdrop-blur-md border border-amber-400/30">
                    <IconComponent className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                  </div>

                  {/* Description */}
                  <p className="text-white text-base md:text-lg text-center leading-relaxed font-light">
                    {offer.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default ExclusiveOffers
