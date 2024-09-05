import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  // constructor(public authService: AuthService) {}
  // logout(): void {
  //   // this.authService.logout();
  // }
}
