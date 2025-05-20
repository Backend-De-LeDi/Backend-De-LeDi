import { Request, Response } from "express";
import { FindAndDeleteUser } from "../../application/service/FindAndDelete.service";
import { FindAndDeleteRepo } from "../../domain/ports/FindAndDeleteRepo";
import { findAndDeleteMongo } from "../../infrastructure/userRespositoryMongo";

const findAndDeleteUser: FindAndDeleteRepo = new findAndDeleteMongo();
const findAndDelService: FindAndDeleteRepo = new FindAndDeleteUser(findAndDeleteUser);

export const findUser = async (req: Request, res: Response) => {
  try {
    const users = await findAndDelService.findUser();
    console.log(users);
    res.status(200).json({ msg: "the users", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    res.status(400).json({ message: "No user ID found" });
  }
  const result = await findAndDelService.deleteUser(id);

  res.status(200).json({ msg: "user delete successful" });
};

export const findById = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    res.status(400).json({ message: "No user ID found" });
  }
  const result = await findAndDelService.findByID(id);
  if (!result) {
    res.status(302).json({ msg: "user not found   " });
  }
  res.status(200).json({ msg: "user", result });
};
