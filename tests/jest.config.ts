import type { Config } from '@jest/types'
import tsPreset = require('ts-jest/jest-preset')
// @ts-ignore
import playwrightPreset = require('jest-playwright-preset/jest-preset')

const config: Config.InitialOptions = {
  ...tsPreset,
  ...playwrightPreset,
  rootDir: `${__dirname}/..`
}

export default config
