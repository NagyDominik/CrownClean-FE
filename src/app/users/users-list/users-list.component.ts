import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { User } from 'src/app/shared/models/User/user';
import { MatSnackBar, PageEvent } from '@angular/material';
import { UserFilter } from 'src/app/shared/models/User/UserFilter';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService, public snackBar: MatSnackBar) { }

  currentUser: User;
  datasource: User[];
  pageEvent: PageEvent;
  length: number;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    const filter = new UserFilter();
    filter.currentPage = 1;
    filter.itemsPerPage = 5;
    this.userService.getFilteredUsers(filter).subscribe(result => {
      this.datasource = result.list;
      this.length = result.count;
    }, err => {
      console.log(err);
      this.openSnackBar('Unable to retrieve vehicles: ' + err.error);
    });
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe(message => {
      this.refresh();
      this.openSnackBar('User has been deleted!');
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }

  approve(id: number) {
    this.userService.approveUser(id).subscribe(message => {
      this.openSnackBar('User has been approved!');
      this.refresh();
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }

  getData(event: PageEvent) {
    const filter = new UserFilter();
    filter.currentPage = event.pageIndex + 1;
    filter.itemsPerPage = event.pageSize;
    this.userService.getFilteredUsers(filter).subscribe(result => {
      this.datasource = result.list;
      this.length = result.count;
    }, err => {
      console.log(err);
      this.openSnackBar('Unable to retrieve vehicles: ' + err.error);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }
}
