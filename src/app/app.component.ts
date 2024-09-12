import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class AppComponent {
  isExpandedSidebar = false;
  menuItemSelected!: MenuItem;

  receiveIsExpandedSidebar($event: boolean) {
    console.log("isExpandedSidebar", $event);
    this.isExpandedSidebar = $event;
  }

  receiveMenuItemSelected(event: MenuItem) {
    this.menuItemSelected = event;
  }
}
