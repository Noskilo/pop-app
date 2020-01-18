import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product, SearchProductsGQL } from "../../../../../generated/graphql";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-products-page",
  templateUrl: "./products-page.component.html",
  styleUrls: ["./products-page.component.scss"]
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  queryParamsSub: Subscription;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productSearch: SearchProductsGQL
  ) {}

  ngOnInit() {
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      const search = params["search"];
      this.loading = true;
      this.productSearch
        .fetch({
          search: search
        })
        .pipe(
          map(response => {
            return response.data.products as Product[];
          })
        )
        .subscribe(products => {
          this.products = products;
          this.loading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
  }
}
