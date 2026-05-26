export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "inprogress" | "done";

export interface TaskProps {
  uuid: string;
  title: string;
  description?: string;
  tag?: string;
  priority?: TaskPriority;
  assigneeUUID?: string | null;
  status: TaskStatus;
  position?: number;
  teamUUID: string;
}

export class Task {
  private uuid: string;
  private title: string;
  private description?: string;
  private tag?: string;
  private priority?: TaskPriority;
  private assigneeUUID?: string | null;
  private status: TaskStatus;
  private position?: number;
  private teamUUID: string;

  constructor(props: TaskProps) {
    this.uuid = props.uuid;
    this.title = props.title;
    this.description = props.description;
    this.tag = props.tag;
    this.priority = props.priority;
    this.assigneeUUID = props.assigneeUUID ?? null;
    this.status = props.status;
    this.position = props.position ?? 0;
    this.teamUUID = props.teamUUID;
  }

  getUUID() { return this.uuid; }
  getTitle() { return this.title; }
  getDescription() { return this.description; }
  getTag() { return this.tag; }
  getPriority() { return this.priority; }
  getAssigneeUUID() { return this.assigneeUUID; }
  getStatus() { return this.status; }
  getPosition() { return this.position; }
  getTeamUUID() { return this.teamUUID; }
}
