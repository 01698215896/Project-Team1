import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-showlisttrending',
  templateUrl: './showlisttrending.component.html',
  styleUrls: ['./showlisttrending.component.css'],
})
export class ShowlisttrendingComponent implements OnInit {
  @ViewChild('css', { static: true }) css!: ElementRef;
  datass: Array<ListMucsic> = [];
  Showlist: any;
  list: any;
  activeTab = 0;
  currentSong: string = '';
  casy: string = '';
  url: string = '';
  currentSongimg: string = '';
  id: number = 0;

  constructor(
    private service: ListMucsicService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getApi().subscribe((data) => {
      this.datass = data;
    });
  }

  play(id: number) {
    this.service.playmusic(id).subscribe((res) => {
      const song = res;
      console.log(song);
      this.currentSong = song.name;
      this.url = song.img;
      this.currentSongimg = song.url;
      this.casy = song.casy;
      this.id = song.id;

      this.renderer.setStyle(
        this.css.nativeElement,
        'transform',
        'translateX(0)'
      );
    });
    this.renderer.setStyle(
      this.css.nativeElement,
      'transform',
      'translateX(0)'
    );
    this.service.playmusic(id).subscribe((data) => {
      sessionStorage.setItem('musicplay', JSON.stringify(data));
    });
  }
  linkproduct() {
    this.router.navigate(['listalbum']);
  }
  product(id: number) {
    this.router.navigate(['musicplay']);
  }
  
  check() {
    if (localStorage.getItem('username')) {
      this.toastr.success('Download Successfully', 'Success', {
        toastClass: 'toast-custom',
      });
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  addlist(id: number) {
    this.service.playmusic(id).subscribe(res => {
      this.Showlist = res;
      const newMusic = {
        img: this.Showlist.img,
        name: this.Showlist.name,
        url: this.Showlist.url,
        casy: this.Showlist.casy,
        title: this.Showlist.title,
      };
  
      const id = localStorage.getItem('idUser');
  
      this.service.getUser(id).subscribe(user => {
        const updatedList = user.listmusic.concat(newMusic);
  
        this.service.update(id, { listmusic: updatedList }).subscribe(data => {
          console.log(data);
          this.toastr.success("Add music success", "Success", {
            toastClass: 'toast-custom',
          });
        });
      });
    });
  }
}
