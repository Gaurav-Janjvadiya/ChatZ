import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const createChat = async (req, res) => {
  const { name: otherUserName } = req.body;
  const currentUserName = req.name;

  try {
    const users = await User.find({
      name: { $in: [otherUserName, currentUserName] },
    });
    await Chat.create({ users: [users[0]._id, users[1]._id] });
    res.json({ message: "Chat created successfully!" });
  } catch (error) {
    console.log("Error during Chat creation", error);
    res.json({ message: "Error during chat creation", Error: error });
  }
};

export const fetchChats = async (req, res) => {
  const currentUserName = req.name;
  try {
    const currentUser = await User.findOne({ name: currentUserName });
    const chats = await Chat.find({
      users: { $in: [currentUser._id] },
    })
      .populate({
        path: "users",
        select: "name",
      })
      .populate("lastMessage");
    res.json({ chats });
  } catch (error) {
    console.log("Error during Chat fetching creation", error);
    res.json({ message: "Error during chat fetching" });
  }
};
