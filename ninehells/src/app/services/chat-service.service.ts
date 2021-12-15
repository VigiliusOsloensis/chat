import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import ChatMessage from '../types/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket = io('http://localhost:3000')

  constructor() { }

  publishMessage(msg: ChatMessage) {
    const roomName = "message";
    this.socket.emit(roomName, msg.message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: string) =>{
      this.message$.next(message);
    });    
    return this.message$.asObservable();
  };

}
