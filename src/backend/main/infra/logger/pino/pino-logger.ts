import pino from 'pino'

import type { Config } from '../../../types/application/config'
import type { Logger } from '../../../types/util/logger'

class PinoLogger implements Logger {
  readonly #pinoLogger: pino.Logger

  get pinoLogger(): pino.Logger {
    return this.#pinoLogger
  }

  constructor(config: Config) {
    this.#pinoLogger = pino({
      level: config.logLevel,
      transport: {
        target: 'pino-pretty',
      },
    })
  }

  debug(message: string): void {
    this.#pinoLogger.debug(message)
  }

  error(message: string): void {
    this.#pinoLogger.error(message)
  }

  info(message: string): void {
    this.#pinoLogger.info(message)
  }

  trace(message: string): void {
    this.#pinoLogger.trace(message)
  }

  warn(message: string): void {
    this.#pinoLogger.warn(message)
  }
}

export { PinoLogger }
