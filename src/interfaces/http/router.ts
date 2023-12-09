import cors from '@fastify/cors';
import bodyParser from 'body-parser';

import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';
// controller
import index from './modules';
import authenticate from './modules/authenticate';
import register from './modules/register';
import users from './modules/users';
import forgotPassword from './modules/forgot_password';
import resetPassword from './modules/reset_password';
import { fastify } from 'interfaces/http/server';

// @TODO create variables for routes
const ROUTES = {
  AUTHENTICATE: '/auth/authenticate',
  FORGOT_PASSWORD: '/auth/forgot-password',
  INDEX: '/',
  REGISTER: '/auth/register',
  RESET_PASSWORD: '/auth/reset-password',
  USERS: '/auth/users',
};

export default ({
  config,
  logger,
  verify,
}: //database,
any) => {
  if (config.env !== 'test') {
    /*
    fastify.register(() => {
     httpLogger(logger);
   });
   */
  }

  void fastify.register(cors, {
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://localhost:3002', 'http://localhost:3003'],
  });

  /* void fastify.register(function (app, _, done) {
   app.route(index());
   app.route(register().router);
   app.route(authenticate().router);
   app.route(forgotPassword().router);
   app.route(resetPassword().router);
   done();
 });
 */
  const router = {
    [ROUTES.AUTHENTICATE]: authenticate().router,
    [ROUTES.FORGOT_PASSWORD]: forgotPassword().router,
    [ROUTES.INDEX]: index(),
    [ROUTES.REGISTER]: register().router,
    [ROUTES.RESET_PASSWORD]: resetPassword().router,
    [ROUTES.USERS]: users().router,
  };

  /*
  const router = Router();

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }
  router
    .use(
      cors({
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: ['http://localhost:3002', 'http://localhost:3003'],
      }),
    )
    .use(bodyParser.json());

  router.use(ROUTES.INDEX, index());
  router.use(ROUTES.REGISTER, register().router);
  router.use(ROUTES.AUTHENTICATE, authenticate().router);
  router.use(ROUTES.FORGOT_PASSWORD, forgotPassword().router);
  router.use(ROUTES.RESET_PASSWORD, resetPassword().router);
  router.use(verify);
  router.use(ROUTES.USERS, users().router);
  // users?search=EMAIL/FIST_NAME/LAST_NAME
  router.use(() => ({
    ...errorHandler,
    ...[logger, config],
  }));

  return router;*/

  /* fastify.register(() => ({
    ...errorHandler,
    ...[logger, config],
  }));
*/
  return router;
};
