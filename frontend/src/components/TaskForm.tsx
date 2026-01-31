import { useState } from "react";
import { api } from "../lib/api";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

interface Props {
  refreshTasks: () => void;
}

export default function TaskForm({ refreshTasks }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/tasks/", {
      title,
      description,
      status: "Pending",
    });

    setTitle("");
    setDescription("");
    refreshTasks();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>➕ Add New Task</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleAddTask} className="space-y-4">
          <Input
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
