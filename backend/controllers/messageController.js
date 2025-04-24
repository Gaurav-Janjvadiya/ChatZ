import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  const { content, receiver } = req.body;
  console.log(content, receiver);
  try {
    const otherUser = await User.findOne({ name: receiver });
    console.log(otherUser);
    const sender = await User.find({ name: req.name });
    const chat = await Chat.find({ users: [sender[0]._id, receiver[1]._id] });
    const message = await Message.create({
      sender: otherUser._id,
      chat: chat._id,
      content,
    });
    const UpdatedChat = await Chat.updateOne(chat._id, {
      lastMessage: message._id,
    });
    console.log(UpdatedChat);
    res.json({ message });
  } catch (error) {
    console.log("Error during sending msg", error);
    res.json({ message: "Error during sending msg", error });
  }
};

export const fetchMessages = async (req, res) => {
  const { name: otherUserName } = req.params;
  const currentUserName = req.name;
  console.log(otherUserName, currentUserName);

  try {
    const users = await User.find({
      name: { $in: [otherUserName, currentUserName] },
    });
    const chat = await Chat.find({ users: [users[0]._id, users[1]._id] });
    const messages = await Message.find({ chat: chat._id }).populate({
      path: "sender",
      select: "name",
    });
    res.json({ messages });
  } catch (error) {
    console.log("Error during fetching msgs", error);
    res.json({ message: "Error during fetching msgs", error });
  }
};
