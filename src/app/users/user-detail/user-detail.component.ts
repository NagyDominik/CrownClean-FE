import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  currentUser: User;  

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer()
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserByID(id).subscribe(user => {
      this.currentUser = user;
      },
        error => {
        console.log(error.message);
        alert(error.message);   
      }
    );
  }

}
