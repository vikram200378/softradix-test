import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { UserListComponent } from './users/components/user-list/user-list.component';


export const routes: Routes = [

    {
       path:'',
       loadComponent:()=> LoginComponent
    },
    {
        path:'signup',
        loadComponent:()=> SignupComponent
    },
    {
        path:'add-user',
        loadComponent:()=> SignupComponent
    },
    {
        path:'edit-user/:id',
        loadComponent:()=> SignupComponent
    },
    {
        path:'users',
        loadComponent:()=> UserListComponent
    }
];
