import { UserDbInterface } from "../../repositories/userDbRepository";

export const getUsers = async(
  dbRepositoryUser: ReturnType<UserDbInterface>
) => await dbRepositoryUser.getAllUsers()

export const blockAndUnblockUser = async(
  email: string,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  const findedUser = await dbRepositoryUser.getUserByEmail(email)
  await dbRepositoryUser.updateDb({ email }, { isblocked: !findedUser?.isblocked })
}

export const userGraph = async(
  dbRepositoryUser: ReturnType<UserDbInterface>
) => await dbRepositoryUser.getUserGraph()