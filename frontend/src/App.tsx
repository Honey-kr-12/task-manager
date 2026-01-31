import { useEffect, useState } from "react";
import { api } from "../src/lib/api";
import type { Task } from "../src/types/task";

import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList";
import { getToken, logout } from "../src/lib/auth";

import Login from "./pages/Login";
import { Button } from "./components/ui/button";
import Register from "./pages/Register";
import StatCard from "./components/StatCard";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAuth, setIsAuth] = useState(!!getToken());

  const [showRegister, setShowRegister] = useState(false);

  const refreshTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    if (isAuth) refreshTasks();
  }, [isAuth]);

  if (!isAuth) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login
        onLogin={() => setIsAuth(true)}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

 return (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight">
          🚀 TaskFlow
        </h1>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            logout();
            setIsAuth(false);
          }}
        >
          Logout
        </Button>
      </div>
    </header>

    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">
          Task Dashboard
        </h2>
        <p className="text-gray-500 mt-2">
          Organize your work efficiently with filters, status updates & editing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Tasks" value={tasks.length} />
        <StatCard
          label="Pending"
          value={tasks.filter((t) => t.status === "Pending").length}
        />
        <StatCard
          label="Completed"
          value={tasks.filter((t) => t.status === "Completed").length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TaskForm refreshTasks={refreshTasks} />
        </div>

        <div className="lg:col-span-2">
          <TaskList tasks={tasks} refreshTasks={refreshTasks} />
        </div>
      </div>
    </main>
  </div>
)
}