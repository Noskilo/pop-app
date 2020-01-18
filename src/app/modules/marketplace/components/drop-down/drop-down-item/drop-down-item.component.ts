import { Component, OnInit, Input } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-drop-down-item",
  templateUrl: "./drop-down-item.component.html",
  styleUrls: ["./drop-down-item.component.scss"]
})
export class DropDownItemComponent implements OnInit {
  @Input() divider = false;
  @Input() disabled = false;
  @Input() routerLink: RouterLink;

  @Input() icon: IconProp;

  constructor(private router: Router) {}

  ngOnInit() {}

  trigger() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
