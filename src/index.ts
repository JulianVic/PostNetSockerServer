import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const api2 = process.env.API2_URL!;
const client = process.env.CLIENT_URL!;

app.use(express.json());
app.use(cors({
  origin: [api2],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const server = app.listen(PORT, () => {
    console.log(`WS Server is running on port ${PORT}`);
    }
);

const io = new Server(server, {
  cors: {
    origin: client,
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  console.log('User connected')
  console.log(socket.id)

  socket.on('post', post => {
    console.log('New post received')
    console.log(post)

    io.emit('postToClient', post)


  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})