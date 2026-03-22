import 'reflect-metadata'
import { app } from '@/app'
import { env } from '@/config/env'
import { AppDataSource } from '@/infrastructure/persistence/typeorm/data-source'
import { logger } from '@/config/logger'

async function bootstrap() {
  await AppDataSource.initialize()

  logger.info('Database connected')

  app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port}`);
  })
}

bootstrap()