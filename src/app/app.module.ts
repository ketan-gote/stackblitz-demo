import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmexioWidgetModule} from 'amexio-ng-extensions';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
