import Fastify from 'fastify';

export const fastify = Fastify({
  logger: true,
});

interface IApp {
  auth: { initialize: () => any };
  config: { port: number };
  logger: { info: (message: string) => void };
  router: Record<string, any>;
}

export default ({
  auth,
  config,
  logger,
  router,
}: IApp) => {
  void fastify.register(auth.initialize());
  void fastify.register((app, _, done) => {
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
