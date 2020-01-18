import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import {
  Product,
  Store,
  StoreGQL,
  StoreProductsGQL
} from "../../../../../generated/graphql";

@Component({
  selector: "app-store-page",
  templateUrl: "./store-page.component.html",
  styleUrls: ["./store-page.component.scss"]
})
export class StorePageComponent implements OnInit {
  store: Store;
  loading = true;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private storeGQL: StoreGQL,
    private storeProducts: StoreProductsGQL
  ) {}

  ngOnInit() {
    const storeId = this.route.snapshot.paramMap.get("id");

    this.storeGQL
      .fetch({
        id: storeId
      })
      .pipe(
        switchMap(response => {
          this.store = response.data.store as Store;

          return this.storeProducts
            .fetch({
              storeId: this.store.id
            })
            .pipe(map(response => response.data.products as Product[]));
        })
      )
      .subscribe(products => {
        this.products = products;
        this.loading = false;
      });
  }

  search(value: string) {
    this.loading = true;
    this.storeProducts
      .fetch({
        storeId: this.store.id,
        search: value
      })
      .pipe(map(response => response.data.products as Product[]))
      .subscribe(products => {
        this.products = products;
        this.loading = false;
      });
  }
}
