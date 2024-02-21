import { join } from 'node:path'

import type { Config as JestConfig } from 'jest'

import baseDir from '../../backend/main/base-dir'
import globalJestConfig from '../../jest.config'

const jestConfig: JestConfig = {
  ...globalJestConfig,
  collectCoverageFrom: ['src/frontend/main/**/!(*.d)*.ts(x)?'],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'frontend', 'all'),
  testMatch: ['<rootDir>/src/frontend/test/**/*.test.ts(x)?'],
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
}

export default jestConfig
