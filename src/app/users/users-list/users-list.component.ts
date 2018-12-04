import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.userService.getUsers().subscribe(listOfUsers => {
      this.users = listOfUsers;
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
      },
      error => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  approve(id: number) {
    this.userService.approveUser(id).subscribe(message => {
        this.refresh();
      },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }
}
