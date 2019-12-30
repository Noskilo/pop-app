import { Component, OnInit, Input } from "@angular/core";
import { Image, Store } from "../../../../../generated/graphql";

@Component({
  selector: "app-store-chip",
  templateUrl: "./store-chip.component.html",
  styleUrls: ["./store-chip.component.scss"]
})
export class StoreChipComponent implements OnInit {
  @Input() store: {
    __typename?: "Store";
    logo: {
      __typename?: "Image";
    } & Pick<Image, "imageUrl">;
  } & Pick<Store, "name">;

  constructor() {}

  ngOnInit() {}
}
