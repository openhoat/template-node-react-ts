import { join } from 'node:path'

import type { Config as JestConfig } from 'jest'

import globalJestConfig from '../../jest.config'
import baseDir from '../main/base-dir'

const jestConfig: JestConfig = {
  ...globalJestConfig,
  collectCoverageFrom: ['src/backend/main/**/!(*.d)*.ts'],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'backend', 'all'),
  coverageReporters: ['text', 'json', 'cobertura', 'lcov', 'html'],
  testMatch: ['<rootDir>/src/backend/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': '@swc/jest',
  },
  verbose: false,
}

export default jestConfig
