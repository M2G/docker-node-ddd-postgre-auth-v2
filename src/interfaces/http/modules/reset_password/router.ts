/* eslint-disable*/
import Status from 'http-status';
import { encryptPassword } from 'infra/encryption';
// import { smtpTransport, template } from 'nodemailer';

export default ({
                  postUseCase,
                  logger,
                  response: { Success, Fail },
                  jwt,
                }: any) => {
  async function handler(request, reply) {
    const { body = {} } = request || {};
    const { new_password, verify_password, token } = <any>body;

    if (!token || !new_password || !verify_password || new_password !== verify_password) {
      return reply.code(Status.UNPROCESSABLE_ENTITY).send(Fail('Invalid parameters in request.'));
    }

    try {

      jwt.verify({ maxAge: process.env.JWT_TOKEN_EXPIRE_TIME })(token);

      const hashPassword = encryptPassword(verify_password);

      console.log('{ password: hashPassword, token }', { password: hashPassword, token })

     const user = await postUseCase.resetPassword({ password: hashPassword, token });

      if (!user) return reply.code(Status.NOT_FOUND).send(Fail('Not found user'));

      console.log('user user user user user', user)

      //@TODO conflict with tests
      /*
      const htmlToSend = template({
        name: 'test'
      });

      const data = {
        to: user.email,
        from: "sendersemail@example.com",
        subject: 'Password Reset Confirmation',
        html: htmlToSend,
      };

      smtpTransport.sendMail(data, function(error: any, response: any) {
        console.log('::::::::::::::', { error, response })
        if (error) return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
        console.log("Successfully sent email.");
      });
      */

      logger.info({ ...user });
      return reply.code(Status.OK).send(Success({ success: true }));

    } catch (error: any) {
      logger.error(error);
      return reply.code(Status.INTERNAL_SERVER_ERROR).send(Fail(error.message));
    }
}

  return {
    method: 'POST',
    url: '/auth/reset-password',
    handler,
    schema: {},
  };
};
