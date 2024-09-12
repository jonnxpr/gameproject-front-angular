import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private renderer: Renderer2;
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  showSuccess(message: string) {
    this.showToast('success', message);
  }

  showInfo(message: string) {
    this.showToast('info', message);
  }

  showError(message: string) {
    this.showToast('danger', message);
  }

  showWarning(message: string) {
    this.showToast('warning', message);
  }

  private async showToast(type: string, message: string) {
    if (!this.isBrowser) {
      return; // Não execute o código no servidor
    }

    const toastContainer = this.renderer.selectRootElement('#toast-container', true);
    if (!toastContainer) {
      console.error('Toast container element not found');
      return;
    }

    const toast = this.renderer.createElement('div');
    this.renderer.addClass(toast, 'toast');
    this.renderer.addClass(toast, 'align-items-center');
    this.renderer.addClass(toast, `text-bg-${type}`);
    this.renderer.addClass(toast, 'border-0');
    this.renderer.setAttribute(toast, 'role', 'alert');
    this.renderer.setAttribute(toast, 'aria-live', 'assertive');
    this.renderer.setAttribute(toast, 'aria-atomic', 'true');

    const toastHeader = this.renderer.createElement('div');
    this.renderer.addClass(toastHeader, 'toast-header');

    const strong = this.renderer.createElement('strong');
    this.renderer.addClass(strong, 'me-auto');
    this.renderer.setProperty(strong, 'innerText', type.charAt(0).toUpperCase() + type.slice(1));

    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'type', 'button');
    this.renderer.addClass(button, 'btn-close');
    this.renderer.setAttribute(button, 'data-bs-dismiss', 'toast');
    this.renderer.setAttribute(button, 'aria-label', 'Close');

    this.renderer.appendChild(toastHeader, strong);
    this.renderer.appendChild(toastHeader, button);

    const toastBody = this.renderer.createElement('div');
    this.renderer.addClass(toastBody, 'toast-body');
    this.renderer.setProperty(toastBody, 'innerText', message);

    this.renderer.appendChild(toast, toastHeader);
    this.renderer.appendChild(toast, toastBody);

    this.renderer.appendChild(toastContainer, toast);

    // Importando dinamicamente o Bootstrap Toast
    const { Toast } = await import('bootstrap');
    const bootstrapToast = new Toast(toast);
    bootstrapToast.show();
  }

}
