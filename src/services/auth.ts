import api from "./api";
import { AxiosError } from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  id_documento: string;
  status: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  address: string;
  id_documento: string;
  status: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: User;
  token: string;
}

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("auth_token");
    if (this.token) {
      this.setAuthHeader(this.token);
    }
  }

  private setAuthHeader(token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private removeAuthHeader() {
    delete api.defaults.headers.common["Authorization"];
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/register", userData);
      const { user, token } = response.data;

      this.token = token;
      localStorage.setItem("auth_token", token);
      this.setAuthHeader(token);

      return { user, token };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Error en el registro"
        );
      }
      throw error;
    }
  }

  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token } = response.data;

      this.token = token;
      localStorage.setItem("auth_token", token);
      this.setAuthHeader(token);

      const user = await this.getMe();
      return { user, token };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || "Error en el login");
      }
      throw error;
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Error al obtener usuario"
        );
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Error al hacer logout en el servidor:", error);
    } finally {
      this.token = null;
      localStorage.removeItem("auth_token");
      this.removeAuthHeader();
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await api.post("/auth/refresh");
      const { token } = response.data;

      this.token = token;
      localStorage.setItem("auth_token", token);
      this.setAuthHeader(token);

      return token;
    } catch (error: unknown) {
      await this.logout();
      throw new Error("Sesión expirada");
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const authService = new AuthService();
