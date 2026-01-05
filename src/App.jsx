// import { useEffect } from "react"
// import Navbar from "./components/Navbar"
// import HeroSection from "./components/HeroSection"
// import DestinationsSection from "./components/DestinationsSection"
// import { AnimatePresence } from "framer-motion"
// import Lenis from "@studio-freight/lenis"
// import AboutSections from "./components/about-section"
// import ServicesSection from "./components/services-section"
// import ServicesSlider from "./components/services-slider"
// import TestimonialsSection from "./components/testimonials-section"
// import InteractiveExperience from "./components/interactive-experience"
// import Footer from "./components/footer"
// import CtaSection from "./components/cta-section"
// import TestsimonialsSection from "./components/GoldenTicketExperiences"
// import RegisterLogin from "./components/RegisterLogin"


// function App() {
//   // Initialize smooth scrolling
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       direction: "vertical",
//       gestureDirection: "vertical",
//       smooth: true,
//       smoothTouch: false,
//       touchMultiplier: 2,
//     })

//     function raf(time) {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }

//     requestAnimationFrame(raf)

//     return () => {
//       lenis.destroy()
//     }
//   }, [])

//   return (
//     <AnimatePresence mode="wait">
//       <main className="min-h-screen overflow-hidden">
//         <Navbar />
//         <HeroSection />
//         <AboutSections />
//         <DestinationsSection />
//         <TestsimonialsSection />
//         <ServicesSection/>
//         <ServicesSlider />
//         <TestimonialsSection />
//         <InteractiveExperience />
//         <CtaSection />
//         <Footer />
//         <RegisterLogin />
//       </main>
//     </AnimatePresence>
//   )
// }

// export default App

import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Lenis from "@studio-freight/lenis"

import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import DestinationsSection from "./components/DestinationsSection"
import AboutSections from "./components/about-section"
import ServicesSection from "./components/services-section"
import ServicesSlider from "./components/services-slider"
import InteractiveExperience from "./components/interactive-experience"
import Footer from "./components/footer"
import CtaSection from "./components/cta-section"
import TestsimonialsSection from "./components/GoldenTicketExperiences"
import RegisterLogin from "./components/RegisterLogin"
import ExclusiveOffers from "./components/ExclusiveOffers"

function HomePage() {
  return (
    <>
        <Navbar />
        <HeroSection />
        <AboutSections />
        <ServicesSlider />
        <DestinationsSection />
        <ServicesSection />
        <TestsimonialsSection />
        <ExclusiveOffers />
        <RegisterLogin />
        <CtaSection />
        <Footer />
    </>
  )
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<HomePage />} />

          {/* LOGIN / REGISTER */}
          <Route path="/login" element={<RegisterLogin initialMode="login" />} />
          <Route path="/register" element={<RegisterLogin initialMode="register" />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
