// Service de stockage pour gérer les demandes d'inscription
// Utilise localStorage pour la persistance

const STORAGE_KEY = "golden_ticket_requests"

/**
 * Récupère toutes les demandes depuis le localStorage
 * @returns {Array} Liste des demandes
 */
export function getAllRequests() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error)
    return []
  }
}

/**
 * Sauvegarde une nouvelle demande
 * @param {Object} requestData - Données de la demande
 * @returns {Object} La demande sauvegardée avec ID et timestamp
 */
export function saveRequest(requestData) {
  try {
    const requests = getAllRequests()
    const newRequest = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...requestData,
      status: "non traité",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    requests.push(newRequest)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    
    return newRequest
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la demande:", error)
    throw error
  }
}

/**
 * Met à jour le statut d'une demande
 * @param {string} requestId - ID de la demande
 * @param {string} newStatus - Nouveau statut
 * @returns {Object|null} La demande mise à jour ou null si non trouvée
 */
export function updateRequestStatus(requestId, newStatus) {
  try {
    const requests = getAllRequests()
    const requestIndex = requests.findIndex((req) => req.id === requestId)
    
    if (requestIndex === -1) {
      return null
    }
    
    requests[requestIndex].status = newStatus
    requests[requestIndex].updatedAt = new Date().toISOString()
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    
    return requests[requestIndex]
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la demande:", error)
    throw error
  }
}

/**
 * Supprime une demande
 * @param {string} requestId - ID de la demande
 * @returns {boolean} true si supprimée, false sinon
 */
export function deleteRequest(requestId) {
  try {
    const requests = getAllRequests()
    const filteredRequests = requests.filter((req) => req.id !== requestId)
    
    if (filteredRequests.length === requests.length) {
      return false // Aucune demande supprimée
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRequests))
    return true
  } catch (error) {
    console.error("Erreur lors de la suppression de la demande:", error)
    throw error
  }
}

/**
 * Récupère les demandes filtrées par statut
 * @param {string} status - Statut à filtrer
 * @returns {Array} Liste des demandes filtrées
 */
export function getRequestsByStatus(status) {
  const requests = getAllRequests()
  return requests.filter((req) => req.status === status)
}

/**
 * Vérifie si un email existe déjà
 * @param {string} email - Email à vérifier
 * @returns {boolean} true si l'email existe déjà
 */
export function emailExists(email) {
  const requests = getAllRequests()
  return requests.some((req) => req.email.toLowerCase() === email.toLowerCase())
}
