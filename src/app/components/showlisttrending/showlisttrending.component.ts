import { Component , OnInit, Renderer2,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-showlisttrending',
  templateUrl: './showlisttrending.component.html',
  styleUrls: ['./showlisttrending.component.css']
})
export class ShowlisttrendingComponent implements OnInit {
  @ViewChild('css', {static: true}) css!:ElementRef;
  datass: Array<ListMucsic> =[]
  
  list: any;
  activeTab = 0;
  currentSong: string='';
  casy: string='';
  url: string='';
  currentSongimg: string='';

  constructor(private service: ListMucsicService, private router: Router, private renderer: Renderer2){}


  ngOnInit(): void {
    this.service.getApi().subscribe(data=>{
      this.datass = data
    })

  }

  play(id: number) {

    this.service.playmusic(id).subscribe((res) => {
      const song = res;
      console.log(song);
      this.currentSong = song.name;
      this.url = song.img;
      this.currentSongimg = song.url;
      this.casy = song.casy;
      this.renderer.setStyle(
        this.css.nativeElement,
        'transform',
        'translateX(0)'
      );
    });
    this.renderer.setStyle(this.css.nativeElement, 'transform', 'translateX(0)');
  }
  linkproduct(){
    this.router.navigate(['product'])
  }
  product(){
    this.router.navigate(['product'])
  }

}
