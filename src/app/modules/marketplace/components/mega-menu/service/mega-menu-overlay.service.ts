import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import {
  ComponentPortal,
  ComponentType,
  PortalInjector
} from "@angular/cdk/portal";
import { ElementRef, Injectable, Injector } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { CONTAINER_DATA } from "../../../marketplace.component";
import { Category } from "src/generated/graphql";

export interface CategoryOverlay {
  depth: number;
  parentId: string;
  overlayRef: OverlayRef;
  detachmentSub: Subscription;
}

@Injectable()
export class MegaMenuOverlayService {
  private categoryOverlays: { [key: string]: CategoryOverlay } = {};
  private pointerTimerSub: Subscription;

  constructor(private overlay: Overlay, private injector: Injector) {}

  public updateOverlayPositions() {
    for (const key in this.categoryOverlays) {
      const categoryOverlay = this.categoryOverlays[key];
      categoryOverlay.overlayRef.updatePosition();
    }
  }

  removePointer() {
    this.pointerTimerSub = timer(800).subscribe(() => {
      this.destroyAllOverlays();
    });
  }

  addPointer() {
    if (this.pointerTimerSub) {
      this.pointerTimerSub.unsubscribe();
    }
  }

  createOverlay(
    component: ComponentType<any>,
    reference: ElementRef,
    parentId: string,
    children: ({
      __typename?: "Category";
    } & Pick<Category, "id" | "title" | "productCount" | "hasChildren">)[],
    depth: number
  ) {
    if (this.categoryOverlays[parentId]) {
      return;
    }
    const config = this.getOverlayConfig(reference);

    this.destroyOverlay(parentId);
    const overlayRef = this.overlay.create(config);

    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, {
      parentId,
      children: children || [],
      depth
    });

    const portalInjector = new PortalInjector(this.injector, injectorTokens);

    const componentPortal = new ComponentPortal(
      component,
      null,
      portalInjector
    );
    overlayRef.attach(componentPortal);

    const detachmentSub = overlayRef.detachments().subscribe(() => {
      this.destroyOverlay(parentId);
    });

    this.categoryOverlays[parentId] = {
      depth,
      parentId,
      overlayRef: overlayRef,
      detachmentSub
    };
  }

  destroyOverlay(parentId: string) {
    const categoryOverlay = this.categoryOverlays[parentId];

    if (categoryOverlay) {
      const depth = categoryOverlay.depth;

      for (const key in this.categoryOverlays) {
        if (this.categoryOverlays[key].depth > depth) {
          this.destroyOverlay(key);
        }
      }

      categoryOverlay.overlayRef.detach();
      categoryOverlay.overlayRef.dispose();

      if (categoryOverlay.detachmentSub)
        categoryOverlay.detachmentSub.unsubscribe();

      delete this.categoryOverlays[parentId];
    }
  }

  destroyAllOverlays() {
    for (const key in this.categoryOverlays) {
      const categoryOverlay = this.categoryOverlays[key];
      categoryOverlay.overlayRef.detach();
      categoryOverlay.overlayRef.dispose();
      categoryOverlay.detachmentSub.unsubscribe();
    }

    this.categoryOverlays = {};
  }

  isActive(parentId: string): boolean {
    return this.categoryOverlays[parentId] ? true : false;
  }

  private getOverlayConfig(reference: ElementRef): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(reference)
      .withPush(false)
      .withGrowAfterOpen(true)
      .withFlexibleDimensions(true)
      .withPositions([
        {
          originX: "end",
          originY: "top",
          overlayX: "start",
          overlayY: "top"
        },
        {
          originX: "end",
          originY: "bottom",
          overlayX: "start",
          overlayY: "bottom"
        }
      ]);

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      hasBackdrop: false,
      backdropClass: "cdk-overlay-transparent-backdrop"
    });
  }
}
