import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

interface Props {
  search: string;
  setSearch: (val: string) => void;

  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export default function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        placeholder="🔍 Search task by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Filter Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
