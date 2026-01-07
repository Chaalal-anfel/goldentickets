// Service d'authentification admin
// En production, utilisez un backend sécurisé avec JWT

const ADMIN_CREDENTIALS_KEY = "admin_credentials"
const ADMIN_SESSION_KEY = "admin_session"

// Configuration par défaut (à changer en production!)
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123", // ⚠️ À changer absolument en production!
}

/**
 * Initialise les credentials admin si ce n'est pas déjà fait
 */
export function initAdminCredentials() {
  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
  if (!stored) {
    // En production, ne stockez JAMAIS le mot de passe en clair
    // Ici c'est juste pour la démo - utilisez un hash en production
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN))
  }
}

/**
 * Vérifie si l'admin est connecté
 * @returns {boolean}
 */
export function isAdminAuthenticated() {
  const session = sessionStorage.getItem(ADMIN_SESSION_KEY)
  if (!session) return false

  try {
    const sessionData = JSON.parse(session)
    // Vérifier que la session n'est pas expirée (24h)
    const now = Date.now()
    if (now > sessionData.expiresAt) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

/**
 * Authentifie l'admin
 * @param {string} username - Nom d'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Object} { success: boolean, message: string }
 */
export function loginAdmin(username, password) {
  try {
    initAdminCredentials()
    const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
    const credentials = JSON.parse(stored)

    if (username === credentials.username && password === credentials.password) {
      // Créer une session valide 24h
      const sessionData = {
        username: credentials.username,
        loggedInAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 heures
      }
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
      return { success: true, message: "Login successful" }
    } else {
      return { success: false, message: "Invalid username or password" }
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Login error occurred" }
  }
}

/**
 * Déconnecte l'admin
 */
export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

/**
 * Change le mot de passe admin
 * @param {string} oldPassword - Ancien mot de passe
 * @param {string} newPassword - Nouveau mot de passe
 * @returns {Object} { success: boolean, message: string }
 */
export function changeAdminPassword(oldPassword, newPassword) {
  try {
    if (!isAdminAuthenticated()) {
      return { success: false, message: "Non authentifié" }
    }

    const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
    const credentials = JSON.parse(stored)

    if (oldPassword !== credentials.password) {
      return { success: false, message: "Ancien mot de passe incorrect" }
    }

    if (newPassword.length < 6) {
      return { success: false, message: "Le nouveau mot de passe doit contenir au moins 6 caractères" }
    }

    credentials.password = newPassword
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials))

    return { success: true, message: "Mot de passe modifié avec succès" }
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error)
    return { success: false, message: "Erreur lors du changement de mot de passe" }
  }
}

/**
 * Obtient les informations de session
 * @returns {Object|null}
 */
export function getAdminSession() {
  try {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY)
    if (!session) return null
    return JSON.parse(session)
  } catch {
    return null
  }
}
