import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user_service/user.service';
import { TokenService } from '../shared/services/token_service/token.service';
import { User } from '../shared/models/User/user';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

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

  profileForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit() {
    this.tokenService.getUserFromToken().subscribe(user => {
      this.userService.getUserByID(user.id).subscribe(userById => {
        this.currentUser = userById;
        this.profileForm.patchValue({
          firstname: userById.firstName,
          lastname: userById.lastName,
          phone: userById.phoneNumber,
          email: userById.email
        });
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

  save() {
    const phone = this.profileForm.get("phone").value;
    const email = this.profileForm.get("email").value;
    if (phone != this.currentUser.phoneNumber)
      this.currentUser.phoneNumber = phone;
    if (email != this.currentUser.email)
      this.currentUser.email = email;
    this.userService.updateUser(this.currentUser).subscribe(() => {
      this.openSnackBar('Update Succesful!');
    },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }

}
