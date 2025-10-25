import { generateId, hashPassword } from "@/utils/auth";

export class AuthService {
  static sessionKey = "ticketapp_session";
  static usersKey = "ticketapp_users"

  static signup(userData) {
    // Check if user already exists
    const existingUsers = this.getUsers();
    const existingUser = existingUsers.find((user) => user.email === userData.email || user.username === userData.username);

    if(existingUser) {
      return { success: false, message: "User already exists" }
    }

    const {username, email, password} = userData;

    // Create new user
    const newUser = {
      id: generateId(),
      username,
      email,
      password: hashPassword(password),
      createdAt: new Date().toISOString()
    }

    // Save user to localStorage
    existingUsers.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(existingUsers));

    return { success: true  }
  }

  static login(email, password) {
    if (email && password) {
      return true;
    }
    return false;
  }

  static generateToken(user) {
    const header = btoa(JSON.stringify({ alg: "HS256", type: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        ...user,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    );
    const signature = btoa(this.sessionKey);
    return `${header}.${payload}.${signature}`;
  }

  static verifyToken(token) {
    try {
      const [, payload] = token.split(".");
      const userData = JSON.parse(atob(payload));

      if (userData.exp < Date.now()) {
        this.logout();
        return null;
      }

      return userData;
    } catch {
      return null;
    }
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return token && this.verifyToken(token);
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static getUsers() {
    const ticketAppUsers = localStorage.getItem(this.usersKey);
    return ticketAppUsers ? JSON.parse(ticketAppUsers) : [];
  }

}
