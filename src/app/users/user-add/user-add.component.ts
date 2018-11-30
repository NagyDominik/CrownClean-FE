import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }


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
  }

  save()
  {
    const user = this.userForm.value;
    this.userService.addUser(user).subscribe(() => {
      this.router.navigateByUrl('/users');
    },
      error => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

}
