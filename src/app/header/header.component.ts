import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() itemMenu: MenuItem = { id: 0, label: 'Home', icon: 'home', routerLink: '' };

  constructor(private router: Router) { }

  getPageRedirect() {
    return this.itemMenu.routerLink;
  }

  navigateTo() {
    this.router.navigate([this.getPageRedirect()]);
  }
}
