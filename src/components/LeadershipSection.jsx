import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, Linkedin, Award, Send, MessageSquare } from "lucide-react"
import { useState } from "react"
import { saveMessage } from "@/lib/messagesStorage"

const LeadershipSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // CEO Information - Update these with actual data
  const ceoData = {
    name: "OUR CEO ", // Replace with actual CEO name
    title: "Chief Executive Officer",
    email: "infos@goldentkts.com", // Replace with actual email
    phone: "+964 750 454 7323", // Replace with actual phone
    linkedin: "https://www.linkedin.com/in/omer-hayder-199212152/", // Replace with actual LinkedIn URL
    photo: "/ceo.jpeg", // Place CEO photo in /public/ folder
    bio: "Leading Golden Ticket since 2015, transforming the travel industry with innovative solutions and exceptional service.",
  }

  // Contact form state
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState({ type: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formStatus.message) setFormStatus({ type: "", message: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: "", message: "" })

    // Validation
    if (!formData.email || !formData.subject || !formData.message) {
      setFormStatus({ type: "error", message: "Please fill in all fields" })
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: "error", message: "Please enter a valid email address" })
      setIsSubmitting(false)
      return
    }

    try {
      // Save message to storage
      const messageData = {
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }

      saveMessage(messageData)

      setFormStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      })

      // Reset form
      setFormData({
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error saving message:", error)
      setFormStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} id="leadership" className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-golden-400 uppercase tracking-wider mb-4 text-sm font-medium"
          >
            LEADERSHIP
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-light mb-4"
          >
            Meet Our CEO
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Leading innovation and excellence in the travel industry
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* CEO Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-golden-100 rounded-2xl p-8 md:p-10 shadow-lg flex flex-col h-full"
          >
            <div className="flex flex-col items-center md:items-start md:flex-row gap-6 flex-1">
              {/* CEO Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  <img
                    src={ceoData.photo}
                    alt={ceoData.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400?text=CEO+Photo"
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-golden-400 rounded-full p-2 shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* CEO Info */}
              <div className="flex-1 w-full text-center md:text-left">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-2xl md:text-3xl font-semibold mb-2"
                >
                  {ceoData.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-golden-400 text-lg mb-4"
                >
                  {ceoData.title}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-gray-600 mb-6 text-sm leading-relaxed"
                >
                  {ceoData.bio}
                </motion.p>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="space-y-3 mt-auto"
                >
                  <a
                    href={`mailto:${ceoData.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-golden-400 transition-colors group justify-center md:justify-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-golden-400 transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm">{ceoData.email}</span>
                  </a>

                  <a
                    href={`tel:${ceoData.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-golden-400 transition-colors group justify-center md:justify-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-golden-400 transition-colors flex-shrink-0">
                      <Phone className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm">{ceoData.phone}</span>
                  </a>

                  <a
                    href={ceoData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-golden-400 transition-colors group justify-center md:justify-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-golden-400 transition-colors flex-shrink-0">
                      <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm">Connect on LinkedIn</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            className="bg-gradient-to-br from-golden-100 to-amber-50 rounded-2xl p-6 shadow-xl border border-golden-200/50 h-full flex flex-col backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 mb-5"
            >
              <motion.div
                animate={inView ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <MessageSquare className="w-5 h-5 text-golden-400" />
              </motion.div>
              <h4 className="text-lg font-semibold text-gray-800">Send a Message</h4>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Status Message */}
              {formStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-3 rounded-lg text-sm ${
                    formStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none text-gray-900 transition-all duration-300 ${
                    focusedField === "email"
                      ? "border-golden-400 ring-2 ring-golden-400/20 shadow-md"
                      : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                />
              </motion.div>

              {/* Subject */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="subject" className="block text-xs font-medium text-gray-600 mb-1.5">
                  Subject
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField("")}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none text-gray-900 transition-all duration-300 ${
                    focusedField === "subject"
                      ? "border-golden-400 ring-2 ring-golden-400/20 shadow-md"
                      : "border-gray-300"
                  }`}
                  placeholder="What is your message about?"
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="message" className="block text-xs font-medium text-gray-600 mb-1.5">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField("")}
                  required
                  rows={3}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none text-gray-900 resize-none transition-all duration-300 ${
                    focusedField === "message"
                      ? "border-golden-400 ring-2 ring-golden-400/20 shadow-md"
                      : "border-gray-300"
                  }`}
                  placeholder="Write your message here..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-golden-400 text-white font-medium rounded-lg hover:bg-golden-400/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-5 w-5 border-2 border-white border-t-transparent"
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LeadershipSection
