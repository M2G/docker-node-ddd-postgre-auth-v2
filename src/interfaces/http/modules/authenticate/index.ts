import container from 'container';
import router from './router';
import instance from './instance';

export default () => {
  const {
    logger,
    jwt,
    config,
    verify,
    response: { Success, Fail },
  } = container.cradle;
  const app = instance();

  return {
    app,
    router: router({
      verify,
      config,
      jwt,
      logger,
      response: { Fail, Success },
      ...app,
    }),
  };
};
