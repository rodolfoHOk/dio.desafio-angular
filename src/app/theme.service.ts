import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

export enum ThemeType {
  Light = 'Light',
  Dark = 'Dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private overlayContainer: OverlayContainer) {
    this.addTheme(this.theme);
  }

  get theme(): ThemeType {
    const theme = localStorage.getItem('theme');

    if (theme === ThemeType.Dark) {
      return ThemeType.Dark;
    }

    return ThemeType.Light;
  }

  set theme(theme: ThemeType) {
    localStorage.setItem('theme', theme);
  }

  private addTheme(theme: ThemeType): void {
    const overlayClassList =
      this.overlayContainer.getContainerElement().classList;
    const themesRemove = Array.from(overlayClassList).filter(
      (element: string) => element.includes('-theme')
    );

    if (themesRemove.length) {
      overlayClassList.remove(...themesRemove);
      document.body.classList.remove(...themesRemove);
    }

    overlayClassList.add(theme.toLowerCase() + '-theme');
    document.body.classList.add(theme.toLowerCase() + '-theme');

    this.theme = theme;
  }

  addThemeLight = (): void => this.addTheme(ThemeType.Light);

  addThemeDark = (): void => this.addTheme(ThemeType.Dark);
}
