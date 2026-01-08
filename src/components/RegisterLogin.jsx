
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
    companyAddress: "",
    root: "",
    username: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (message.text) setMessage({ type: "", text: "" })
  }

  // ✅ ONLY CHANGE: REAL HTML LOGIN SUBMIT
  const submitLoginForm = () => {
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://b2b.goldentkts.com/index.php/login/post"

    const fields = ["root", "username", "password"]

    fields.forEach((field) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = field
      input.value = formData[field]
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: "", text: "" })

    try {
      if (mode === "register") {
        // ===== REGISTER LOGIC (UNCHANGED) =====
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: "error", text: "Passwords do not match" })
          return
        }

        if (formData.password.length < 6) {
          setMessage({
            type: "error",
            text: "Password must contain at least 6 characters",
          })
          return
        }

        if (emailExists(formData.email)) {
          setMessage({
            type: "error",
            text: "This email is already registered",
          })
          return
        }

        saveRequest({
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          companyAddress: formData.companyAddress,
        })

        setMessage({
          type: "success",
          text: "Your request has been successfully registered!",
        })

        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
          phone: "",
          companyAddress: "",
          root: "",
          username: "",
        })

        setTimeout(() => {
          setMode("login")
          setMessage({ type: "", text: "" })
        }, 3000)
      } else {
        // ===== LOGIN LOGIC (ONLY THIS CHANGED) =====
        if (!formData.root || !formData.username || !formData.password) {
          setMessage({
            type: "error",
            text: "Please fill in all fields",
          })
          return
        }

        submitLoginForm()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="register-login" className="navbar-font min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full mt-15 max-w-5xl bg-white rounded-3xl shadow-l overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* ===== SIDE PANEL (UNCHANGED) ===== */}
        <motion.div
          className={`flex flex-col items-center justify-center p-10 text-center bg-gray-50
          ${mode === "login" ? "order-1" : "order-2"}`}
        >
          <img src="/logo-dark.jpeg" alt="Logo" />
          <h2 className="text-3xl font-semibold mb-4">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-gray-500 mb-8">
            {mode === "login"
              ? "Sign in to continue."
              : "Join us and start your journey."}
          </p>
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="px-8 py-3 rounded-full border"
          >
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </motion.div>

        {/* ===== FORM PANEL (UNCHANGED) ===== */}
        <div className={`p-10 bg-golden-100 ${mode === "login" ? "order-2" : "order-1"}`}>
          <AnimatePresence mode="wait">
            <motion.div key={mode} className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4">
                {mode === "login" ? "Sign in" : "Sign up"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">

                {message.text && (
                  <div className={`p-3 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}>
                    {message.text}
                  </div>
                )}

                {mode === "login" ? (
                  <>
                    <Input label="Root" name="root" value={formData.root} onChange={handleInputChange} />
                    <Input label="Username" name="username" value={formData.username} onChange={handleInputChange} />
                  </>
                ) : (
                  <>
                    <Input label="Full name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                    <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    <div>
                      <label className="block text-sm mb-1">Company Address</label>
                      <textarea
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border rounded-lg resize-none"
                        placeholder="Enter your company address"
                      />
                    </div>
                  </>
                )}

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

                <button type="submit" className="w-full py-3 rounded-full bg-golden-400 text-white">
                  {loading ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
                </button>

              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ===== INPUT COMPONENTS (UNCHANGED) ===== */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input {...props} required className="w-full px-4 py-3 border rounded-lg" />
    </div>
  )
}

function PasswordInput({ label, show, setShow, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}
