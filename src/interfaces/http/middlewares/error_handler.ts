export default (
  err: any,
  req: any,
  res: any,
  next: any,
  logger: any,
  config: any,
) => {

  console.log('-------------------------------------------')
 /* logger.error(err);

  const response = {
    type: 'InternalServerError',
    ...config.env === 'development' && {
      message: err.message,
      stack: err.stack,
    },
  };

  res.code(500).send(response);*/
};
