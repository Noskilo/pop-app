import { Component, OnInit, InjectionToken, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { Meta } from "@angular/platform-browser";

export const CONTAINER_DATA = new InjectionToken<{}>("CONTAINER_DATA");

@Component({
  selector: "app-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.scss"]
})
export class MarketplaceComponent implements OnInit, OnDestroy {
  year = new Date().getFullYear();
  navSub: Subscription;

  constructor(private router: Router, private meta: Meta) {}

  ngOnInit() {
    this.meta.addTag({
      name: "Description",
      content: "Connecting online shoppers with an assortment of local stores."
    });

    this.navSub = this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    this.navSub.unsubscribe();
  }
}
