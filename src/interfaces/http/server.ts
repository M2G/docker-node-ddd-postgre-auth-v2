import Fastify from 'fastify'
export default ({
  //config,
  //router,
  //logger,
  //auth,
}: {
  config: any;
  router: any;
  logger: any;
  auth: any;
}) => {
  const fastify = Fastify({
    logger: true
  });

  //app.disable('x-powered-by');
  //app.use(auth.initialize());
  //app.use(router);

  return {
    app: fastify,
    start: async () =>
      new Promise(() => {
        console.log('Promise Promise Promise Promise');
       /* const http: any = app.listen(config.port, () => {
          const { port } = http.address();
          logger.info(`API - Port ${port}`);
        });*/
      }),
  };
};
