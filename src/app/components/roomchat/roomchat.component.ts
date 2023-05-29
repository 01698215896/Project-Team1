import { Component, OnInit } from '@angular/core';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-roomchat',
  templateUrl: './roomchat.component.html',
  styleUrls: ['./roomchat.component.css']
})
export class RoomchatComponent implements OnInit {
  message: string = '';
  img: string = '';
  img1: string = '';
  name: string = '';
  output: string[] = [];
  listMucsic: Array<ListMucsic> = new Array<ListMucsic>();

  activeTab = 0;
  setActiveTab(index: number) {
    this.activeTab = index;
  }

  constructor(private service: ListMucsicService) {}

  ngOnInit(): void {
    this.service.onmsg().subscribe((data) => {
      this.output.push(data);
    });
    
    const id = localStorage.getItem('idUser');
    this.service.getData1(id).subscribe((data) => {
      this.img1 = data.img
      this.name = data.id
    });
  }

  sendmsg() {
    this.service.emitmsg(this.message);
    this.message = ''; // Xóa nội dung tin nhắn sau khi gửi
  }
  clickimg(img1: string) {
    this.img = img1;
    console.log(this.img);
  }
}
