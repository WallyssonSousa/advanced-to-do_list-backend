export interface UpdateTaskInput {
  uuid: string;
  title?: string;
  description?: string;
  tag?: string;
  priority?: "low" | "medium" | "high";
  assigneeUUID?: string | null;
  status?: "todo" | "inprogress" | "done";
  position?: number;
}

export interface UpdateTaskUseCase {
  execute(input: UpdateTaskInput): Promise<void>;
}
