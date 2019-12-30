import { FixedAspectRatioDirective } from "./fixed-aspect-ratio.directive";
import { ElementRef } from "@angular/core";

class MockElementRef extends ElementRef {
  constructor() {
    super(undefined);
  }
  // nativeElement = {};
}

describe("FixedAspectRatioDirective", () => {
  it("should create an instance", () => {
    const directive = new FixedAspectRatioDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
