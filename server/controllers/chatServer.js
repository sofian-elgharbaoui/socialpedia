const { Server } = require("socket.io");
const Message = require("../models/Message");

function chatServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000" },
  });

  io.use((socket, next) => {
    //  sessionID
    // socket.sessionID = socket.handshake.auth.sessionID;
    //  userID
    socket.userID = socket.handshake.auth.userID;
    next();
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    // socket.onAny((ev, ...args) => console.log(ev, args));

    let users = [];
    for (const [socketID, { userID }] of io.of("/").sockets) {
      users.push({ userID, socketID });
    }
    io.emit("users", users);

    // let { userID, sessionID } = socket;
    // socket.join(userID);
    // socket.emit("session", { sessionID, userID });

    socket.on(
      "private message",
      async (currentChatContributers, to, messageValue) => {
        const [senderId, receiverId] = currentChatContributers;
        const content = messageValue;

        try {
          const newMessage = await Message.create({
            senderId,
            receiverId,
            content,
          });

          socket.to(to).emit("retreived message", newMessage);
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on("private messages history", async (currentChatContributers) => {
      const [senderId, receiverId] = currentChatContributers;
      try {
        const allPrivateMessages = await Message.find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        }).sort({ createdAt: 1 });

        socket.emit("private messages history", allPrivateMessages);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user has disconnected");
      let users = [];
      for (const [socketID, { userID }] of io.of("/").sockets) {
        users.push({ userID, socketID });
      }
      io.emit("users", users);
    });
  });
}

module.exports = chatServer;
