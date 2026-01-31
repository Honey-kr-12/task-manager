import { useState } from "react";
import type { Task } from "../types/task";

import TaskCard from "./TaskCard";
import TaskFilters from "./TaskFilters";

export default function TaskList({
  tasks,
  refreshTasks,
}: {
  tasks: Task[];
  refreshTasks: () => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <TaskFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks found 🚫
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              refreshTasks={refreshTasks}
            />
          ))
        )}
      </div>
    </div>
  );
}
