import axios from "axios";
import { CredentialsApiPort, SendCredentialsDTO } from "../../domain/ports/output/CredentialsApiPort";
import { env } from "../../config/env";

export class CredentialsApiAdapter implements CredentialsApiPort {

  async sendCredentials(data: SendCredentialsDTO): Promise<void> {
    await axios.post(env.credentialsApiUrl, data);
  }
}