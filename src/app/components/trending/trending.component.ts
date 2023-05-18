import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListMucsicService } from 'src/app/services/list-mucsic.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  constructor(public service: ListMucsicService, private router: Router){}

  ngOnInit(): void {
    
  }

  link(){
    this.router.navigate(['/showlisttrending']);
  }

}
