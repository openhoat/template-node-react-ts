import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { FastifyPluginAsync } from 'fastify'

const aboutRouter: FastifyPluginAsync = async (fastify) => {
  const { iocContainer } = fastify
  const { config } = iocContainer
  const { baseDir } = config
  const { version } = JSON.parse(
    await readFile(join(baseDir, 'package.json'), 'utf8'),
  ) as { version: string }
  fastify.get('/', () => ({ version }))
}

export { aboutRouter }
