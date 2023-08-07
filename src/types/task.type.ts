export interface TaskType {
  id: string;
  listTaskId: string;
  name: string;
  status: boolean;
  member?: string | null;
}
