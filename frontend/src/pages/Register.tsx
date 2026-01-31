import { useState } from "react";
import { api } from "../lib/api";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function Register({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("✅ Account created successfully! Please login.");
      onSwitchToLogin();
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle>📝 Signup</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleRegister}>
          Create Account
        </Button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={onSwitchToLogin}
          >
            Login
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
