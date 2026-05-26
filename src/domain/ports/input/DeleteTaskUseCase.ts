export interface DeleteTaskUseCase {
  execute(uuid: string): Promise<void>;
}
