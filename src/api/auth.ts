import { http } from "../lib/http";

export type LoginRequest = {
  email: string;
  password: string;
  device_name: string;
};

export async function login(data: LoginRequest) {
  const res = await http.post("/api/v1/auth/login", data);
  
  return res.data as { token: string };
}
