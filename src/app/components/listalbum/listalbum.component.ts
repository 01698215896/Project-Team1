import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListMucsic } from 'src/app/models/list-mucsic';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';
interface Lyric {
  time: number;
  text: string;
  highlighted: boolean;
}
@Component({
  selector: 'app-listalbum',
  templateUrl: './listalbum.component.html',
  styleUrls: ['./listalbum.component.css']
})
export class ListalbumComponent implements OnInit {
  @ViewChild('lyricList') lyricListRef!: ElementRef<HTMLUListElement>;
  lyrics: Lyric[] = [];

  listss : any;
  name: string ='';
  url: string ='';
  img: string ='';
  title: string ='';
  list : Array<ListMucsic> = []
  timeplay: Lyric[] = [];
  Showlist: any;

  constructor(private service: ListMucsicService,private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    const data = sessionStorage.getItem('theloai');
    if(data){
      this.service.fetchapi111(data).subscribe(data =>{
        this.list = data


      })
    }
  }
  play(id: number, name:string, img:string, title:string, url:string){
      this.name = name;
      this.url = url;
      this.img = img;
      // this.timeplay = timeplay;
      this.title = title;
      const selectedMusic = this.list.find((music: ListMucsic) => music.id === id);
      if (selectedMusic) {
        // Truy cập vào thuộc tính timeplay của phần tử đã tìm thấy
        this.timeplay = selectedMusic.timeplay;
      }
      this.lyrics = this.timeplay.map((timeplay: any) => {
        return {
          time: timeplay.time,
          text: timeplay.text,
          highlighted: false
        };
      });
      console.log(this.img, this.name, this.url,  this.timeplay);
  }
  
  currentLyricTime: number = 0;

  updateLyrics(audio: EventTarget | null) {
    if (audio instanceof HTMLAudioElement) {
      const currentTime = audio.currentTime;
      this.currentLyricTime = currentTime;

      // Cập nhật trạng thái hiệu ứng cho các lời hát
      this.lyrics.forEach((lyric: Lyric, index: number) => {
        if (currentTime >= lyric.time && currentTime < lyric.time + 5) {
          // Hiệu ứng được kích hoạt
          lyric.highlighted = true;

          // Di chuyển câu hiện tại vào giữa khung trượt
          const lyricList = this.lyricListRef.nativeElement;
          const lyricElements = lyricList.getElementsByTagName('li');
          const currentLyricElement = lyricElements[index];

          if (currentLyricElement) {
            const containerHeight = lyricList.clientHeight;
            const lyricHeight = currentLyricElement.clientHeight;
            const scrollPosition = currentLyricElement.offsetTop - (containerHeight / 2) + (lyricHeight / 2);
            console.log(scrollPosition)
            lyricList.scrollTo({ top: scrollPosition, behavior: 'smooth' });
          }
        } else {
          // Hiệu ứng bị tắt
          lyric.highlighted = false;
        }

        // Kiểm tra nếu câu hiện tại đã kết thúc thời gian
        const nextLyric = this.lyrics[index + 1];
        if (nextLyric && currentTime >= nextLyric.time) {
          // Di chuyển câu hiện tại lên trên để nhường cho câu tiếp theo
          const lyricList = this.lyricListRef.nativeElement;
          const currentLyricElement = lyricList.getElementsByTagName('li')[index];
    
          if (currentLyricElement) {
            const containerHeight = lyricList.clientHeight;
            const lyricHeight = currentLyricElement.clientHeight;
            const scrollPosition = currentLyricElement.offsetTop - (containerHeight / 2) + (lyricHeight / 2);
            lyricList.scrollTo({ top: scrollPosition, behavior: 'smooth' });
          }
        
        }
      });
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

}
