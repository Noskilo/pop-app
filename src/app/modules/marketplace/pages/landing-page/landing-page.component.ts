import { Component, OnInit } from "@angular/core";
import {
  RootCategoriesGQL,
  Product,
  Category
} from "../../../../../generated/graphql";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Image } from "../../../../../generated/graphql";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
  rootCategories$: Observable<
    ({
      __typename?: "Category";
    } & Pick<Category, "id" | "title"> & {
        products: ({
          __typename?: "Product";
        } & Pick<Product, "name"> & {
            images: ({
              __typename?: "Image";
            } & Pick<Image, "imageUrl">)[];
          })[];
      })[]
  >;
  constructor(private rootCategories: RootCategoriesGQL) {}

  ngOnInit() {
    this.rootCategories$ = this.rootCategories
      .fetch()
      .pipe(map(response => response.data.categories));
  }
}
