import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/service/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public signinForm: FormGroup
  public userDetails: any

  constructor(private router: Router, private fb: FormBuilder, private localStorage: LocalStorageService) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    })

    this.userDetails = this.localStorage.getItem('user')
  }


  public login() {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;

    if (!this.userDetails) {
      Swal.fire('Login Failed', 'User details not found!', 'error');
    } else if (this.userDetails.email === email && this.userDetails.password === password) {
      this.router.navigateByUrl('/users');
      Swal.fire('Login Successful', 'Welcome!', 'success');
    } else {
      Swal.fire('Login Failed', 'Invalid username or password', 'error');
    }
  }

  public navigateToSignup() {
    this.router.navigateByUrl('/signup')
  }
}
