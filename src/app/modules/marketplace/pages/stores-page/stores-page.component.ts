import { Component, OnInit } from "@angular/core";
import { SearchStoresGQL, Store } from "../../../../../generated/graphql";

@Component({
  selector: "app-stores-page",
  templateUrl: "./stores-page.component.html",
  styleUrls: ["./stores-page.component.scss"]
})
export class StoresPageComponent implements OnInit {
  stores: Store[] = [];
  loading = true;

  constructor(private searchStores: SearchStoresGQL) {}

  ngOnInit() {
    this.loading = true;
    this.searchStores.fetch().subscribe(response => {
      this.stores = response.data.stores;
      this.loading = false;
    });
  }

  search(value: string) {
    this.loading = true;
    this.searchStores
      .fetch({
        search: value
      })
      .subscribe(response => {
        this.stores = response.data.stores;
        this.loading = false;
      });
  }
}
