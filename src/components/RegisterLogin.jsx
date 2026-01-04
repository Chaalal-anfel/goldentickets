"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Link } from "lucide-react"
import Navbar from "./Navbar"

export default function RegisterLogin({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      console.log(mode, formData)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Navbar />
      <div className="w-full mt-15 max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* ===== SIDE PANEL ===== */}
        <motion.div
          className={`flex flex-col items-center justify-center p-12 text-center bg-gray-50
          ${mode === "login" ? "order-1" : "order-2"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%202-EmHNE8CQCqYOkuYkiY3CuT3Wba6FVw.png"
 alt="Logo"  />

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
            className="px-6 py-3 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition"
          >
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </motion.div>

        {/* ===== FORM PANEL ===== */}
        <div
          className={`p-12
          ${mode === "login" ? "order-2" : "order-1"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? -40 : 40 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {mode === "login" ? "Sign in" : "Sign up"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">

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
                    <Link href="/forgot-password" className="hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition disabled:opacity-50"
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
