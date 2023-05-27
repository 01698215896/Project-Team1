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
  selector: 'app-topsearch',
  templateUrl: './topsearch.component.html',
  styleUrls: ['./topsearch.component.css'],
})
export class TopsearchComponent implements OnInit {
   check1 = false;

  Showlist: any;
  imgShow: Array<ListMucsic> = [];
  currentSong: string = '';
  id: number = 0;
  url: string = '';
  casy: string = '';
  currentSongimg: string = '';
  @ViewChild('css', { static: true }) css!: ElementRef;

  constructor(
    private dt: ListMucsicService,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.dt.getApi().subscribe((res) => {
      this.imgShow = res;
    });
    // if (sessionStorage.getItem('idUser')) {
    //   if (!this.check1) {
    //   // location.reload();
    //   this.check1 = true;
    //   } 
    //   if(this.check1){
    //   this.check1 = false;

    //     return;
    //   }
    // }
  }

  playM(id: number) {
    this.dt.playmusic(id).subscribe((res) => {
      const song = res;
      this.currentSong = song.name;
      this.id = song.id;
      this.url = song.url;
      this.currentSongimg = song.img;
      this.casy = song.casy;
      this.renderer.setStyle(
        this.css.nativeElement,
        'transform',
        'translateX(0)'
      );
      this.dt.playmusic(id).subscribe((data) => {
        sessionStorage.setItem('musicplay', JSON.stringify(data));
      });
    });
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
    this.dt.playmusic(id).subscribe(res => {
      this.Showlist = res;
      const newMusic = {
        img: this.Showlist.img,
        name: this.Showlist.name,
        url: this.Showlist.url,
        casy: this.Showlist.casy,
        title: this.Showlist.title,
      };
  
      const id = localStorage.getItem('idUser');
  
      this.dt.getUser(id).subscribe(user => {
        const updatedList = user.listmusic.concat(newMusic);
  
        this.dt.update(id, { listmusic: updatedList }).subscribe(data => {
          console.log(data);
          this.toastr.success("Add music success", "Success", {
            toastClass: 'toast-custom',
          });
        });
      });
    });
  }
  
}
