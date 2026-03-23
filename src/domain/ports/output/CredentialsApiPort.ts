export interface SendCredentialsDTO {
  name: string;
  email: string;
  projectId: string;
  tempPassword: string;
}

export interface CredentialsApiPort {
  sendCredentials(data: SendCredentialsDTO): Promise<void>;
}