/*eslint-disable*/
import fp from 'fastify-plugin';
import Status from 'http-status';

const time =
  process.env.NODE_ENV === 'development'
    ? process.env.JWT_TOKEN_EXPIRE_TIME
    : '2s';

const TOKEN_EXPIRED_ERROR = 'TokenExpiredError';
const FAIL_AUTH = 'Failed to authenticate token is expired.';

export default ({ response: { Fail }, jwt }: any) => {

  return (req: any, res: any, next: any) => {

    console.log('req req req', req?.headers);

    console.log('req req req', res);
    res.code(Status.OK).send(Fail('OK'));

 /*   const extractToken =
      opts.request?.headers?.authorization?.startsWith('Bearer ');

    if (extractToken) {
      const token = opts.request?.headers?.authorization?.split(' ')?.[1];

      try {
        jwt.verify({ maxAge: time })(token);
      } catch (e: any) {
        if (e.name === TOKEN_EXPIRED_ERROR) {
          return res.status(Status.UNAUTHORIZED).json(
            Fail({
              success: false,
              expireTime: true,
              message: FAIL_AUTH,
            }),
          );
        }

        return res.status(Status.BAD_REQUEST).json(
          Fail({
            success: false,
            message: Status[Status.BAD_REQUEST],
          }),
        );
      }

      return next();
    }

    return res.status(Status.UNAUTHORIZED).json(
      Fail({
        success: false,
        message: 'No token provided.',
      }),
    );*/
  }
}
