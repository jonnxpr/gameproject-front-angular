import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {
  isExpanded = false;
  showUserMenu = false;

  menuItems = [
    { label: 'Listar Jogos', icon: 'list' },
    { label: 'Cadastrar Jogos', icon: 'file-plus' },
    // { label: 'Profile', icon: 'home' },
    // { label: 'Settings', icon: 'home' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.listen('window', 'load', () => {
        feather.replace();
      });
    }
  }

  expandSidebar() {
    this.isExpanded = true;
  }

  collapseSidebar() {
    this.isExpanded = false;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
}
