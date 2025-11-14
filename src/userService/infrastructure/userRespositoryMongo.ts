import { UserModel } from "./models/userModels";
import { IRegisterRepository } from "../domain/ports/RegisterRepositoryPorts";
import { AuthUserRepository } from "../domain/ports/AuthUserRepository";
import { UniqueUserName } from "../domain/ports/UniqueUserName";

import { User } from "../domain/entities/UserTypes";
import { UpdateUSerRepository } from "../domain/ports/UpdateUserRepository";
import { FindAndDeleteRepo } from "../domain/ports/FindAndDeleteRepo";
import { Types } from "mongoose";

export class UserMongoRepository implements IRegisterRepository {
  async createUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }
}

export class AuthMongoRepostitory implements AuthUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user_data = UserModel.findOne({ email });

    if (user_data) {
      return user_data;
    }
    return null;
  }
}

export class UniqueUsernameRepository implements UniqueUserName {
  async findByUserName(userName: string): Promise<User | null> {
    const user = UserModel.findOne({ userName });
    if (user) {
      return user;
    }
    return null;
  }
}

export class UpdateUSerMongo implements UpdateUSerRepository {
  async updateUSer(id: Types.ObjectId, User: Partial<User>): Promise<User | null> {
    const newUser = await UserModel.findByIdAndUpdate(id, User, { new: true });
    if (newUser) {
      return newUser;
    }
    return null;
  }
}

export class findAndDeleteMongo implements FindAndDeleteRepo {

  async findByID(id: Types.ObjectId): Promise<User | null> {
    const result = await UserModel.findById(id).populate(["avatar", "level"]);
    return result;
  }


  async deleteUser(id: Types.ObjectId): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id);
  }
  async findUser(): Promise<User[]> {
    const result = await UserModel.find().populate("avatar");
    return result;
  }
}
