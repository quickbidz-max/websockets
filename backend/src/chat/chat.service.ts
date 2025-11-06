import { Injectable } from '@nestjs/common';

interface User {
  id: string;
  username: string;
}

@Injectable()
export class ChatService {
  private users: Map<string, User> = new Map();

  addUser(clientId: string, username: string): void {
    this.users.set(clientId, { id: clientId, username });
  }

  removeUser(clientId: string): void {
    this.users.delete(clientId);
  }

  getUser(clientId: string): User | undefined {
    return this.users.get(clientId);
  }

  getOnlineCount(): number {
    return this.users.size;
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }
}
