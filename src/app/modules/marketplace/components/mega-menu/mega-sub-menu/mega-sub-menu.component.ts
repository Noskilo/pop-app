import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, ElementRef, Inject, OnInit } from "@angular/core";
import { Category } from "src/generated/graphql";
import { CONTAINER_DATA } from "../../../marketplace.component";
import { MegaMenuOverlayService } from "../service/mega-menu-overlay.service";

@Component({
  selector: "app-mega-sub-menu",
  templateUrl: "./mega-sub-menu.component.html",
  styleUrls: ["./mega-sub-menu.component.scss"],
  animations: [
    trigger("fade", [
      state("void", style({ opacity: 0.5, transform: "translateX(-5%)" })),
      state("fadeIn", style({ opacity: 1 })),
      transition("void => fadeIn", animate("400ms ease-out"))
    ])
  ]
})
export class MegaSubMenuComponent implements OnInit {
  children: ({
    __typename?: "Category";
  } & Pick<Category, "id" | "title" | "productCount" | "children">)[] = [];

  depth: number;

  constructor(
    @Inject(CONTAINER_DATA)
    public componentData: {
      parentId: number;
      depth: number;
      children: ({
        __typename?: "Category";
      } & Pick<Category, "id" | "title" | "productCount" | "children">)[];
    },
    private megaMenuOverlay: MegaMenuOverlayService
  ) {
    this.children = this.componentData.children;
  }

  ngOnInit() {
    this.depth = this.componentData.depth;
  }

  animationState(reverse?: boolean) {
    if (reverse) {
      return this.children.length > 0 ? "void" : "fadeIn";
    }
    return this.children.length > 0 ? "fadeIn" : "void";
  }

  open(
    reference: ElementRef,
    parent?: {
      __typename?: "Category";
    } & Pick<Category, "id" | "title" | "productCount" | "children">
  ) {
    this.children.forEach(category => this.close(category));
    if (parent.children && parent.productCount > 0) {
      this.megaMenuOverlay.createOverlay(
        MegaSubMenuComponent,
        reference,
        parent.id,
        parent.children,
        this.depth + 1
      );
    }
  }

  close(
    parent: {
      __typename?: "Category";
    } & Pick<Category, "id" | "title" | "productCount" | "children">
  ) {
    this.megaMenuOverlay.destroyOverlay(parent.id);
  }

  mouseAway() {
    this.megaMenuOverlay.removePointer();
  }

  mouseEnter() {
    this.megaMenuOverlay.addPointer();
  }

  isActive(parentId: string): boolean {
    return this.megaMenuOverlay.isActive(parentId);
  }
}
