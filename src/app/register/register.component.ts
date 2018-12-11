import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication_service/authentication.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    IsCompany: new FormControl(''),
    Address: new FormControl(''),
    TaxNumber: new FormControl({value: '', disabled: true})
  });

  enabled = false;
  userIsCompany = false;

  constructor( private router: Router,
              private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.signUpForm.get('IsCompany').setValue(false);
  }

  changeCompanySelection() {
    this.userIsCompany = !this.userIsCompany;
    if (this.userIsCompany) {
      console.log('User is a company!');
      this.signUpForm.get('TaxNumber').enable();
    } else {
      console.log('User is not a company!');
      this.signUpForm.get('TaxNumber').disable();
    }

  }

  register() {
    const user = this.signUpForm.value;
    user.IsCompany = this.signUpForm.get('IsCompany').value;
    this.authenticationService.register(user).subscribe(response => {
      if (response) {
        console.log('Successfull registration');
        this.router.navigateByUrl('/');
      } else {
        console.log('Registration failed');
      }},
      error => {
        alert(error.message);
        console.log(error);
      }
    );
  }

}
