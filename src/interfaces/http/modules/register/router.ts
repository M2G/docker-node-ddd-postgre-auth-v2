/* eslint-disable*/
import Status from 'http-status';
import IUser from 'core/IUser';
import { encryptPassword } from 'infra/encryption';

// @TODO rewrite this module, replace express with fastify
export default ({ postUseCase, jwt, logger, response: { Success, Fail } }: any) => {
  async function handler(request, reply) {
    const { body = {} } = request;
    const { email, password } = <IUser>body;

    if (!email || !password)
      return reply.code(Status.UNPROCESSABLE_ENTITY).send(Fail('Invalid parameters in request.'));

    const hasPassword = encryptPassword(password);

    try {
      const data: any = await postUseCase.register({
        email,
        password: hasPassword,
        created_at: Date.now(),
        deleted_at: 0,
        last_connected_at: null,
      });

      return reply.code(Status.OK).send(Success({ ...data }));
    } catch (error) {
      logger.error(error);
      return reply.code(Status.INTERNAL_SERVER_ERROR).send(Fail(error.message));
    }
  }

  return {
    method: 'POST',
    url: '/auth/register',
    handler,
    schema: {},
  };
};
