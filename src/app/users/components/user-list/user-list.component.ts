import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/service/localstorage.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  public userlisting: any
  constructor(private router: Router, private localStorage: LocalStorageService) {
    this.userlisting = this.localStorage.getItem('UserDetailsArray')
  }

  public addUser() {
    this.router.navigateByUrl('/add-user')
  }
  public editDetail(Id: any) {
    this.router.navigateByUrl(`/edit-user/${Id}`);
  }
  public userAction(index: number, action: string): void {
    let title, text;

    if (action === 'delete') {
      title = 'Are you sure?';
      text = 'You are about to delete this user.';
    } else if (action === 'toggle') {
      const user = this.userlisting[index];
      const status = user.active ? 'deactivate' : 'activate';
      title = `Are you sure?`;
      text = `Are you sure you want to ${status} this user?`;
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (action === 'delete') {
          this.userDelete(index);
        } else if (action === 'toggle') {
          this.toggleUserStatus(index);
        }
      }
    });
  }
  public userDelete(index: number): void {
    this.userlisting.splice(index, 1);
    this.updateUserDetailsArray();
    Swal.fire('Deleted!', 'User has been deleted.', 'success');
  }

  public toggleUserStatus(index: number): void {
    const user = this.userlisting[index];
    user.active = !user.active;
    this.updateUserDetailsArray();
    const actionMessage = user.active ? 'activated' : 'deactivated';
    Swal.fire('Success!', `User has been ${actionMessage}.`, 'success');
  }

  private updateUserDetailsArray(): void {
    this.localStorage.setItem('UserDetailsArray', this.userlisting);
  }
  public logOut(){
    this.router.navigateByUrl(`/`);
     localStorage.clear()
  }
}
