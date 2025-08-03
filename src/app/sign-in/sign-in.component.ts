// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-sign-in',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.css'],
//   providers: [AuthService], // Ensure AuthService is provided here
// })
// export class SignInComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   onSignin(): void {
//     this.authService.signin(this.username, this.password).subscribe(
//       (isLoggedIn) => {
//         if (!isLoggedIn) {
//           this.errorMessage = 'Invalid username or password';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'Error occurred during login';
//       }
//     );
//   }
// }
