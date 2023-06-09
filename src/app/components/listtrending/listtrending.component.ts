import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';

import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';
Chart.register(...registerables);

@Component({
  selector: 'app-listtrending',
  templateUrl: './listtrending.component.html',
  styleUrls: ['./listtrending.component.css'],
})
export class ListtrendingComponent implements OnInit {
  currentSong: string = '';
  url: string = '';
  casy: string = '';
  id: number =0;
  Showlist: any;
  currentSongimg: string = '';
  @ViewChild('css', { static: true }) css!: ElementRef;

  constructor(
    private service: ListMucsicService,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService
  ) {}
  list1: Array<ListMucsic> = new Array<ListMucsic>();
  user: { name: string; vote: number }[] = [];
  ngOnInit(): void {
    this.service.getApi11().subscribe((res) => {
      this.user = res.map((item) => ({ name: item.name, vote: item.vote }));
      var myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: this.user.map(
            (item: { name: string; vote: number }) => item.name
          ),
          datasets: [
            {
              label: 'Vote',
              data: this.user.map(
                (item: { name: string; vote: number }) => item.vote
              ),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive:
            true /* make the chart responsive to changes in its container's size */,
          maintainAspectRatio: false /* don't maintain a fixed aspect ratio */,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    this.service.fetchapi1().subscribe((res) => {
      this.list1 = res;
    });
  }
  playM(id: number) {
    this.service.fetchapiMS('tatca', id).subscribe((res) => {
      const song = res;
      console.log(song);
      this.currentSong = song.name;
      this.url = song.img;
      this.id = song.id;
      this.casy = song.casy;
      this.currentSongimg = song.url;
      this.renderer.setStyle(
        this.css.nativeElement,
        'transform',
        'translateX(0)'
      );
    });
    this.service.fetchapiMS('tatca', id).subscribe((data) => {
      sessionStorage.setItem('musicplay', JSON.stringify(data));
    });
  }

  product(id:number){
    this.router.navigate(['musicplay'])
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
  addlist(data: string, id: number ) {
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
