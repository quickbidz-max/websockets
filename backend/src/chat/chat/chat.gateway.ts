import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';

interface MessagePayload {
  username: string;
  message: string;
}

interface TypingPayload {
  username: string;
  isTyping: boolean;
}

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const user = this.chatService.getUser(client.id);
    if (user) {
      this.chatService.removeUser(client.id);
      this.server.emit('userLeft', {
        username: user.username,
        onlineCount: this.chatService.getOnlineCount(),
      });
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { username: string },
  ) {
    const { username } = payload;
    this.chatService.addUser(client.id, username);

    client.emit('joined', {
      username,
      onlineCount: this.chatService.getOnlineCount(),
    });

    client.broadcast.emit('userJoined', {
      username,
      onlineCount: this.chatService.getOnlineCount(),
    });
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessagePayload,
  ) {
    const user = this.chatService.getUser(client.id);
    if (user) {
      this.server.emit('message', {
        username: user.username,
        message: payload.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    const user = this.chatService.getUser(client.id);
    if (user) {
      client.broadcast.emit('typing', {
        username: user.username,
        isTyping: payload.isTyping,
      });
    }
  }
}
