import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasksTable1713000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "uuid", type: "varchar", isNullable: false },
          { name: "title", type: "varchar", isNullable: false },
          { name: "description", type: "text", isNullable: true },
          { name: "tag", type: "varchar", isNullable: true },
          { name: "priority", type: "varchar", isNullable: true },
          { name: "assignee_uuid", type: "varchar", isNullable: true },
          { name: "status", type: "varchar", isNullable: false, default: "'todo'" },
          { name: "position", type: "integer", isNullable: false, default: 0 },
          { name: "team_uuid", type: "varchar", isNullable: false },
          { name: "created_at", type: "timestamp", isNullable: false, default: "CURRENT_TIMESTAMP" },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks");
  }
}
