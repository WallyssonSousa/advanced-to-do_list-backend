export interface ReorderItem {
  uuid: string;
  status?: "todo" | "inprogress" | "done";
  position?: number;
}

export interface ReorderTasksUseCase {
  execute(teamUUID: string, items: ReorderItem[]): Promise<void>;
}
