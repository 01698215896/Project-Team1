import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanphathanhComponent } from './components/banphathanh/banphathanh.component';
import { TopsearchComponent } from './components/topsearch/topsearch.component';
import { LoginComponent } from './components/login/login.component';
import { TrendingComponent } from './components/trending/trending.component';
import { ListtrendingComponent } from './components/listtrending/listtrending.component';
import { TopartiComponent } from './components/toparti/toparti.component';
import { CheckuserGuard } from './guards/checkuser.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ProductComponent } from './components/product/product.component';
import { ShowlisttrendingComponent } from './components/showlisttrending/showlisttrending.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AlbumComponent } from './components/album/album.component';
import { MediaComponent } from './components/media/media.component';
import { GenresComponent } from './components/genres/genres.component';
import { MusicplayComponent } from './components/musicplay/musicplay.component';
import { OldsongComponent } from './components/oldsong/oldsong.component';
import { ListalbumComponent } from './components/listalbum/listalbum.component';
import { ContactComponent } from './components/contact/contact.component';
import { RoomchatComponent } from './components/roomchat/roomchat.component';

const routes: Routes = [
  { path: '', component: TopsearchComponent },
  { path: 'banphathanh', component: BanphathanhComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'roomchat', component: RoomchatComponent , canActivate: [CheckuserGuard], pathMatch: 'prefix'},
  { path: 'listtrending', component: ListtrendingComponent},
  { path: 'toparti', component: TopartiComponent },
  { path: 'topsearch', component: TopsearchComponent },
  { path: 'admin', component: AdminComponent, canActivate: [CheckuserGuard], pathMatch: 'prefix'},
  { path: 'product', component: ProductComponent , canActivate: [CheckuserGuard], pathMatch: 'prefix'}, 
  // { path: 'admin', component: AdminComponent},
  // { path: 'product', component: ProductComponent }, 
  { path: 'showlisttrending', component: ShowlisttrendingComponent }, 
  { path: 'listalbum', component: ListalbumComponent }, 
  { path: 'album', component: AlbumComponent }, 
  { path: 'profile', component: ProfileComponent }, 
  { path: 'oldsong', component: OldsongComponent }, 
  { path: 'media', component: MediaComponent }, 
  { path: 'genres', component: GenresComponent }, 
  { path: 'musicplay', component: MusicplayComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CheckuserGuard] // Thêm CheckuserGuard vào providers
})
export class AppRoutingModule { }
