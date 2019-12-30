import { IntOnlyDirective } from "./int-only.directive";
import { ElementRef } from "@angular/core";

class MockElementRef extends ElementRef {
  constructor() {
    super(undefined);
  }
  // nativeElement = {};
}
describe("IntOnlyDirective", () => {
  it("should create an instance", () => {
    const directive = new IntOnlyDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
