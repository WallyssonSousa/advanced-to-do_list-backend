import { AppDataSource } from "./infrastructure/persistence/typeorm/data-source";
import { UserEntity } from "./infrastructure/persistence/typeorm/entities/UserEntity";

import { TypeOrmUserRepository } from "./infrastructure/persistence/typeorm/repositories/TypeOrmUserRepository";
import { CredentialsApiAdapter } from "./infrastructure/http/CredentialsApiAdapter";

import { CreateUserService } from "./application/use-cases/CreateUserService";
import { CreateUserController } from "./infrastructure/http/controllers/CreateUserController";
import { ChangePasswordController } from "./infrastructure/http/controllers/ChangePasswordController";
import { ChangePasswordService } from "./application/use-cases/ChangePasswordService";
import { AuthenticateUserController } from "./infrastructure/http/controllers/AuthenticateUserController";
import { AuthenticateUserService } from "./application/use-cases/AuthenticateUserService";
import { JwtTokenAdapter } from "./infrastructure/adapter/JwtTokenAdapter";
import { TypeOrmTeamRepository } from "./infrastructure/persistence/typeorm/repositories/TypeOrmTeamRepository";
import { TeamEntity } from "./infrastructure/persistence/typeorm/entities/TeamEntity";
import { UserTeamEntity } from "./infrastructure/persistence/typeorm/entities/UserTeamEntity";
import { CreateTeamService } from "./application/use-cases/CreaeteTeamService";
import { CreateTeamController } from "./infrastructure/http/controllers/CreateTeamController";
import { GetUserTeamsService } from "./application/use-cases/GetUserTeamsService";
import { GetUserTeamsController } from "./infrastructure/http/controllers/GetUserTeamsController";
import { GetAllUsersService } from "./application/use-cases/GetAllUsersService";
import { GetAllUsersController } from "./infrastructure/http/controllers/GetAllUsersController";
import { UpdateTeamService } from "./application/use-cases/UpdateTeamService";
import { UpdateTeamController } from "./infrastructure/http/controllers/UpdateTeamController";
import { GetTeamUsersService } from "./application/use-cases/GetTeamUsersService";
import { GetTeamUsersController } from "./infrastructure/http/controllers/GetTeamUsersController";
import { LeaveTeamService } from "./application/use-cases/LeaveTeamService";
import { LeaveTeamController } from "./infrastructure/http/controllers/LeaveTeamController";

export async function buildCreateUserController() {

  const userRepository = new TypeOrmUserRepository(
    AppDataSource.getRepository(UserEntity)
  );

  const credentialsApi = new CredentialsApiAdapter();

  const service = new CreateUserService(
    userRepository,
    credentialsApi
  );

  return new CreateUserController(service);
}

export async function buildLoginController() {
  const repo = new TypeOrmUserRepository(
    AppDataSource.getRepository(UserEntity)
  );

  const tokenProvider = new JwtTokenAdapter();

  const service = new AuthenticateUserService(repo, tokenProvider);

  return new AuthenticateUserController(service);
}

export async function buildChangePasswordController() {
  const repo = new TypeOrmUserRepository(
    AppDataSource.getRepository(UserEntity)
  );

  const service = new ChangePasswordService(repo);

  return new ChangePasswordController(service);
}

export async function buildCreateTeamController() {
  const teamRepository = new TypeOrmTeamRepository(
    AppDataSource.getRepository(TeamEntity),
    AppDataSource.getRepository(UserTeamEntity)
  );

  const service = new CreateTeamService(teamRepository);

  return new CreateTeamController(service);
}

export async function buildGetUserTeamsController() {
  const teamsRepository = new TypeOrmTeamRepository(
    AppDataSource.getRepository(TeamEntity),
    AppDataSource.getRepository(UserTeamEntity)
  );

  const service = new GetUserTeamsService(teamsRepository);

  return new GetUserTeamsController(service);
}

export async function buildGetAllUsersController() {
  const userRepository = new TypeOrmUserRepository(
    AppDataSource.getRepository(UserEntity)
  );

  const service = new GetAllUsersService(userRepository);

  return new GetAllUsersController(service);
}

export async function buildUpdateTeamController() {
  const teamRepo = new TypeOrmTeamRepository(
    AppDataSource.getRepository(TeamEntity),
    AppDataSource.getRepository(UserTeamEntity)
  );

  const userRepo = new TypeOrmUserRepository(
    AppDataSource.getRepository(UserEntity)
  );

  const service = new UpdateTeamService(teamRepo, userRepo);

  return new UpdateTeamController(service);
}

export async function buildGetTeamUsersController() {
  const teamRepo = new TypeOrmTeamRepository(
    AppDataSource.getRepository(TeamEntity),
    AppDataSource.getRepository(UserTeamEntity)
  );

  const userRepo = new TypeOrmUserRepository(
    AppDataSource.getRepository(UserEntity)
  );

  const service = new GetTeamUsersService(teamRepo, userRepo);

  return new GetTeamUsersController(service);
}

export async function buildLeaveTeamController(){
  const repo = new TypeOrmTeamRepository(
    AppDataSource.getRepository(TeamEntity),
    AppDataSource.getRepository(UserTeamEntity)
  );

  const service = new LeaveTeamService(repo);

  return new LeaveTeamController(service);
}