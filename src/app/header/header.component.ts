import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { MenuItem } from '../models/menu-item.model';

/**
 * Componente responsável pelo cabeçalho da aplicação.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() itemMenu: MenuItem = { id: 0, label: 'Home', icon: 'home', routerLink: '' };

  constructor(private router: Router, private toastService: ToastService) { }

  /**
   * Retorna o link de redirecionamento da página.
   */
  getPageRedirect() {
    return this.itemMenu.routerLink;
  }

  /**
   * Navega para a rota especificada no item do menu.
   */
  navigateTo() {
    this.router.navigate([this.getPageRedirect()]).catch(err => {
      this.toastService.showError('Navigation error');
    });
  }
}
