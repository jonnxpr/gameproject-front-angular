import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { MenuItem } from './models/menu-item.model';
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isExpandedSidebar = false;
  menuItemSelected!: MenuItem;

  ngOnInit() {
    this.menuItemSelected = { id: 0, label: 'Home', icon: 'home', routerLink: '' };
  }

  receiveIsExpandedSidebar($event: boolean) {
    this.isExpandedSidebar = $event;
  }

  receiveMenuItemSelected(event: MenuItem) {
    this.menuItemSelected = event;
  }
}
