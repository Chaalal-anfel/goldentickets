import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Define destination data for each tab with the new grid layout
const destinationData = {
  europe: {
    title: "EUROPEAN DESTINATIONS",
    subtitle: "DISCOVER EUROPE",
    description: "Experience rich history, iconic landmarks, and scenic beauty across Europe.",
    destinations: [
      {
        name: "Moscou",
        image: "/mosco.jpg",
        label: "Voyager vers",
        size: "large",
      },
      {
        name: "Royaume-Uni",
        image: "/Royaume-Uni.jpg",
        label: "Voyager vers",
        size: "medium",
      },
      {
        name: "Norvège",
        image: "/Norway.jpg",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Espagne",
        image: "/spain.jpg",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Italie",
        image: "/italy.jpg",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "France",
        image: "/French.jpg",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Autriche",
        image: "/Austria.jpg",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Finlande",
        image: "/Finland.jpg",
        label: "Voyager vers",
        size: "regular",
      },
   ],
  },

  asia: {
    title: "ASIAN DESTINATIONS",
    subtitle: "DISCOVER ASIA",
    description: "Explore vibrant cultures, ancient traditions, and breathtaking landscapes across Asia.",
    destinations: [
      {
        name: "Tokyo",
        image: "/tokyo.jpg?height=600&width=800",
        label: "Voyager vers",
        size: "large",
      },
      {
        name: "Malaisia",
        image: "/malaisie.webp?height=600&width=800",
        label: "Voyager vers",
        size: "medium",
      },
      {
        name: "Thaïlande",
        image: "/tailand.webp?height=600&width=800",
        label: "Voyager vers",
        size: "small",
      },
      {
        name: "Corée du Sud",
        image: "/coreesud.jpg?height=600&width=800",
        label: "Voyager vers",
        size: "small",
      },
      {
        name: "Chine",
        image: "/china.jpg?height=600&width=800",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Inde",
        image: "/inde.webp?height=600&width=800",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Vietnam",
        image: "/vetnam.jpg?height=600&width=800",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Philippines",
        image: "/philipine.jpg?height=600&width=800",
        label: "Voyager vers",
        size: "regular",
      },

    ],
  },
  middleEast: {
    title: "MIDDLE EAST DESTINATIONS",
    subtitle: "DISCOVER MIDDLE EAST",
    description:
      "Immerse yourself in rich heritage, stunning architecture, and warm hospitality across the Middle East.",
    destinations: [
      {
        name: "Dubaï",
        image: "/dubai.jpg?height=600&width=800",
        label: "Voyager vers",
        size: "large",
      },
      {
        name: "Istanbul",
        image: "/instanbul.jpg?height=400&width=600",
        label: "Voyager vers",
        size: "medium",
      },
      {
        name: "Jordanie",
        image: "/jordan.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "small",
      },
      {
        name: "Oman",
        image: "/Oman.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "small",
      },
      {
        name: "Qatar",
        image: "/Qatar.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Bahreïn",
        image: "/Bahrain.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },

      {
        name: "Arabie Saoudite",
        image: "/Saudi Arabia.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },

      {
        name: "Iran",
        image: "/Iran.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },

    ],
  },
  world: {
    title: "WORLDWIDE DESTINATIONS",
    subtitle: "DISCOVER THE WORLD",
    description: "Embark on unforgettable journeys to the most captivating destinations around the globe.",
    destinations: [
      {
        name: "Australie",
        image: "/australia.jpg?height=600&width=800",
        label: "Voyager vers",
        size: "large",
      },
      {
        name: "Brésil",
        image: "/brezil.webp?height=400&width=600",
        label: "Voyager vers",
        size: "medium",
      },
      {
        name: "Canada",
        image: "/canada.jpeg?height=300&width=400",
        label: "Voyager vers",
        size: "small",
      },

      {
        name: "États-Unis",
        image: "/usa.avif?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Argentine",
        image: "/argentina.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },

      {
        name: "Maldives",
        image: "/maldive.jpeg?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Mexique",
        image: "/mexic.jpg?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },
      {
        name: "Nouvelle-Zélande",
        image: "/newzaland.webp?height=300&width=400",
        label: "Voyager vers",
        size: "regular",
      },
    ],
  },
}

const DestinationsSection = () => {
  const [activeTab, setActiveTab] = useState("europe")
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const tabs = [
    { id: "europe", label: "Europe" },
    { id: "asia", label: "Asia" },
    { id: "middleEast", label: "Middle East" },
    { id: "world", label: "All the World" },
  ]

  const currentData = destinationData[activeTab]

  const renderDestinationGrid = (destinations) => {
    // Split destinations into different sections for the grid layout
    const largeDestination = destinations.find((d) => d.size === "large")
    const mediumDestination = destinations.find((d) => d.size === "medium")
    const smallDestinations = destinations.filter((d) => d.size === "small")
    const regularDestinations = destinations.filter((d) => d.size === "regular")

    return (
      <div className="grid grid-cols-4 grid-rows-4 gap-4 h-[800px]">
        {/* Large destination - takes 2x2 space */}
        {largeDestination && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="col-span-2 row-span-2 relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
          >
            <img
              src={largeDestination.image || "/placeholder.svg"}
              alt={largeDestination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm text-blue-300 mb-1">{largeDestination.label}</p>
              <h3 className="text-2xl font-medium">{largeDestination.name}</h3>
            </div>
          </motion.div>
        )}

        {/* Medium destination - top right */}
        {mediumDestination && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="col-span-2 row-span-1 relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
          >
            <img
              src={mediumDestination.image || "/placeholder.svg"}
              alt={mediumDestination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs text-blue-300 mb-1">{mediumDestination.label}</p>
              <h3 className="text-lg font-medium">{mediumDestination.name}</h3>
            </div>
          </motion.div>
        )}

        {/* Small destinations - right side */}
        {smallDestinations.map((destination, index) => (
          <motion.div
            key={destination.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="col-span-1 row-span-1 relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
          >
            <img
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-xs text-blue-300 mb-1">{destination.label}</p>
              <h3 className="text-sm font-medium">{destination.name}</h3>
            </div>
          </motion.div>
        ))}

        {/* Regular destinations - bottom rows */}
        {regularDestinations.slice(0, 8).map((destination, index) => (
          <motion.div
            key={destination.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="col-span-1 row-span-1 relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
          >
            <img
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-xs text-blue-300 mb-1">{destination.label}</p>
              <h3 className="text-sm font-medium">{destination.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      {/* Full-width Tabs */}
      <div className="flex w-full border-b border-golden-400/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-4 flex-1 text-center text-lg transition-colors duration-300 ${
              activeTab === tab.id ? "text-golden-400" : "text-gray-600 hover:text-golden-400/70"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-golden-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="container mx-auto px-4 mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-golden-400 uppercase tracking-wider text-center mb-4"
            >
              {currentData.subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-light text-center mb-6"
            >
              {currentData.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-center max-w-3xl mx-auto mb-16"
            >
              {currentData.description}
            </motion.p>

            {/* Custom Grid Layout */}
            {renderDestinationGrid(currentData.destinations)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default DestinationsSection
