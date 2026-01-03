import express from 'express';
import cors from 'cors';
import { decodeToken } from './middleware/auth.js';
import { userCreate, addFriends } from './controllers/user.js';
import connectDB from './config/db.js';
import { Server } from "socket.io";
import http from "http";
const port = process.env.PORT || 5000;
import initSockets from './sockets/index.js';
const app = express();
app.use(express.json());
app.use(cors());
// import { sendPoliceOtp, verifyPoliceOtp } from "./controllers/station.js";
import stationRoutes from "./routes/station.routes.js";

app.post('/api/user', decodeToken, userCreate);
//routes

// app.use("/api/user", userRoutes);
// app.use("/api/station", stationRoutes);









const server = http.createServer(app);
const io = new Server(server, {
    pingInterval: 5000, // 5 sec
  pingTimeout: 3000 ,  // 3 sec
   cors: {
    origin: process.env.port,
    methods: ["GET", "POST"],
    credentials: true
  }
});

initSockets(io);








try {
await connectDB();
server.listen(port, () => {
	console.log(`server is running on port ${port}`);
});  
} catch (error) {
	console.log(error)
}

// app.post("/api/police/send-otp", sendPoliceOtp);
// app.post("/api/police/login", verifyPoliceOtp);

