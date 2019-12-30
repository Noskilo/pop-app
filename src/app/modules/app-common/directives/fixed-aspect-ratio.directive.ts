import { Directive, Input, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appFixedAspectRatio]"
})
export class FixedAspectRatioDirective implements OnInit {
  @Input("ratio") ratio: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.paddingTop = this.convertRatioToPadding() + "%";
  }

  private convertRatioToPadding(): number {
    if (isNaN(Number(this.ratio))) {
      const items = (this.ratio as string).split(":");
      if (items.length === 2) {
        const height = Number(items[1]);
        const width = Number(items[0]);
        if (!isNaN(height) && !isNaN(width)) {
          return (height / width) * 100;
        }
      }

      console.error(
        "Invalid ratio! Must be a number or a standard ratio string. (i.e 16:9)"
      );
    } else {
      return Number(this.ratio) * 100;
    }

    return 56.25;
  }
}
