import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  imports: [],
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.css',
})
export class MenuBar {
  isCollapsed = false;
  private wasExpandedByLogo = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const shouldCollapse = scrollTop > 24;

    if (!shouldCollapse) {
      this.wasExpandedByLogo = false;
      this.isCollapsed = false;
      return;
    }

    this.isCollapsed = !this.wasExpandedByLogo;
  }

  toggleCollapsedMenu(): void {
    if (!this.isCollapsed && !this.wasExpandedByLogo) {
      return;
    }

    this.wasExpandedByLogo = !this.wasExpandedByLogo;
    this.isCollapsed = !this.wasExpandedByLogo;
  }
}
