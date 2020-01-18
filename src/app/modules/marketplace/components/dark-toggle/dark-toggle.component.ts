import { Component, OnInit, Renderer2 } from "@angular/core";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-dark-toggle",
  templateUrl: "./dark-toggle.component.html",
  styleUrls: ["./dark-toggle.component.scss"]
})
export class DarkToggleComponent implements OnInit {
  constructor(public theme: ThemeService) {}

  ngOnInit() {}
}
