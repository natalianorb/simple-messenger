import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./auth/sign-in/sign-in.component').then(m => m.SignInComponent)
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
