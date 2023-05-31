import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('lyricList') lyricListRef!: ElementRef<HTMLUListElement>;
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
}
