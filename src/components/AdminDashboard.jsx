import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  RefreshCw,
  Filter,
  Search,
  LogOut,
  Shield
} from "lucide-react"
import { 
  getAllRequests, 
  updateRequestStatus, 
  deleteRequest 
} from "@/lib/requestsStorage"
import { logoutAdmin, getAdminSession } from "@/lib/adminAuth"

const STATUS_OPTIONS = ["tous", "non traité", "en cours", "traité", "rejeté"]
const STATUS_COLORS = {
  "non traité": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "en cours": "bg-blue-100 text-blue-800 border-blue-200",
  "traité": "bg-green-100 text-green-800 border-green-200",
  "rejeté": "bg-red-100 text-red-800 border-red-200",
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [statusFilter, setStatusFilter] = useState("tous")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [adminSession, setAdminSession] = useState(null)

  // Charger la session admin
  useEffect(() => {
    setAdminSession(getAdminSession())
  }, [])

  // Charger les demandes au montage et rafraîchir périodiquement
  useEffect(() => {
    loadRequests()
    // Rafraîchir toutes les 5 secondes
    const interval = setInterval(loadRequests, 5000)
    return () => clearInterval(interval)
  }, [])

  // Filtrer les demandes quand le filtre ou la recherche change
  useEffect(() => {
    filterRequests()
  }, [requests, statusFilter, searchTerm])

  const loadRequests = () => {
    const allRequests = getAllRequests()
    // Trier par date de création (plus récent en premier)
    const sorted = allRequests.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )
    setRequests(sorted)
  }

  const filterRequests = () => {
    let filtered = [...requests]

    // Filtrer par statut
    if (statusFilter !== "tous") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }

    // Filtrer par recherche (nom, email, téléphone)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (req) =>
          req.fullName?.toLowerCase().includes(term) ||
          req.email?.toLowerCase().includes(term) ||
          req.phone?.toLowerCase().includes(term)
      )
    }

    setFilteredRequests(filtered)
  }

  const handleStatusChange = async (requestId, newStatus) => {
    setLoading(true)
    try {
      updateRequestStatus(requestId, newStatus)
      loadRequests() // Recharger les demandes
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
      alert("Erreur lors de la mise à jour du statut")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (requestId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      return
    }

    setLoading(true)
    try {
      deleteRequest(requestId)
      loadRequests()
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      alert("Erreur lors de la suppression")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusCount = (status) => {
    if (status === "tous") return requests.length
    return requests.filter((req) => req.status === status).length
  }

  const handleLogout = () => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logoutAdmin()
      navigate("/admin/login")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Shield className="text-golden-400" size={40} />
              Tableau de Bord - Demandes
            </h1>
            <p className="text-gray-600">
              Gérez les demandes d'inscription reçues
              {adminSession && (
                <span className="ml-2 text-sm text-gray-500">
                  • Connecté en tant que <strong>{adminSession.username}</strong>
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            title="Déconnexion"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Déconnexion</span>
          </button>
        </motion.div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {STATUS_OPTIONS.map((status) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                statusFilter === status
                  ? "bg-golden-400 text-white border-golden-400"
                  : "bg-white border-gray-200 hover:border-golden-400"
              }`}
              onClick={() => setStatusFilter(status)}
            >
              <div className="text-2xl font-bold">
                {getStatusCount(status)}
              </div>
              <div className="text-sm capitalize mt-1">
                {status === "tous" ? "Total" : status}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-400"
            />
          </div>
          <button
            onClick={loadRequests}
            disabled={loading}
            className="px-4 py-2 bg-golden-400 text-white rounded-lg hover:bg-golden-400/90 transition disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Actualiser
          </button>
        </motion.div>

        {/* Tableau des demandes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Clock size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">
                {searchTerm || statusFilter !== "tous"
                  ? "Aucune demande ne correspond à vos critères"
                  : "Aucune demande pour le moment"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom complet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Téléphone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request, index) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.fullName || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {request.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {request.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={request.status}
                          onChange={(e) =>
                            handleStatusChange(request.id, e.target.value)
                          }
                          disabled={loading}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${
                            STATUS_COLORS[request.status] || STATUS_COLORS["non traité"]
                          } focus:outline-none focus:ring-2 focus:ring-golden-400 cursor-pointer disabled:opacity-50`}
                        >
                          {STATUS_OPTIONS.slice(1).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(request.id)}
                            disabled={loading}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Footer avec informations */}
        {filteredRequests.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Affichage de {filteredRequests.length} demande(s) sur {requests.length} total
          </div>
        )}
      </div>
    </div>
  )
}
