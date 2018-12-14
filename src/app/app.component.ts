import { Component, OnInit } from '@angular/core';
import { TokenService } from './shared/services/token_service/token.service';
import { LoginService } from './shared/services/login_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CrownClean-FE';

  public constructor() {}

  ngOnInit() {
    /*const context = this;
    window.addEventListener('beforeunload', function (e) {
        this.console.log('User closed the window!');
        context.logout();
      }
    );*/
  }

  logout() {
    // Clear the token from local storage
    localStorage.clear();
  }
}
