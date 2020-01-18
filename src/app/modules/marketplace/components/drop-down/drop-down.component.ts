import { OverlayRef, OverlayConfig, Overlay } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  HostListener
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group
} from "@angular/animations";

@Component({
  selector: "app-drop-down",
  templateUrl: "./drop-down.component.html",
  styleUrls: ["./drop-down.component.scss"],
  animations: [
    trigger("flyDown", [
      state(
        "in",
        style({
          transform: "translateY(0)",
          opacity: 1
        })
      ),
      transition("void => *", [
        style({ transform: "translateY(-50%)", opacity: 0 }),
        group([
          animate("0.3s ease"),
          animate(
            "500ms ease",
            style({
              opacity: 1
            })
          )
        ])
      ])
    ])
  ]
})
export class DropDownComponent implements OnInit {
  @Input() reference: HTMLElement;
  @Input() matchWidth = false;
  @ViewChild("menu", { static: false })
  templatePortalContent: TemplateRef<any>;

  overlayRef: OverlayRef;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {}

  ngOnInit() {}

  @HostListener("window:scroll")
  onScroll() {
    this.hide();
  }

  @HostListener("window:resize")
  onResize() {
    this.hide();
    this.syncWidth();
  }

  private syncWidth() {
    if (!this.overlayRef || !this.matchWidth) {
      return;
    }

    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }

  show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(
      new TemplatePortal(this.templatePortalContent, this.viewContainerRef)
    );

    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => {
      this.hide();
    });
  }

  hide() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top"
        },
        {
          originX: "start",
          originY: "top",
          overlayX: "start",
          overlayY: "bottom"
        }
      ]);

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      hasBackdrop: true
    });
  }
}
