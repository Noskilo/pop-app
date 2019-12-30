import { Component, OnInit, Renderer2 } from "@angular/core";

@Component({
  selector: "app-dark-toggle",
  templateUrl: "./dark-toggle.component.html",
  styleUrls: ["./dark-toggle.component.scss"]
})
export class DarkToggleComponent implements OnInit {
  darkMode = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  toggleDarkMode() {
    if (this.darkMode) {
      this.renderer.removeClass(document.body, "dark-theme");
      this.darkMode = false;
    } else {
      this.renderer.addClass(document.body, "dark-theme");
      this.darkMode = true;
    }
  }
}
