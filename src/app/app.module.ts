import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BanphathanhComponent } from './components/banphathanh/banphathanh.component';
import { TopsearchComponent } from './components/topsearch/topsearch.component';
import { LoginComponent } from './components/login/login.component';
import { TrendingComponent } from './components/trending/trending.component';
import { ListtrendingComponent } from './components/listtrending/listtrending.component';
import { TopartiComponent } from './components/toparti/toparti.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ContactComponent } from './components/contact/contact.component';
import { RoomchatComponent } from './components/roomchat/roomchat.component';
import { ListMucsicService } from './services/list-mucsic.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Thêm các import sau
import { TranslateCompiler, TranslateParser } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ContactComponent,
    RoomchatComponent,
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
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en', // Ngôn ngữ mặc định
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
        deps: [TranslateParser]
      }
    })
  ],
  providers:  [ListMucsicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
