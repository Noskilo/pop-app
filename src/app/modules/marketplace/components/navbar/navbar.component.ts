import { Component, OnInit } from "@angular/core";
import {
  AllProductsGQL,
  SearchProductsGQL
} from "../../../../../generated/graphql";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  menuItems: {
    label: string;
    link?: string;
  }[] = [
    {
      label: "Stores",
      link: "/stores"
    },
    {
      label: "Support"
    },
    {
      label: "Login",
      link: "/login"
    }
  ];

  searchValue: string;

  constructor(private searchProducts: SearchProductsGQL) {}

  ngOnInit() {}

  submitSearch() {
    if (this.searchValue && this.searchValue.length > 3) {
      this.searchProducts
        .fetch({
          search: this.searchValue
        })
        .subscribe(response => {
          console.log(response.data.products);
        });
    }
  }
}
