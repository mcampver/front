import { Component, Input, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'ai-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['toggle-theme.component.scss'],
})
export class ToggleThemeComponent implements OnInit {
  @Input() theme: boolean | undefined;
  @Input() overlay?: OverlayContainer;
  currentTheme = 'corporate';
  themeClass = {
    'ai-toggle-switcher': true,
    'ai-toggle-switcher-light': this.currentTheme !== 'corporate',
    'ai-toggle-switcher-dark': this.currentTheme !== 'dark',
  };

  @Input() changeThemeFunction: (state: string) => void = () =>
    console.log('No hay funcion');

  ngOnInit(): void {
    this.loadTheme();
  }

  /**
   * Switch between themes light and dark.
   */
  changeTheme(): void {
    localStorage.setItem('theme', this.toggleStringTheme(this.currentTheme));
    this.currentTheme = this.toggleStringTheme(this.currentTheme);

    this.themeClass['ai-toggle-switcher-light'] = this.currentTheme === 'dark';
    this.themeClass['ai-toggle-switcher-dark'] =
      this.currentTheme === 'corporate';

    this.changeThemeFunction(`${this.currentTheme}-theme`);

    this.overlay
      ?.getContainerElement()
      .classList.add(`${this.currentTheme}-theme`);

    this.overlay
      ?.getContainerElement()
      .classList.remove(`${this.toggleStringTheme(this.currentTheme)}-theme`);
  }

  toggleStringTheme(theme: string): string {
    return theme === 'dark' ? 'corporate' : 'dark';
  }

  /**
   * Load the @theme from local storage
   */
  loadTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.changeTheme();
    }
  }
}
