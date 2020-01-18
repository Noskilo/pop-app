import {
  Injectable,
  PLATFORM_ID,
  Inject,
  Renderer2,
  RendererFactory2
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class ThemeService {
  private _darkMode = false;
  private renderer: Renderer2;

  constructor(
    @Inject(PLATFORM_ID) private platform: any,
    private rendererFactory: RendererFactory2
  ) {
    if (isPlatformBrowser(this.platform)) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
      const darkMode = JSON.parse(localStorage.getItem("darkMode"));

      if (darkMode) {
        this._darkMode = true;
        this.renderer.addClass(document.body, "dark-theme");
      }
    }
  }
  toggleDarkMode() {
    if (this.darkMode) {
      this.renderer.removeClass(document.body, "dark-theme");
      localStorage.setItem("darkMode", "false");
      this._darkMode = false;
    } else {
      this.renderer.addClass(document.body, "dark-theme");
      localStorage.setItem("darkMode", "true");
      this._darkMode = true;
    }
  }

  get darkMode() {
    return this._darkMode;
  }
}
