import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  constructor(private router: Router){}

  link(){
    this.router.navigate(['listalbum'])

  }
}
