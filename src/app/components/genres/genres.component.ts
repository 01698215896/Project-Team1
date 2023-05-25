import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {
  constructor(private router: Router){}

  link(){
    this.router.navigate(['listalbum'])

  }
}
