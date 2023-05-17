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
  // list: any;
  currentSong: string = '';
  casy: string = '';
  url: string = '';
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
    this.service.fetchapi1().subscribe((data) => {
      this.listMucsic = data;
    });
  }
  showmusic(id: number) {
    this.service.fetchapi11(id).subscribe((data) => {
      this.currentSong = data.name;
      this.url = data.img;
      this.currentSongimg = data.url;
      this.casy = data.casy;
    });

    this.renderer.setStyle(
      this.css.nativeElement,
      'transform',
      'translateX(0)'
    );
  }
  check() {
    if (sessionStorage.getItem('username')) {
      this.toastr.success('Download Successfully', 'Success',{toastClass:'toast-custom'})
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
