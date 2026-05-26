export interface CreateTaskInput {
  teamUUID: string;
  title: string;
  description?: string;
  tag?: string;
  priority?: "low" | "medium" | "high";
  assigneeUUID?: string | null;
  position?: number;
}

export interface CreateTaskUseCase {
  execute(input: CreateTaskInput): Promise<void>;
}
