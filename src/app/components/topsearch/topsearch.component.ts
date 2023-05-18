import { Component , OnInit, Renderer2,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-topsearch',
  templateUrl: './topsearch.component.html',
  styleUrls: ['./topsearch.component.css']
})
export class TopsearchComponent implements OnInit {

  imgShow : Array<ListMucsic> = [];
  currentSong: string='';
  url: string='';
  casy: string='';
  currentSongimg: string='';
  @ViewChild('css', {static: true}) css!:ElementRef;


  constructor(private dt: ListMucsicService,private renderer: Renderer2, private router: Router){}
  ngOnInit(): void {
    this.dt.getApi().subscribe(res => {
      this.imgShow = res
      
    })
  }

  playM(id:number){
    this.dt.playmusic(id).subscribe((res) => {
      const song = res;
      this.currentSong = song.name;
      this.url = song.url;
      this.currentSongimg = song.img;
      this.casy = song.casy;
      this.renderer.setStyle(this.css.nativeElement, 'transform', 'translateX(0)');

  })}
  
  product(){
    this.router.navigate(['product'])
  }

}
