export class AuthService {
  static secretKey = "my_secret_key";

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
    const signature = btoa(this.secretKey);
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
}
