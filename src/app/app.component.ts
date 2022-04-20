import { Component } from '@angular/core';
import { ThemeService, ThemeType } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme: string = ThemeType.Light;
  isLightMode: boolean = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.theme;
    this.isLightMode = this.theme === ThemeType.Light ? true : false;
  }

  onAlternateTheme() {
    this.themeService.theme === ThemeType.Light
      ? this.themeService.addThemeDark()
      : this.themeService.addThemeLight();
    this.theme = this.themeService.theme;
    this.isLightMode = this.theme === ThemeType.Light ? true : false;
  }
}
