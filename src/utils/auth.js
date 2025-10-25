/**
 * Generate a unique ID for users/tickets
 */

export const generateId = () => {
  return 'id_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
};

/**
 * Hash password (simplified frontend version)
 * Note: In production, hashing should be done on the backend
 * @param {string} password 
 * @returns {string} Hashed password
 */

export const hashPassword = async (password) => {
  // For frontend, we can use a simple hash or rely on backend hashing
  // This is mainly for basic obfuscation
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'ticket-app-salt');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Compare password with hashed password
 * @param {string} plainPassword 
 * @param {string} hashedPassword 
 * @returns {boolean} Match result
 */

export const comparePassword = (plainPassword, hashedPassword) => {
  const newHash = hashPassword(plainPassword);
  return newHash === hashedPassword;
};