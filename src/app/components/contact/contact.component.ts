import { Component } from '@angular/core';

interface Lyric {
  time: number;
  text: string;
  highlighted: boolean;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // lyrics: Lyric[] = [
  //   { time: 5, text: "Lời bài hát dòng thứ nhất", highlighted: false },
  //   { time: 10, text: "Lời bài hát dòng thứ hai", highlighted: false },
  //   { time: 15, text: "Lời bài hát dòng thứ ba", highlighted: false },
  //   // Thêm các dòng lời bài hát khác với thời gian tương ứng
  // ];

  // currentLyricTime: number = 0;

  // updateLyrics(audio: EventTarget | null) {
  //   if (audio instanceof HTMLAudioElement) {
  //     const currentTime = audio.currentTime;
  //     this.currentLyricTime = currentTime;

  //     // Cập nhật trạng thái hiệu ứng cho các lời hát
  //     this.lyrics.forEach(lyric => {
  //       if (currentTime >= lyric.time && currentTime < lyric.time + 5) {
  //         // Hiệu ứng được kích hoạt
  //         lyric.highlighted = true;
  //       } else {
  //         // Hiệu ứng bị tắt
  //         lyric.highlighted = false;
  //       }
  //     });
  //   }
  // }
}
