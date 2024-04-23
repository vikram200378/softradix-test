import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators , AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/service/localstorage.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public signupForm: FormGroup
  public heading: any;
  public userDetailsArray: any = [];
  public userId: any;
  public user: any;
  public showError: any
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private localStorageService: LocalStorageService) {



    this.route.url.subscribe((url: any) => {
      if (url.find((segment: any) => segment.path === 'add-user')) {
        this.heading = 'Add User';
      } else if (url.find((segment: any) => segment.path === 'edit-user')) {
        this.heading = 'Edit User';
      } else {
        this.heading = 'Sign Up';
      }
    });
    const storedUsers = this.localStorageService.getItem('UserDetailsArray');
    if (storedUsers) {
      this.userDetailsArray = storedUsers;
    }
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, this.onlyAlphabetsValidator()]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    })

    this.route.params.subscribe((params: any) => {
      this.userId = +params['id'];
      const userDetailsArray = this.localStorageService.getItem('UserDetailsArray') as any[];

      if (userDetailsArray && userDetailsArray.length > this.userId) {
        const userDetails = userDetailsArray[this.userId];

        this.signupForm.patchValue(userDetails)
        console.log(userDetails);
      } else {
        console.error('Invalid userId or userDetailsArray is empty.');
      }
    });
  }
  onlyAlphabetsValidator(): any {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[a-zA-Z\s]*$/.test(control.value);
      return valid ? null : { invalidName: true };
    };
  }
  public navigateToSignin() {
    this.router.navigateByUrl('/')
  }
  public handleRegistration() {

    
    const password = this.signupForm.value.password
    const confirmPassword = this.signupForm.value.confirmPassword
    if (password != confirmPassword) {
      this.showError = "ConfirmPassword don't match";
      return
    }
    if (this.signupForm.valid) {
      this.showError = ''
      console.log( this.signupForm.value)
      this.route.url.subscribe((url: any) => {
        if (url.find((segment: any) => segment.path === 'add-user')) {
          this.heading = 'Add User';
          const newUser = this.signupForm.value
          this.userDetailsArray.push(newUser)
          this.localStorageService.setItem('UserDetailsArray', this.userDetailsArray)
          Swal.fire('Success', 'User details saved successfully', 'success').then(() => {
            this.router.navigate(['/users']);
          });
        } else if (typeof this.userId === 'number' && this.userId >= 0 && this.userId < this.userDetailsArray.length) {
          const newUser = this.signupForm.value;
          this.userDetailsArray[this.userId] = { ...newUser };
          this.localStorageService.setItem('UserDetailsArray', this.userDetailsArray);
          Swal.fire('Success', 'User details updated successfully', 'success').then(() => {
            this.router.navigate(['/users']);
          });
        } else {
          this.heading = 'Sign Up';
          this.localStorageService.setItem('user', this.signupForm.value)
          this.router.navigate(['/']);
        }
      });
    } else {
      // Swal.fire('Error', 'Form is not valid!', 'error')
    }
  }
}
