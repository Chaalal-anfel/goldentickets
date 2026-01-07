import { Plane, Hotel, Trophy, Globe, Briefcase, Car } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Book flights to any destination worldwide with our easy-to-use booking system.",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Find and book accommodations that suit your preferences and budget.",
  },
  {
    icon: Globe,
    title: "Tour Packages",
    description: "Explore our carefully curated tour packages for unforgettable experiences.",
  },
  {
    icon: Briefcase,
    title: "Secure Payments",
    description: "Enjoy peace of mind with our secure and flexible payment options.",
  },
  {
    icon: Trophy,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you.",
  },
  {
    icon: Car,
    title: "Travel Insurance",
    description: "Protect your journey with comprehensive travel insurance coverage.",
  },
]

const contentVariants = {
  rest: {
    y: 20,
    opacity: 0,
  },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const ServicesSection = () => {
  return (
    <section className="py-20 bg-golden-100">
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-1 items-center">

        {/* LEFT CONTENT */}
        <div className="mb-12 lg:mb-0 flex flex-col justify-center h-full lg:pr-8">
          <span className="uppercase tracking-widest text-xl text-[#C9A063]">
            Exclusive Services
          </span>

          <h2 className="text-3xl font-light mt-4 mb-6">
            Our Amenities
          </h2>

          <p className="text-gray-600 max-w-md mb-8">
            Discover premium services designed to enhance your journey,
            offering elegance, comfort, and convenience.
          </p>

          <button className="w-1/2 bg-[#C9A063] text-white px-8 py-3 rounded-full hover:opacity-90 transition">
            View All Amenities
          </button>
        </div>

        {/* RIGHT GRID */}
        <div className="grid  col-span-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative h-52 bg-white rounded-xl border border-gray-100 cursor-pointer overflow-hidden"
            >
              {/* Hover background */}
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 bg-[#C9A063]"
              />

              {/* Hover content (slide up) */}
              <motion.div
                variants={contentVariants}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white"
              >
                <div className="mb-4">
                  <service.icon size={40} />
                </div>

                <h3 className="text-lg font-medium mb-2">
                  {service.title}
                </h3>

                <p className="text-sm">
                  {service.description}
                </p>
              </motion.div>

              {/* Default state (hidden on hover) */}
              <motion.div
                variants={{
                  rest: { opacity: 1 },
                  hover: { opacity: 0 },
                }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="mb-4 text-[#C9A063]">
                  <service.icon size={40} />
                </div>
                <h3 className="text-lg font-medium text-gray-800">
                  {service.title}
                </h3>
              </motion.div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
