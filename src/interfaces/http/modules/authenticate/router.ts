/* eslint-disable*/
import bcrypt from 'bcrypt';
import Status from 'http-status';
import { Router, Request, Response } from 'express';
import IUser from 'core/IUser';

export default ({ auth, verify, jwt, postUseCase, logger, response: { Success, Fail } }: any) => {

  console.log('auth auth auth', auth);

  async function handler(request, reply) {

    /*const { body } = request;

    const { password, email } = <IUser>body;

    if (!email || !password)
      return reply.code(Status.UNPROCESSABLE_ENTITY).send(Fail('Empty value.'));

    try {
      const data: any = await postUseCase.authenticate({
        email: body.email,
      });

      const { email, password, id } = <IUser>data || {};

      if (!email)
        return reply.code(Status.NOT_FOUND).send(Fail(`User not found (email: ${body.email}).`));

      const match: boolean = await bcrypt.compare(body.password, password as string);

      if (match) {
        const payload = <IUser>{ email, password, id };

        const options = {
          subject: email,
          audience: [],
          expiresIn: 60 * 60,
        };

        // if user is found and password is right, create a token
        const token: string = jwt.signin(options)(payload);

        logger.info({ token });
        return reply.code(Status.OK).send(
          Success({
            success: true,
            token: token,
          }),
        );
      }

      return reply.status(Status.UNAUTHORIZED).json(Fail('Wrong username and password combination.'));
    } catch (error: any) {
      logger.error(error);
      return reply.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
    }*/
  }

  return {
    method: 'POST',
    url: '/auth/authenticate',
    handler,
    schema: {},
  };
};
