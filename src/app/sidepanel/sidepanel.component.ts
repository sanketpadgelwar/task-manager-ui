import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.css',
})
export class SidepanelComponent {
  activeTab: string = 'dashboard';

  constructor(private router: Router) {}

  navigateTo(tab: string) {
    this.activeTab = tab; // Set the active tab
    this.router.navigate([`/${tab}`]);
  }
}
