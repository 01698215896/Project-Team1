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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  list: any;
  currentSong: string = '';
  casy: string = '';
  time: string = '';
  url: string = '';
  id:number = 0;
  currentSongimg: string = '';
  listMucsic: Array<ListMucsic> = new Array<ListMucsic>();
  @ViewChild('css', { static: true }) css!: ElementRef;
  constructor(
    private service: ListMucsicService,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('idUser');
    this.service.getData1(id).subscribe((data) => {
      this.listMucsic = data.listmusic;
    });
  }
  showmusic(name: string) {
    console.log(name);
    const idd = localStorage.getItem('idUser');
  
    this.service.getData1(idd).subscribe((data) => {
      this.list = data.listmusic;
      const selectedMusic = this.list.find((music: { name: string; }) => music.name === name);
  
      if (selectedMusic) {
        this.currentSong = selectedMusic.name;
        this.url = selectedMusic.img;
        this.currentSongimg = selectedMusic.url;
        this.casy = selectedMusic.casy;
        this.time = selectedMusic.time;
        sessionStorage.setItem('musicplay', JSON.stringify(data));
  
        this.renderer.setStyle(
          this.css.nativeElement,
          'transform',
          'translateX(0)'
        );
      }
    });
  }
  


  check() {
    if (localStorage.getItem('idUser')) {
      this.toastr.success('Download Successfully', 'Success',{toastClass:'toast-custom'})
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  product(id:Number){
  
    this.router.navigate(['musicplay'])
  }
}
