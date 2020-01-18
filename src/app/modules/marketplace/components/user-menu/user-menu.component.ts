import { Component, OnInit, ViewChild } from "@angular/core";
import { Image, MeGQL } from "../../../../../generated/graphql";
import { DropDownComponent } from "../drop-down/drop-down.component";
import { AuthService } from "../../../../services/auth.service";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {
  @ViewChild("menu", { static: false })
  menu: DropDownComponent;

  username: string;
  profileImage: Image;

  constructor(
    private me: MeGQL,
    private authService: AuthService,
    public theme: ThemeService
  ) {}

  ngOnInit() {
    this.me.fetch().subscribe(response => {
      if (response.data && response.data.me && response.data.me.username) {
        this.username = response.data.me.username;
      } else {
        this.username = "Unknown";
      }
    });
  }

  openMenu() {
    this.menu.show();
  }

  toggleDarkMode() {
    this.menu.hide();
    this.theme.toggleDarkMode();
  }

  logout() {
    this.menu.hide();
    this.authService.logout();
  }
}
