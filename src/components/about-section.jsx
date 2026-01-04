import React, { useRef } from "react"
import { Phone } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const topMapRef = useRef(null)
  const bottomMapRef = useRef(null)

  const { scrollY } = useScroll()
  const topMapY = useTransform(scrollY, [0, 1000], [0, -50])
  const bottomMapY = useTransform(scrollY, [0, 1000], [0, 50])

  return (
    <section ref={ref} className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-golden-400 uppercase tracking-wider mb-4"
            >
              ABOUT US
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-light mb-6"
            >
              GOLDEN TICKETS
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-6"
            >
              Every Mile Tells A Story
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-600 mb-10"
            >
              Through Our Continuous Innovations, We Have Been Leading The Market Since 2015 And Have Stirred The Iraqi
              Travel Industry In A Different Direction That Was In Before Us, Then Expanded To Many Parts Of The World
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center"
            >
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">+964 750 454 7323</span>
            </motion.div>
          </motion.div>

          <div className="relative h-[400px] overflow-hidden flex gap-4">
            <motion.div ref={topMapRef} style={{ y: topMapY }} className="flex-1">
              <img
                src="/file.png"
                alt="World Map"
                className="object-contain w-full h-full"
              />
            </motion.div>

            <motion.div ref={bottomMapRef} style={{ y: bottomMapY }} className="flex-1">
              <img
                src="/file2.png"
                alt="World Map"
                className="object-contain w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
