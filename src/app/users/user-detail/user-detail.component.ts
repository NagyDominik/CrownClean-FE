import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute, private location: Location, public snackBar: MatSnackBar) { }
  
  currentUser: User;
  
  ngOnInit() {
    this.getUser();
  }

  back() {
    this.location.back();
  }

  getUser()
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByID(id).subscribe(user => {
      this.currentUser = user;
      },
        error => {
        console.log(error);
        this.openSnackBar(error.error);  
      }
    );
  }

  approve(id: number) {
    this.userService.approveUser(id).subscribe(message => {
      this.openSnackBar("User has been approved!");
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'OK', {
      duration: 1500,
    })
  }
}
