import { regex } from 'pactum-matchers'

import { getTestCase, registerHooks } from '../util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('POST /auth/sign-in', () => {
      test('should respond a token with secured cookie given credentials', async () => {
        // Given
        const username = 'admin'
        const password = 'MyBigSecret'
        const testCase = getTestCase()
        await testCase
          .step('Create a token')
          .spec()
          // When
          .post('/auth/sign-in')
          .withBody({ password, username })
          // Then
          .expectStatus(200)
          .expectJsonMatch({
            token: regex(/^([\w=]+).([\w=]+).([\w+/=-]*)$/),
          })
          .toss()
      })
    })
  })
})
