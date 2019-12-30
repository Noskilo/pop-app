import { Component, OnInit, Input } from "@angular/core";
import {
  Product,
  Image,
  PriceRange,
  Store
} from "../../../../../generated/graphql";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() product: Pick<Product, "id" | "name" | "sale" | "inStock"> & {
    images: ({
      __typename?: "Image";
    } & Pick<Image, "imageUrl">)[];
    priceRange: {
      __typename?: "PriceRange";
    } & Pick<PriceRange, "min" | "max">;
    store: {
      __typename?: "Store";
      logo: {
        __typename?: "Image";
      } & Pick<Image, "imageUrl">;
    } & Pick<Store, "name">;
  };

  imageStyle: any;
  storeStyle: any;

  constructor() {}

  ngOnInit() {
    this.imageStyle = {
      backgroundImage: `url(${this.product.images[0].imageUrl})`
    };

    this.storeStyle = {
      backgroundImage: `url(${this.product.store.logo.imageUrl})`
    };
  }
}
