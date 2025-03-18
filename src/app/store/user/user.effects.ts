import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private usersService = inject(UsersService);
  private router = inject(Router);

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.signUp),
      switchMap(({ name, email, password }) => {
        return this.usersService.signUp({ name, email, password }).pipe(
          map((user) => {
            this.router.navigate(['/']);
            return UserActions.signUpSuccess({ user });
          }),
          catchError((error) =>
            of(UserActions.signUpFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
