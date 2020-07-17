import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import {
  AllProductsGQL,
  SearchProductsGQL
} from "../../../../../generated/graphql";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuItems: {
    label: string;
    link?: string;
    icon?: string;
  }[] = [
    {
      label: "Stores",
      link: "/stores"
    },
    {
      label: "Support",
      link: "/support"
    },
    {
      label: "Login",
      link: "/login"
    }
  ];

  searchValue: string;
  loggedIn = false;

  authSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.loginStateObservable.subscribe(loggedIn => {
      this.loggedIn = loggedIn;

      if (loggedIn) {
        this.menuItems = this.menuItems.filter(item => item.label !== "Login");
      } else {
        const loginButton = this.menuItems.find(item => item.label === "Login");
        if (!loginButton) {
          this.menuItems.push({
            label: "Login",
            link: "/login"
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  submitSearch() {
    this.router.navigate(["/products"], {
      queryParams: {
        search: this.searchValue
      }
    });
  }
}
