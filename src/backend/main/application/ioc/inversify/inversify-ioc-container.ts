import { Container } from 'inversify'

import { PinoLogger } from '../../../infra/logger/pino/pino-logger'
import { FastifyHttpServer } from '../../../interfaces/http/fastify/fastify-http-server'
import type { Config } from '../../../types/application/config'
import type { IocContainer } from '../../../types/application/ioc'
import type { HttpServer } from '../../../types/interfaces/http/server'
import type { Logger } from '../../../types/util/logger'
import { recordToString } from '../../../util/helper'
import { IOC_TYPES } from '../ioc-types'

class InversifyIocContainer implements IocContainer {
  readonly #container: Container

  get config(): Config {
    return this.#container.get(IOC_TYPES.Config)
  }

  get httpServer(): HttpServer {
    return this.#container.get(IOC_TYPES.HttpServer)
  }

  get logger(): Logger {
    return this.#container.get(IOC_TYPES.Logger)
  }

  constructor(config: Config) {
    this.#container = new Container()
    const logger = new PinoLogger(config)
    logger.debug(`Loaded config:\n\t${recordToString(config)}`)
    logger.debug('Initializing IoC container…')
    this.#registerConfig(config)
    this.#registerLogger(logger)
    this.#registerHttpServer(logger)
    logger.info('IoC container initialized.')
  }

  #registerConfig(config: Config): void {
    this.#container.bind(IOC_TYPES.Config).toConstantValue(config)
  }

  #registerHttpServer(logger: PinoLogger): void {
    this.#container
      .bind(IOC_TYPES.HttpServer)
      .toConstantValue(new FastifyHttpServer(this, logger.pinoLogger))
  }

  #registerLogger(logger: Logger): void {
    this.#container.bind(IOC_TYPES.Logger).toConstantValue(logger)
  }
}

export { InversifyIocContainer }