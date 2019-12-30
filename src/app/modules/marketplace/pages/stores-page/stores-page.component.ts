import { Component, OnInit } from "@angular/core";
import { SearchStoresGQL, Store } from "../../../../../generated/graphql";

@Component({
  selector: "app-stores-page",
  templateUrl: "./stores-page.component.html",
  styleUrls: ["./stores-page.component.scss"]
})
export class StoresPageComponent implements OnInit {
  stores: Store[] = [];

  constructor(private searchStores: SearchStoresGQL) {}

  ngOnInit() {
    this.searchStores.fetch().subscribe(response => {
      this.stores = response.data.stores;
    });
  }
}
