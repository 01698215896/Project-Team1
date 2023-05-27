import { Component, OnInit } from '@angular/core';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-listalbum',
  templateUrl: './listalbum.component.html',
  styleUrls: ['./listalbum.component.css']
})
export class ListalbumComponent implements OnInit {
  listss : any;
  name: string ='';
  url: string ='';
  img: string ='';
  title: string ='';
  list : Array<ListMucsic> = []
  constructor(private service: ListMucsicService){}

  ngOnInit(): void {
    const data = sessionStorage.getItem('theloai');
    if(data){
      this.service.fetchapi(data).subscribe(data =>{
        this.list = data
      })
    }
  }
  play(id: number, name:string, img:string, title:string, url:string){
      this.name = name;
      this.url = url;
      this.img = img;
      this.title = title;
      console.log(this.img, this.name, this.url);
  }

}
