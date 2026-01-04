import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUp } from "lucide-react"

const experiences = [
  {
    id: "explore",
    title: "Explore Skies",
    image: "/experiences/explore-skies.jpg",
    description: "Discover the world from above with our premium flight options.",
  },
  {
    id: "stays",
    title: "Dream Stays",
    image: "/experiences/dream-stays.jpg",
    description: "Relax in luxurious accommodations tailored to your preferences.",
  },
  {
    id: "journeys",
    title: "Epic Journeys",
    image: "/experiences/epic-journeys.jpg",
    description: "Embark on unforgettable adventures across stunning destinations.",
  },
  {
    id: "rides",
    title: "Seamless Rides",
    image: "/experiences/seamless-rides.jpg",
    description: "Enjoy comfortable transfers and transportation throughout your trip.",
  },
]

const InteractiveExperience = () => {
  const [activeExperience, setActiveExperience] = useState("explore")
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section ref={ref} className="relative h-screen">
      <AnimatePresence mode="wait">
        {experiences.map(
          (experience) =>
            activeExperience === experience.id && (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={experience.image || "/placeholder.svg?height=1080&width=1920"}
                  alt={experience.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 grid grid-cols-4 text-white">
          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center justify-center border-r border-white/20 last:border-r-0 relative overflow-hidden group ${
                activeExperience === experience.id ? "bg-black/30" : "hover:bg-black/20"
              }`}
              onMouseEnter={() => setActiveExperience(experience.id)}
            >
              <div className="text-center p-6">
                <h3 className="text-3xl md:text-4xl font-light mb-4 transition-all duration-300 group-hover:text-golden-400">
                  {experience.title}
                </h3>
                {activeExperience === experience.id && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/80 max-w-xs mx-auto"
                  >
                    {experience.description}
                  </motion.p>
                )}
              </div>
              {activeExperience === experience.id && (
                <motion.div
                  layoutId="activeExperience"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-golden-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={handleScrollToTop}
        className="absolute bottom-8 right-8 z-20 bg-golden-400/20 border border-golden-400 text-white p-3 rounded-full hover:bg-golden-400/40 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </section>
  )
}

export default InteractiveExperience
