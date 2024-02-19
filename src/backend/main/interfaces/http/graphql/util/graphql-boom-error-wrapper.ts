import type { Boom } from '@hapi/boom'
import { ErrorWithProps } from 'mercurius'

export const buildGraphqlError = (boomError: Boom): never => {
  throw new ErrorWithProps(
    boomError.message,
    { boomError },
    boomError.output.statusCode,
  )
}
