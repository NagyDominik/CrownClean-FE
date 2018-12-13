import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from 'src/app/shared/models/User/user';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar) { }

  currentUser: User;

  ngOnInit() {
    this.getUser();
  }

  backToList() {
    this.router.navigateByUrl('admin/users');
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByID(id).subscribe(user => {
      this.currentUser = user;
      },
        err => {
        console.log(err);
        this.openSnackBar(err.error);
      }
    );
  }

  approve(id: number) {
    this.userService.approveUser(id).subscribe(message => {
      this.openSnackBar('User has been approved!');
    },
        err => {
        console.log(err);
        this.openSnackBar(err.error);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }
}
