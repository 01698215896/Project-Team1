import { Component , OnInit} from '@angular/core';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-musicplay',
  templateUrl: './musicplay.component.html',
  styleUrls: ['./musicplay.component.css']
})
export class MusicplayComponent implements OnInit {
  name: string='';
  casy: string='';
  title: string='';
  url: string='';
  img: string='';

  constructor(private service: ListMucsicService){}
  ngOnInit(): void {
    const listmedia = sessionStorage.getItem('musicplay');
    if (listmedia) {
      const list = JSON.parse(listmedia);
      this.name = list.name;
      this.casy = list.casy;
      this.title = list.title;
      this.img = list.img;
      this.url = list.url;
      return list;
      
    }
  }

  
  

}
