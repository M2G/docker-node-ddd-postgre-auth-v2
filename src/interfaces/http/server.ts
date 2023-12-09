import Fastify from 'fastify';

export const fastify = Fastify({
  logger: true,
});

interface IApp {
  config: any;
  router: any;
  logger: any;
  auth: any;
}

export default ({
  config,
  router,
  logger,
  auth,
}: IApp) => {
  //app.disable('x-powered-by');
  //app.use(auth.initialize());
  //app.use(router);

  void fastify.register(auth.initialize());
  void fastify.register(function (app, _, done) {
    Object.values(router).forEach((route: any) => {
      app.route(route);
    });
    done();
  });

  return {
    app: fastify,
    start: async () =>
      new Promise(async () => {
        try {
          await fastify.listen(config.port, '0.0.0.0');

          const address: any = fastify.server.address();
          logger.info(`API - Port ${address?.port}`);
        } catch (err) {
          fastify.log.error(err);
          process.exit(1);
        }

        console.log('Promise Promise Promise Promise');
      }),
  };
};
