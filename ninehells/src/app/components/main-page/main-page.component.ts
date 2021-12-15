import { Component, Input, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { FormsModule } from '@angular/forms';
import ChatMessage from 'src/app/types/chat-message';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input() pageName: string = "avernus";
  currentChatMessage: string = "";
  messageList: string[] = [];

  constructor(private chatService: ChatServiceService) { }

  ngOnInit() {
    console.log("ngOnInit");
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
      console.log("received message");
      console.log(this.messageList);
    })
  }

  sendMsg() {
    console.log("sendMsg clicked");
    let msg: ChatMessage = {
      room: this.pageName,
      user: "user",
      message: this.currentChatMessage,
    }
    this.chatService.publishMessage(msg);
  }

}
