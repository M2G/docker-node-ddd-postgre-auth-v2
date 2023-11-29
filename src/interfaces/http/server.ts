import Fastify from 'fastify';

export const fastify = Fastify({
  logger: true,
});

export default ({
  config,
  router,
  logger,
}: //auth,
{
  config: any;
  router: any;
  logger: any;
  auth: any;
}) => {
  //app.disable('x-powered-by');
  //app.use(auth.initialize());
  //app.use(router);

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
