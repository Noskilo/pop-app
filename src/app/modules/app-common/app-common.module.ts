import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FixedAspectRatioDirective } from "./directives/fixed-aspect-ratio.directive";
import { IntOnlyDirective } from "./directives/int-only.directive";

@NgModule({
  declarations: [FixedAspectRatioDirective, IntOnlyDirective],
  imports: [CommonModule],
  exports: [FixedAspectRatioDirective, IntOnlyDirective]
})
export class AppCommonModule {}
