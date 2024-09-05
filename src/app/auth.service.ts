// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import * as bcrypt from 'bcryptjs';
// import { UserDTO } from './Functions/dto/user.dto';
// import { Router } from '@angular/router';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private user: UserDTO | undefined;
//   private authUrl = environment.apiUrl + 'users/username';

//   constructor(private http: HttpClient, private router: Router) {
//     // console.log('constructor ' + this.authUrl);
//   }

//   signin(username: string, password: string): Observable<boolean> {
//     console.log('signin ' + this.authUrl);
//     return this.http.get<UserDTO>(`${this.authUrl}/${username}`).pipe(
//       map((user: UserDTO) => {
//         console.log('before if: bcrypt pass');
//         if (user && bcrypt.compareSync(password, user.password)) {
//           this.user = user;
//           console.log(this.user);
//           localStorage.setItem('user', JSON.stringify(this.user));
//           this.redirectUser();
//           return true;
//         } else {
//           console.error('Invalid credentials');
//           return false;
//         }
//       }),
//       catchError((error) => {
//         console.error('Error fetching user details', error);
//         return of(false);
//       })
//     );
//   }

//   // logout(): void {
//   //   // Clear the user data from local storage
//   //   localStorage.removeItem('user');
//   //   this.user = undefined;

//   //   // Redirect the user to the login page
//   //   this.router.navigate(['/login']);
//   // }

//   isLoggedIn(): boolean {
//     // Check if user is already stored in memory or local storage
//     if (this.user) {
//       return true;
//     } else {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         this.user = JSON.parse(storedUser);
//         return true;
//       }
//     }
//     return false;
//   }
//   private redirectUser(): void {
//     console.log('inside redirect' + this.user?.role);
//     if (this.user?.role === 'ADMIN') {
//       this.router.navigate(['admin-dashboard']);
//     } else if (this.user?.role === 'TASK_ASSIGNEE') {
//       this.router.navigate(['task-assignee-dashboard']);
//     } else if (this.user?.role === 'PROJECT_MANAGER') {
//       console.log('inside if' + this.user?.role);
//       this.router.navigate(['project-manager-dashboard']);
//     } else {
//       // Optionally, handle the case where the role doesn't match any known role
//       console.error('Unknown role, unable to redirect');
//     }
//   }
// }
