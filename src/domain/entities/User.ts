export interface UserProps {
  uuid: string;
  name: string;
  email: string;
  password: string;
  isFirstLogin: boolean;
  isTempPassword: boolean;
}

export class User {
  private uuid: string;
  private name: string;
  private email: string;
  private password: string;
  private isFirstLogin: boolean;
  private isTempPassword: boolean;

  constructor(props: UserProps) {
    this.uuid = props.uuid;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.isFirstLogin = props.isFirstLogin;
    this.isTempPassword = props.isTempPassword;
  }

  getUUID() { return this.uuid; }
  getName() { return this.name; }
  getEmail() { return this.email; }
  getPassword() { return this.password; }
  getIsFirstLogin() { return this.isFirstLogin; }
  getIsTempPassword() { return this.isTempPassword; }
}