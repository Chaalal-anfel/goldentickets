import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { isAdminAuthenticated } from "@/lib/adminAuth"
import { motion } from "framer-motion"

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const isAuthenticated = isAdminAuthenticated()

  useEffect(() => {
    if (!isAuthenticated) {
      // Rediriger vers la page de login admin
      navigate("/admin/login", { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    // Afficher un loader pendant la redirection
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </motion.div>
      </div>
    )
  }

  return children
}
