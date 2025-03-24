import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Output, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {
  isExpanded = false;
  showUserMenu = false;

  @Output() isExpandedSidebar = new EventEmitter<boolean>();
  @Output() menuItemSelected = new EventEmitter<MenuItem>();

  menuItems: MenuItem[] = [
    { id: 0, label: 'Home', icon: 'home', routerLink: '' },
    { id: 1, label: 'List Games', icon: 'list', routerLink: '/list-games' },
    { id: 2, label: 'Register Games', icon: 'file-plus', routerLink: '/register-games' },
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

  /**
   * Expande a sidebar.
   */
  expandSidebar() {
    this.isExpanded = true;
    this.emitIsExpandedSidebar();
  }

  /**
   * Colapsa a sidebar.
   */
  collapseSidebar() {
    this.isExpanded = false;
    this.emitIsExpandedSidebar();
  }

  /**
   * Alterna o menu do usuário.
   */
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  /**
   * Emite o evento de expansão da sidebar.
   */
  emitIsExpandedSidebar() {
    this.isExpandedSidebar.emit(this.isExpanded);
  }

  /**
   * Emite o evento de seleção de item do menu.
   */
  emitMenuItemSelected(menuItem: MenuItem) {
    this.menuItemSelected.emit(menuItem);
  }
}
