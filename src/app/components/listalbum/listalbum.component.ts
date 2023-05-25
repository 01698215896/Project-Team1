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
    this.service.fetchapi1().subscribe(data =>{
      this.list = data
    })
  }
  play(id: number){
    this.service.fetchapi1a(id).subscribe(data =>{
      this.listss = data;
      this.name = this.listss.name;
      this.url = this.listss.url;
      this.img = this.listss.img;
      this.title = this.listss.title;
    })
  }

}
