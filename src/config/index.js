import config from './config';

let configEnv;

const BUILD_ENV = process.env.BUILD_ENV;
if (BUILD_ENV === 'test') {
  configEnv = config['test'];
} else if (BUILD_ENV === 'dev') {
  configEnv = config['dev'];
} else {
  configEnv = config['prod'];
}

if (process.env.NODE_ENV === 'development') {
  configEnv = config['dev'];
}

export default {
  serverUrl: configEnv.serverUrl,
};
