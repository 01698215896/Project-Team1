import { Component, OnInit } from '@angular/core';
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
  lyrics: Lyric[] = [];

  listss : any;
  name: string ='';
  url: string ='';
  img: string ='';
  title: string ='';
  list : Array<ListMucsic> = []
  timeplay: Lyric[] = [];

  constructor(private service: ListMucsicService){}

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
      this.lyrics.forEach((lyric: Lyric) => {
        if (currentTime >= lyric.time && currentTime < lyric.time + 5) {
          // Hiệu ứng được kích hoạt
          lyric.highlighted = true;
        } else {
          // Hiệu ứng bị tắt
          lyric.highlighted = false;
        }
      });
    }
  }

}
