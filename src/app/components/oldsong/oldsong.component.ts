import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-oldsong',
  templateUrl: './oldsong.component.html',
  styleUrls: ['./oldsong.component.css'],
})
export class OldsongComponent implements OnInit {
  @ViewChild('css', { static: true }) css!: ElementRef;

  list: any;
  id: number = 0;
  Showlist: any;

  activeTab = 0;
  currentSong: string = '';
  casy: string = '';
  url: string = '';
  currentSongimg: string = '';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private service: ListMucsicService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.service.fetchapi1().subscribe((res) => {
      this.list = res;
    });
  }

  play(data: string, id: number) {
    this.service.fetchapiMS(data, id).subscribe((res) => {
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
    this.renderer.setStyle(
      this.css.nativeElement,
      'transform',
      'translateX(0)'
    );
    this.service.fetchapiMS(data, id).subscribe((data) => {
      sessionStorage.setItem('musicplay', JSON.stringify(data));
    });
  }
  product(id: number) {
    this.router.navigate(['musicplay']);
  }

  link(data: string) {
    sessionStorage.setItem('theloai', data);

    this.router.navigate(['listalbum']);
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
  addlist(data: string, id: number) {
    if (localStorage.getItem('idUser')) {
      this.service.fetchapiMS(data, id).subscribe((res) => {
        this.Showlist = res;
        const newMusic = {
          img: this.Showlist.img,
          name: this.Showlist.name,
          url: this.Showlist.url,
          casy: this.Showlist.casy,
          title: this.Showlist.title,
        };

        const id = localStorage.getItem('idUser');

        this.service.getUser(id).subscribe((user) => {
          const updatedList = user.listmusic.concat(newMusic);

          this.service
            .update(id, { listmusic: updatedList })
            .subscribe((data) => {
              console.log(data);
              this.toastr.success('Add music success', 'Success', {
                toastClass: 'toast-custom',
              });
            });
        });
      });
    }else{
      this.router.navigate(['login']);
    }
  }
}
