require("dotenv").config();
const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
   console.log("Socket connected");
   
  // add new user
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected users", activeUsers);
     // send all active users to new user
    io.emit("get-users", activeUsers);
  });


  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected!", activeUsers);
    io.emit("get-users", activeUsers);
  });


  socket.on("logout-disconnect", (userId) => {
    activeUsers = activeUsers.filter((user) => user.userId !== userId);
    console.log("User disconnected!", activeUsers);
    io.emit("get-users", activeUsers);
  });

   //send message 
   socket.on("send-message",(data)=>{
    const {recieverId} = data;
    const user = activeUsers.find((user)=> user.userId === recieverId);
    console.log("Sending from socket to : ", recieverId);
    console.log("Data ", data);
    if(user){
        io.to(user.socketId).emit("recieve-message", data)
    }
  })
});
