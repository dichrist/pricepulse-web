
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { setToken } from "../auth/session";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type ApiError = { message?: string };

    function getAxiosMessage(err: unknown) {
      if (!axios.isAxiosError(err)) return null;
      const data = err.response?.data as ApiError | undefined;
      return data?.message ?? null;
    }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token } = await login({ email, password, device_name: "web" });
      setToken(token);
      nav("/price-entries");
    } catch (err: unknown) {
      setError(getAxiosMessage(err) ?? "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: 16 }}>
      <h1>PricePulse</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="senha" type="password" />
        <button disabled={loading} type="submit">{loading ? "Entrando..." : "Entrar"}</button>
        {error && <p style={{ color: "tomato" }}>{error}</p>}
      </form>
    </div>
  );
}
