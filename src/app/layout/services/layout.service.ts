import { HostListener, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly darkMode = signal(false);
  private readonly showMenu = signal(false);
  private readonly visibleMenu = signal(false);

  readonly theme$ = new BehaviorSubject<'dark' | 'light'>('light');

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
      this.showMenu.set(true);
      this.visibleMenu.set(false);
    } else {
      this.showMenu.set(false);
    }

    this.validateMenu();
  }

  toggleDarkMode() {
    if (document.documentElement.classList.contains('taskero-dark')) {
      document.documentElement.classList.remove('taskero-dark');
      this.darkMode.set(false);
      this.theme$.next('light');
    } else {
      document.documentElement.classList.add('taskero-dark');
      this.darkMode.set(true);
      this.theme$.next('dark');
    }
  }

  toggleMenu() {
    this.visibleMenu.set(!this.visibleMenu());
    this.validateMenu();
  }

  private validateMenu() {
    document.body.style.overflow = this.showMenu() && this.visibleMenu() ? 'hidden' : 'auto';
  }
}
