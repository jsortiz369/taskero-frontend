import { HostListener, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly darkMode = signal(false);
  private readonly showMenu = signal(false);
  private readonly visibleMenu = signal(false);

  constructor() {}

  get darkMode$() {
    return this.darkMode;
  }

  get showMenu$() {
    return this.showMenu;
  }

  get visibleMenu$() {
    return this.visibleMenu;
  }

  onResize(event?: any) {
    const width = event?.target?.innerWidth ?? window.innerWidth;
    if (width < 768) {
      this.showMenu.set(false);
    } else {
      this.showMenu.set(true);
      this.visibleMenu.set(false);
    }

    this.validateMenu();
  }

  toggleDarkMode() {
    if (document.documentElement.classList.contains('app-dark')) {
      document.documentElement.classList.remove('app-dark');
      this.darkMode.set(false);
    } else {
      document.documentElement.classList.add('app-dark');
      this.darkMode.set(true);
    }
  }

  toggleMenu() {
    this.visibleMenu.set(!this.visibleMenu());
    this.validateMenu();
  }

  private validateMenu() {
    document.body.style.overflow = this.visibleMenu() ? 'hidden' : 'auto';
  }
}
