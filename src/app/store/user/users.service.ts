import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCreationData } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  signUp(userData: UserCreationData) {
    return this.http.post<User>('/api/signup', userData);
  }
}
