import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user_service/user.service';
import { TokenService } from '../shared/services/token_service/token.service';
import { User } from '../shared/models/User/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private snackBar: MatSnackBar) { }

  currentUser: User;

  ngOnInit() {
    this.tokenService.getUserFromToken().subscribe(user => {
      this.userService.getUserByID(user.id).subscribe(userById => {
        this.currentUser = userById;
      },
        error => {
          console.log(error);
          this.openSnackBar(error.message);
        }
      );
    },
      error => {
        console.log(error);
        this.openSnackBar(error.message);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }

}
