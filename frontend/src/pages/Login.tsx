import { useState } from "react";
import { api } from "../lib/api";
import { saveToken } from "../lib/auth";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function Login({
  onLogin,
  onSwitchToRegister,
}: {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      saveToken(res.data.token);
      onLogin();
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle>🔐 Login</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {/* ✅ Loading Button */}
        <Button
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </CardContent>

      <p className="text-sm text-center text-gray-500 pb-4">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={onSwitchToRegister}
        >
          Signup
        </span>
      </p>
    </Card>
  );
}
