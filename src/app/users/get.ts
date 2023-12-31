const KEY = 'LIST_USER';
const TTL = 1 * 60;

/**
 * function for get users.
 */
export default ({ usersRepository, redis }) => {
  const all = async ({ ...arg }: ArrayLike<unknown> | Record<string, unknown>) => {
    try {
      if (arg && Object.values(arg).filter(Boolean).length) {
        return usersRepository.getAll({
          attributes: {},
          ...arg,
        });
      }

      const cachingUserList = await redis.get(KEY);

      if (cachingUserList) return cachingUserList;

      const userList = usersRepository.getAll({
        attributes: {},
        ...arg,
      });

      redis.set(KEY, JSON.stringify(userList), TTL);

      return userList;
    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    all,
  };
};
