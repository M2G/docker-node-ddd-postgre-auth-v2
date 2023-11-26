import Fastify from 'fastify'
export default ({
  config,

  //router,
  logger,
  //auth,
}: {
  config: any;
  router: any;
  logger: any;
  auth: any;
}) => {

  console.log('config config config config', config);

  const fastify = Fastify({
    logger: true
  });

  //app.disable('x-powered-by');
  //app.use(auth.initialize());
  //app.use(router);

  return {
    app: fastify,
    start: async () =>
      new Promise(async () => {
        try {
          await fastify.listen({ port: config.port })

          const address: any = fastify.server.address();
          logger.info(`API - Port ${address?.port}`);
        } catch (err) {
          fastify.log.error(err);
          process.exit(1)
        }

        console.log('Promise Promise Promise Promise');
      }),
  };
};
