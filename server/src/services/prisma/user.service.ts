import { User } from "@prisma/client";
import { UserDTO } from "../../dtos/user.dto";
import { UserAlreadyExists, UserNotFoundError } from "../../errors/user.error";
import { prisma } from "../../prisma";
import { UserRepository } from "../../repositories/users.repository";

const TOTAL_ALLOWED_USERS = 10;

export class UserRepositoryImpl implements UserRepository {
  async create({ username, email, password, picture }: UserDTO): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    const users = await prisma.user.findMany();

    if (users.length >= TOTAL_ALLOWED_USERS)
      throw new Error("Can't create more users!");

    if (userExists != null) throw new UserAlreadyExists(email);

    const userCreated = await prisma.user.create({
      data: { username, email, password, picture },
    });
    return userCreated;
  }

  async update(id: string, newData: UserDTO): Promise<User> {
    const userExists = await prisma.user.findUnique({ where: { id: id } });

    if (userExists == null) throw new UserNotFoundError(id);

    const userUpdated = await prisma.user.update({
      data: newData,
      where: { id: id },
    });
    return userUpdated;
  }

  async delete(id: string): Promise<void> {
    const userExists = await prisma.user.findUnique({ where: { id: id } });

    if (userExists == null) throw new UserNotFoundError(id);

    await prisma.user.delete({ where: { id: id } });
  }

  async getById(id: string): Promise<User> {
    const userRetrieved = await prisma.user.findUnique({ where: { id: id } });

    if (userRetrieved == null) throw new UserNotFoundError(id);

    return userRetrieved;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user === null) throw new UserNotFoundError(email);

    return user;
  }

  async getAll(): Promise<User[]> {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
}
