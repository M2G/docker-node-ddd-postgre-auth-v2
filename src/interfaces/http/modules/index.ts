import Status from 'http-status';

export default () => {
  const route = {
    method: 'GET',
    url: '/',
    handler: (request: any, reply: { code: (arg0: number) => { (): any; new(): any; send: { (arg0: { hello: string; }): void; new(): any; }; }; }) => {
      reply.code(Status.OK).send({ hello: 'API working' });
    },
    schema: {},
  }

  return route;
};
