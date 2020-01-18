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
  @Input() product: Product;

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
