import { Component, OnInit } from '@angular/core';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

interface Lyric {
  time: number;
  text: string;
  highlighted: boolean;
}

@Component({
  selector: 'app-musicplay',
  templateUrl: './musicplay.component.html',
  styleUrls: ['./musicplay.component.css']
})
export class MusicplayComponent implements OnInit {
  lyrics: Lyric[] = [];
  name: string = '';
  casy: string = '';
  title: string = '';
  url: string = '';
  img: string = '';
  timeplay: Lyric[] = [];

  constructor(private service: ListMucsicService) {}

  ngOnInit(): void {
    const listmedia = sessionStorage.getItem('musicplay');
    if (listmedia) {
      const list = JSON.parse(listmedia);
      this.name = list.name;
      this.casy = list.casy;
      this.title = list.title;
      this.img = list.img;
      this.url = list.url;
      this.timeplay = list.timeplay;
      
      // Duyệt qua mảng timeplay và chuyển đổi thành mảng của các đối tượng Lyric
      this.lyrics = this.timeplay.map((timeplay: any) => {
        return {
          time: timeplay.time,
          text: timeplay.text,
          highlighted: false
        };
      });
    }
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
