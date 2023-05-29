import { Component, OnInit } from '@angular/core';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-roomchat',
  templateUrl: './roomchat.component.html',
  styleUrls: ['./roomchat.component.css']
})
export class RoomchatComponent implements OnInit {
  message: string = '';
  output: string[] = [];

  constructor(private service: ListMucsicService) {}

  ngOnInit(): void {
    this.service.onmsg().subscribe((data) => {
      this.output.push(data);
    });
  }

  sendmsg() {
    this.service.emitmsg(this.message);
    this.message = ''; // Xóa nội dung tin nhắn sau khi gửi
  }
}
