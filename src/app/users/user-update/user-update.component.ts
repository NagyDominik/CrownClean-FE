import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import {User} from '../../shared/models/User/user';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private location: Location) { }

  id: number;



  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    addresses: new FormControl(''),
    isCompany: new FormControl(''),
    isAdmin: new FormControl(''),
    isApproved: new FormControl('')
  });

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByID(this.id).subscribe(user => {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        addresses: user.addresses,
        isCompany: user.isCompany,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved
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
      this.back();
    },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
  }
}
