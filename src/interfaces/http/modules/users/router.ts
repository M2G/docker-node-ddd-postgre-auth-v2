import type IUser from 'core/IUser';

import Status from 'http-status';

export default ({
  auth,
  deleteUseCase,
  getOneUseCase,
  getUseCase,
  logger,
  putUseCase,
  response: { Fail, Success },
  verify,
}: any) => {
  /* const router = Router();

  router.use((req: Request, res: Response, next: NextFunction) =>
    auth.authenticate(req, res, next),
  ); */

  // get all
  async function handlerGetAll(request, reply) {
    const { query } = request;
    const { filters, page, pageSize } = query;

    try {
      const data = await getUseCase.all(
        filters ? { filters } : pageSize && page ? { page, pageSize } : {},
      );

      reply.status(Status.OK).json(Success(data));
    } catch (error) {
      logger.error(error);
      reply.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  }

  const routerGetAll = {
    beforeHandler: [verify, auth.authenticate],
    handler: handlerGetAll,
    method: 'GET',
    schema: {},
    url: '/auth/users',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  // get by id
  async function handlerGetById(request, reply) {
    const { params } = request;
    const { id } = params;

    if (!id) {
      return reply
        .status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid id parameters in request.'));
    }

    try {
      const data = await getOneUseCase.getOne({ id });

      console.log('data data data data', data);

      logger.debug(data);
      return reply.code(Status.OK).send(Success(data));
    } catch (error: any) {
      logger.error(error);
      return reply.code(Status.BAD_REQUEST).send(Fail(error.message));
    }
  }

  const routerGetById = {
    beforeHandler: [verify, auth.authenticate],
    handler: handlerGetById,
    method: 'GET',
    schema: {},
    url: '/auth/users/:id',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  // router.post('/', async (req: Request, res: Response) => {});

  // get by id
  async function handlerUpdateById(request, reply) {
    const { body = {}, params } = request;
    const { id } = params;

    const values = body && Object.entries(body).length === 0;

    console.log('values values values values values values', values);

    if (!id || values)
      return reply.code(Status.UNPROCESSABLE_ENTITY).send(Fail('Invalid parameters in request.'));

    try {
      const updateValue: IUser = {
        ...body,
        modified_at: Date.now(),
      };

      const data = await putUseCase.update({ id, ...updateValue });
      logger.debug(data);
      if (!data) return reply.code(Status.NOT_FOUND).send(Fail());
      return reply.code(Status.OK).send(Success());
    } catch (error: any) {
      logger.error(error);
      return reply.code(Status.BAD_REQUEST).send(Fail(error.message));
    }
  }

  const routerUpdateById = {
    beforeHandler: [verify, auth.authenticate],
    handler: handlerUpdateById,
    method: 'PUT',
    schema: {},
    url: '/auth/users/:id',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  // delete by id
  async function handlerDeleteById(request, reply) {
    const { params } = request;
    const { id } = params;

    if (!id) {
      return reply
        .code(Status.UNPROCESSABLE_ENTITY)
        .send(Fail('Invalid id parameters in request.'));
    }

    try {
      const data = await deleteUseCase.remove({ id });
      logger.debug(data);
      if (!data) return reply.code(Status.NOT_FOUND).send(Fail());
      return reply.code(Status.OK).send(Success());
    } catch (error: any) {
      logger.error(error);
      return reply.code(Status.INTERNAL_SERVER_ERROR).send(Fail(error.message));
    }
  }

  const routerDeleteById = {
    beforeHandler: [verify, auth.authenticate],
    handler: handlerDeleteById,
    method: 'DELETE',
    schema: {},
    url: '/auth/users/:id',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  return [routerGetAll, routerGetById, routerDeleteById, routerUpdateById];
};
