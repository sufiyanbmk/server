import { UserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };

  const addUser = async (user: {
    userName: string;
    email: string;
    phone?: number;
    password?: string;
  }) => {
    return await User.create(user);
  };

  const getAllUsers = async () => await User.find();

  const getByEmail = async (email: string) =>
    await User.findOne({ email: email });

  const updateOne = async (filter: object, update: object) =>
    await User.updateOne(filter, update);

  const getUsercount = async () => await User.countDocuments();

  const getCountof = async (filter: object) =>
    await User.countDocuments(filter);

  const getUserGraph = async () => {
    const counts = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    return counts;
  };

  const updateImg = async (userId: string, profileImg: string) => {
    const oldImg = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { profileImage: profileImg } }
    ).select("profileImage");
    return oldImg;
  };

  const getById = async(userId: string) => await User.findById(userId);

  const getByField = async(filter:object) => await User.findOne(filter)

  const findByOneAndUpdate = async(userId:string,filter:object) => await User.findByIdAndUpdate(userId,filter)

  return {
    getUserByEmail,
    addUser,
    getAllUsers,
    getByEmail,
    updateOne,
    getUsercount,
    getCountof,
    getUserGraph,
    updateImg,
    getById,
    getByField,
    findByOneAndUpdate
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
