import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BanphathanhComponent } from './components/banphathanh/banphathanh.component';
import { TopsearchComponent } from './components/topsearch/topsearch.component';
import { LoginComponent } from './components/login/login.component';
import { TrendingComponent } from './components/trending/trending.component';
import { ListtrendingComponent } from './components/listtrending/listtrending.component';
import { TopartiComponent } from './components/toparti/toparti.component';
import { FormsModule} from '@angular/forms';
import { ToastrModule} from 'ngx-toastr';
import { ProductComponent } from './components/product/product.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowlisttrendingComponent } from './components/showlisttrending/showlisttrending.component';
import { AlbumComponent } from './components/album/album.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MediaComponent } from './components/media/media.component';
import { GenresComponent } from './components/genres/genres.component';
import { MusicplayComponent } from './components/musicplay/musicplay.component';
import { OldsongComponent } from './components/oldsong/oldsong.component';
import { ListalbumComponent } from './components/listalbum/listalbum.component';

@NgModule({
  declarations: [
    AppComponent,
    BanphathanhComponent,
    TopsearchComponent,
    LoginComponent,
    TrendingComponent,
    ListtrendingComponent,
    TopartiComponent,
    ProductComponent,
    AdminComponent,
    ShowlisttrendingComponent,
    AlbumComponent,
    ProfileComponent,
    MediaComponent,
    GenresComponent,
    MusicplayComponent,
    OldsongComponent,
    ListalbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      // preventDuplicates: true,
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
