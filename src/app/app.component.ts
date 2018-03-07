import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VERSION  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor( private httpClient: HttpClient) {
  }

  send_http() {
    this.httpClient.get('https://randomuser.me/api').subscribe((data) => {
      console.log(data);
      console.log(VERSION.full);
    });

  }


}
