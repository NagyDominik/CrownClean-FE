import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { User } from 'src/app/shared/models/User/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService, public snackBar: MatSnackBar) { }

  users: User[];
  count: number;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.userService.getUsers().subscribe(listOfUsers => {
      debugger;
      this.users = listOfUsers.list;
      this.count = listOfUsers.count;
    },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(message => {
      this.refresh();
      this.openSnackBar("User has been deleted!");
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
      this.refresh();
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