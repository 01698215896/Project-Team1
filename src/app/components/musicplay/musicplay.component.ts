import { Component , OnInit} from '@angular/core';

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

  ngOnInit(): void {
   
    const listmedia = sessionStorage.getItem('musicplay');
    if (listmedia) {
      const list = JSON.parse(listmedia);
      console.log(list)
      this.name = list.name;
      this.casy = list.casy;
      this.title = list.title;
      this.img = list.img;
      this.url = list.url;
      console.log(this.url)
      return list;
      
    }
  }
  

}