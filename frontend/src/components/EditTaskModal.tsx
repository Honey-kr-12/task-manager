import { useState } from "react";
import { api } from "../lib/api";
import type { Task } from "../types/task";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function EditTaskModal({
  task,
  refreshTasks,
}: {
  task: Task;
  refreshTasks: () => void;
}) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async () => {
    await api.put(`/tasks/${task._id}`, {
      title,
      description,
    });

    refreshTasks();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          ✏️ Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleUpdate} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}