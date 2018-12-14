import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../shared/models/User/user';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/shared/services/token_service/token.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    public snackBar: MatSnackBar,
    private location: Location) { }

  id: number;
  currentUser: User;
  userUpdate: User;

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    isCompany: new FormControl(''),
    isAdmin: new FormControl(''),
  });

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.tokenService.getUserFromToken().subscribe(user => {
      this.userService.getUserByID(user.id).subscribe(userById => {
        this.currentUser = userById;
      })
    });
    this.refresh();
  }

  refresh() {
    this.userService.getUserByID(this.id).subscribe(user => {
      this.userUpdate = user;
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isCompany: user.isCompany,
        isAdmin: user.isAdmin
      });
    },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  back() {
    this.location.back();
  }

  save() {
    const user = this.userForm.value;
    user.id = this.id;

    this.userService.updateUser(user).subscribe(() => {
      this.openSnackBar('Update Succesful!');
    },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  approve(id: number) {
    this.userService.approveUser(id).subscribe(() => {
      this.openSnackBar('User has been approved!');
      this.refresh();
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }
}
