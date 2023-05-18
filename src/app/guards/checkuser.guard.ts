import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ListMucsicService } from '../services/list-mucsic.service';

@Injectable({
  providedIn: 'root'
})
export class CheckuserGuard implements CanActivate {

  constructor(private listMucsicService: ListMucsicService, private router:Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    const isLoggedIn = this.listMucsicService.checklogin();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}