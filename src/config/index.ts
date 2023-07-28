import development from './development.js'
import stage from './stage.js'
import production from './production.js'
import { ENV } from './common.js'

const config: any = {
  development,
  stage,
  production
}

export default config[ENV]
