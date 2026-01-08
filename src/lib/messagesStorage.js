// Service de stockage pour gérer les messages de contact
// Utilise localStorage pour la persistance

const MESSAGES_STORAGE_KEY = "golden_ticket_messages"

/**
 * Récupère tous les messages depuis le localStorage
 * @returns {Array} Liste des messages
 */
export function getAllMessages() {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error)
    return []
  }
}

/**
 * Sauvegarde un nouveau message
 * @param {Object} messageData - Données du message
 * @returns {Object} Le message sauvegardé avec ID et timestamp
 */
export function saveMessage(messageData) {
  try {
    const messages = getAllMessages()
    const newMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...messageData,
      status: "non traité",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    messages.push(newMessage)
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages))
    
    return newMessage
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du message:", error)
    throw error
  }
}

/**
 * Met à jour le statut d'un message
 * @param {string} messageId - ID du message
 * @param {string} newStatus - Nouveau statut
 * @returns {Object|null} Le message mis à jour ou null si non trouvé
 */
export function updateMessageStatus(messageId, newStatus) {
  try {
    const messages = getAllMessages()
    const messageIndex = messages.findIndex((msg) => msg.id === messageId)
    
    if (messageIndex === -1) {
      return null
    }
    
    messages[messageIndex].status = newStatus
    messages[messageIndex].updatedAt = new Date().toISOString()
    
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages))
    
    return messages[messageIndex]
  } catch (error) {
    console.error("Erreur lors de la mise à jour du message:", error)
    throw error
  }
}

/**
 * Supprime un message
 * @param {string} messageId - ID du message
 * @returns {boolean} true si supprimé, false sinon
 */
export function deleteMessage(messageId) {
  try {
    const messages = getAllMessages()
    const filteredMessages = messages.filter((msg) => msg.id !== messageId)
    
    if (filteredMessages.length === messages.length) {
      return false // Aucun message supprimé
    }
    
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(filteredMessages))
    return true
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error)
    throw error
  }
}

/**
 * Récupère les messages filtrés par statut
 * @param {string} status - Statut à filtrer
 * @returns {Array} Liste des messages filtrés
 */
export function getMessagesByStatus(status) {
  const messages = getAllMessages()
  return messages.filter((msg) => msg.status === status)
}
