/* eslint-disable*/
import Status from 'http-status';
import IUser from 'core/IUser';
// import { template, smtpTransport } from '../../../../nodemailer';

export default ({ postUseCase, logger, response: { Success, Fail } }: any) => {
  async function handler(request, reply) {
    const { body = {} } = request || {};
    const { email } = <IUser>body;

    if (!email) {
      return reply.code(Status.UNPROCESSABLE_ENTITY).send(Fail('Invalid parameters in request.'));
    }

    try {
      const user = await postUseCase.forgotPassword({ email });

      if (!user) return reply.code(Status.NOT_FOUND).send(Fail('Not found user'));

      console.log('---------->', user);

      //@TODO conflict with tests
      /*
    const htmlToSend = template({
      url: 'http://localhost:3002/reset-password?token=' + user.reset_password_token,
      name: 'test'
    });

    const mailOptions = {
      to: user.email,
      from: "sendersemail@example.com",
      subject: 'Password help has arrived!',
      html: htmlToSend,
    }

    smtpTransport.sendMail(mailOptions, function(error: any, response: any) {

      console.log('::::::::::::::', { error, response })

      if (error) return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
      console.log("Successfully sent email.")
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
    url: '/auth/forgot-password',
    handler,
    schema: {},
  };
};
