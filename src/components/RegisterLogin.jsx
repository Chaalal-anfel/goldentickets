import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import { saveRequest, emailExists } from "@/lib/requestsStorage"

export default function RegisterLogin({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error message when user types
    if (message.text) setMessage({ type: "", text: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      if (mode === "register") {
        // Validation for registration
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: "error", text: "Passwords do not match" })
          setLoading(false)
          return
        }

        if (formData.password.length < 6) {
          setMessage({ type: "error", text: "Password must contain at least 6 characters" })
          setLoading(false)
          return
        }

        // Check if email already exists
        if (emailExists(formData.email)) {
          setMessage({ type: "error", text: "This email is already registered" })
          setLoading(false)
          return
        }

        // Save the request
        const requestData = {
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          // Note: In production, NEVER store passwords in plain text
          // This is just for demo, but you should use a hash
        }

        saveRequest(requestData)

        setMessage({ 
          type: "success", 
          text: "Your request has been successfully registered! We will contact you soon." 
        })

        // Reset the form
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
          phone: "",
        })

        // Switch to login mode after 3 seconds
        setTimeout(() => {
          setMode("login")
          setMessage({ type: "", text: "" })
        }, 3000)
      } else {
        // Login mode - currently just a simulation
        // In production, you should verify against a database
        setMessage({ type: "error", text: "Login feature coming soon" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." })
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="register-login" className="navbar-font min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full mt-15 max-w-5xl bg-white rounded-3xl shadow-l overflow-hidden grid grid-cols-1 md:grid-cols-2 h-auto md:h-[560px]">

        {/* ===== SIDE PANEL ===== */}
        <motion.div
          className={`flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 text-center bg-gray-50 min-h-full overflow-hidden
          ${mode === "login" ? "order-1" : "order-2"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img src="/logo-dark.png" alt="Logo"  />

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          <p className="text-gray-500 mb-10 max-w-sm">
            {mode === "login"
              ? "Sign in to continue to your dashboard."
              : "Join us and start your journey today."}
          </p>

          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="px-8 py-3 rounded-full border border-gray-900 text-gray-900 hover:bg-golden-400 hover:text-white transition"
          >
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </motion.div>

        {/* ===== FORM PANEL ===== */}
        <div
          className={`p-8 sm:p-10 md:p-12 bg-golden-100 navbar-font overflow-y-auto min-h-full flex flex-col justify-center
          ${mode === "login" ? "order-2" : "order-1"}`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? -40 : 40 }}
              transition={{ duration: 0.35 }}
              className="max-w-md w-full mx-auto"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {mode === "login" ? "Sign in" : "Sign up"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Message de succès/erreur */}
                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      message.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {message.type === "success" ? (
                      <CheckCircle size={18} />
                    ) : (
                      <XCircle size={18} />
                    )}
                    <span className="text-sm">{message.text}</span>
                  </motion.div>
                )}

                {mode === "register" && (
                  <>
                    <Input
                      label="Full name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />

                    <Input
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 890"
                    />
                  </>
                )}

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                />

                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  show={showPassword}
                  setShow={setShowPassword}
                />

                {mode === "register" && (
                  <PasswordInput
                    label="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    show={showConfirmPassword}
                    setShow={setShowConfirmPassword}
                  />
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <a href="/forgot-password" className="hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-golden-400 text-white font-medium hover:bg-golden-400/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Loading..."
                    : mode === "login"
                    ? "Sign in"
                    : "Create account"}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ===== INPUT COMPONENTS ===== */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
  )
}

function PasswordInput({ label, show, setShow, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}
