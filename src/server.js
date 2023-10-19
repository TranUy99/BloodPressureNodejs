const express = require ("express");
const bodyParser = require  ("body-parser");
const configViewEngine = require  ("./config/view_engnine");
const auth = require  ('./route/authRoute');
const connectDB  = require  ('./config/connectDB');
const bloodPressureRouter = require  ("./route/bloodPressureRoute");
const doctorRouter = require  ("./route/doctorRoute");
const scheduleRouter = require  ("./route/scheduleRoute");
const bookingRouter = require  ("./route/bookingRoute");
const diseaseRouter = require("./route/disease");
const chatRouter = require("./route/chatRouter");
const messageRouter = require("./route/messageRoute")
require('dotenv').config();
const messageService = require('../src/services/messageService');
let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app);

auth(app);
bloodPressureRouter(app);
doctorRouter(app);
scheduleRouter(app);
bookingRouter(app);
diseaseRouter(app);
chatRouter(app);
messageRouter(app);
connectDB();


let port = process.env.PORT || 8000;
//Port === undefined => port = 6969

const server = app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:8000",
      // credentials: true,
    },
  });
  
  io.on('connection', (socket) => {
    
    console.log('Connected to socket.io');
  
    socket.on('joinChat', async (chatId) => {
      console.log('User joined chat:', chatId);
      try {
        const chatHistory = await messageService.getMessagesByChat(chatId);
        console.log('chatHistory:', chatHistory);
        socket.emit('chatHistory', chatHistory);
      } catch (error) {
        console.error('Error while fetching chat history:', error);
      }
    });

    socket.on('message', async (msg) => {
      console.log('Received message:', msg);
        await messageService.sendMessage(msg.chatId, msg.content, msg.senderType);
        const result = await messageService.getMessagesByChat(msg.chatId);
        
        await socket.emit('messageResult', result);
        
    });
    
});

