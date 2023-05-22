import { Component , OnInit, Renderer2,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-toparti',
  templateUrl: './toparti.component.html',
  styleUrls: ['./toparti.component.css'],
})
export class TopartiComponent implements OnInit {
  constructor(private service: ListMucsicService, private router: Router, private renderer: Renderer2) {}
  @ViewChild('css', {static: true}) css!:ElementRef;

  list: any;
  id: number =0;

  activeTab = 0;
  currentSong: string='';
  casy: string='';
  url: string='';

  currentSongimg: string='';

  ngOnInit(): void {
    this.service.fetchapi1().subscribe((res) => {
      this.list = res;
    });
  }

  all(data: string, num: number) {
    this.service.fetchapi(data).subscribe((res) => {
      this.list = res;
    });
    
    this.activeTab = num;
  }
  
  play(id: number) {

    this.service.fetchapi1a(id).subscribe((res) => {
      const song = res;
      console.log(song);
      this.currentSong = song.name;
      this.url = song.img;
      this.id = song.id;

      this.currentSongimg = song.url;
      this.casy = song.casy;
      this.renderer.setStyle(
        this.css.nativeElement,
        'transform',
        'translateX(0)'
      );
    });
    this.renderer.setStyle(this.css.nativeElement, 'transform', 'translateX(0)');
    this.service.playmusic(id).subscribe((data) => {
      sessionStorage.setItem('musicplay', JSON.stringify(data));
    });
  }
  product(id:number){
  
    this.router.navigate(['musicplay'])
  }
}
