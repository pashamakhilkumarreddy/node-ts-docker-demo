import development from './development';
import stage from './stage';
import production from './production';
import { ENV } from './common';

const config: any = {
  development,
  stage,
  production,
};

export default config[ENV];
