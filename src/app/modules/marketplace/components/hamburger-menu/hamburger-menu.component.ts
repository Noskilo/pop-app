import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DropDownComponent } from "../drop-down/drop-down.component";

@Component({
  selector: "app-hamburger-menu",
  templateUrl: "./hamburger-menu.component.html",
  styleUrls: ["./hamburger-menu.component.scss"]
})
export class HamburgerMenuComponent implements OnInit {
  @Input() items: {
    label: string;
    link?: string;
  }[] = [];

  @Input() reference: HTMLElement;
  @ViewChild("menu", { static: false })
  menu: DropDownComponent;

  constructor() {}

  ngOnInit() {}

  show() {
    this.menu.show();
  }

  hide() {
    this.menu.hide();
  }
}
