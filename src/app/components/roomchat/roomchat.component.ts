import { Component, OnInit } from '@angular/core';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-roomchat',
  templateUrl: './roomchat.component.html',
  styleUrls: ['./roomchat.component.css'],
})
export class RoomchatComponent implements OnInit {
  message!: string ;
  img: string = '';
  img1: string = '';
  url: string = '';
  name: string = '';
  showlist: any;  
  output: {
    content: string;
    sender: { name: string; avatar: string };
    isSentByMe: boolean;
  }[] = [];
  listMucsic: Array<ListMucsic> = new Array<ListMucsic>();
  currentUser!: { name: string; avatar: string; };  

  activeTab = 0;
  setActiveTab(index: number) {
    this.activeTab = index;
  }

  constructor(private service: ListMucsicService) {}

  ngOnInit(): void {
    this.service.getApi().subscribe(data => {
      this.showlist = data
    })
    const id = localStorage.getItem('idUser');
    this.service.getData1(id).subscribe((data) => {
      this.img1 = data.img;
      this.name = data.id;
    });

    this.service.onmsg().subscribe((data) => {
      this.output.push({
        content: data.content,
        sender: data.sender,
        isSentByMe: false,
      });
    });
  }

  sendmsg() {
    const id = localStorage.getItem('idUser');
    const text = this.message
    console.log(text)
    this.service.getData1(id).subscribe((data) => {
      this.currentUser = { name: data.id, avatar: data.img }
    
    this.output.push({
      content: text,
      sender: this.currentUser,
      isSentByMe: true,
    });
    this.service.emitmsg({ content: text, sender: this.currentUser });
  });
    this.message = ''; // Xóa nội dung tin nhắn sau khi gửi
  }

  clickimg(img1: string) {
    this.img = img1;
    console.log(this.img);
  }

  play(url: string) {
    this.url = url;
  }
}
