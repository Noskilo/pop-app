import { OverlayRef } from "@angular/cdk/overlay";
import { Component, ElementRef, OnInit, HostListener } from "@angular/core";
import { Category, CategoryTreeGQL } from "../../../../../generated/graphql";
import { MegaMenuOverlayService } from "./service/mega-menu-overlay.service";
import { MegaSubMenuComponent } from "./mega-sub-menu/mega-sub-menu.component";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Subscription } from "rxjs";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";

@Component({
  selector: "app-mega-menu",
  templateUrl: "./mega-menu.component.html",
  styleUrls: ["./mega-menu.component.scss"],
  animations: [
    trigger("wave", [
      state("start", style({ backgroundPosition: "0% 0%" })),
      state("end", style({ backgroundPosition: "100% 0%" })),
      transition("* <=> *", [animate("2s ease-in-out")])
    ])
  ]
})
export class MegaMenuComponent implements OnInit {
  categories: Pick<Category, "title" | "productCount" | "id">[];
  overlayRef: OverlayRef;
  navSub: Subscription;

  loading = true;
  placeholders = new Array(10).fill(0);
  waveState = "start";
  constructor(
    private router: Router,
    private megaMenuOverlay: MegaMenuOverlayService,
    private categoryTree: CategoryTreeGQL
  ) {}

  ngOnInit() {
    this.navSub = this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationStart)) {
        return;
      }
      this.closeAll();
    });

    this.categoryTree.fetch().subscribe(response => {
      this.categories = response.data.categories;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.navSub.unsubscribe();
  }

  repeatWave(event) {
    this.waveState === "start"
      ? (this.waveState = "end")
      : (this.waveState = "start");
  }

  @HostListener("window:scroll")
  public onScroll() {
    this.closeAll();
  }

  open(
    reference: ElementRef,
    parent: Pick<Category, "title" | "productCount" | "id" | "children">
  ) {
    this.closeAll();
    if (parent.productCount > 0) {
      this.megaMenuOverlay.createOverlay(
        MegaSubMenuComponent,
        reference,
        parent.id,
        parent.children,
        1
      );
    }
  }

  close(parent: Pick<Category, "title" | "productCount" | "id">) {
    this.megaMenuOverlay.destroyOverlay(parent.id);
  }

  closeAll() {
    this.megaMenuOverlay.destroyAllOverlays();
  }

  isActive(parentId: string): boolean {
    return this.megaMenuOverlay.isActive(parentId);
  }

  mouseAway() {
    this.megaMenuOverlay.removePointer();
  }

  mouseEnter() {
    this.megaMenuOverlay.addPointer();
  }
}
