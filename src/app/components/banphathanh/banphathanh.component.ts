import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-banphathanh',
  templateUrl: './banphathanh.component.html',
  styleUrls: ['./banphathanh.component.css'],
})
export class BanphathanhComponent implements OnInit {
  datas: Array<ListMucsic> = [];
  datasvn: Array<ListMucsic> = [];
  datasqt: Array<ListMucsic> = [];
  currentSong: string = '';
  casy: string = '';
  url: string = '';
  id: number = 0;
  Showlist: any;
  currentSongimg: string = '';

  @ViewChild('css', { static: true }) css!: ElementRef;
  constructor(
    private service: ListMucsicService,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getApi().subscribe((res) => {
      this.datas = res;
    });
    this.service.fetchapi('vietnam').subscribe((res) => {
      this.datasvn = res;
    });
    this.service.fetchapi('quocte').subscribe((res) => {
      this.datasqt = res;
    });
  }

  play(linkApi: string, id: number) {
    this.service.fetchapiMS(linkApi, id).subscribe((res) => {
      console.log(res);
      const song = res;
      this.currentSong = song.name;
      this.url = song.url;
      this.id = song.id;

      this.casy = song.casy;
      this.currentSongimg = song.img;
    });
    this.renderer.setStyle(
      this.css.nativeElement,
      'transform',
      'translateX(0)'
    );
    this.service.playmusic1(linkApi,id).subscribe((data) => {
      console.log(data);
      sessionStorage.setItem('musicplay', JSON.stringify(data));
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
