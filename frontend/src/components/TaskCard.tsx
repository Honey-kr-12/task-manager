import type { Task } from "../types/task";
import { api } from "../lib/api";

import { Button } from "../components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

import EditTaskModal from "./EditTaskModal";
import { Badge } from "./ui/badge";

export default function TaskCard({
  task,
  refreshTasks,
}: {
  task: Task;
  refreshTasks: () => void;
}) {
  const handleDelete = async () => {
    await api.delete(`/tasks/${task._id}`);
    refreshTasks();
  };

  const handleStatusChange = async (value: string) => {
    await api.put(`/tasks/${task._id}`, { status: value });
    refreshTasks();
  };

  return (
    <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-lg">{task.title}</h2>

        <Badge variant="secondary">{task.status}</Badge>
      </div>

      <p className="text-sm text-gray-500">{task.description}</p>

      <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
        <Select defaultValue={task.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 w-full md:w-auto">
          <EditTaskModal task={task} refreshTasks={refreshTasks} />

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}