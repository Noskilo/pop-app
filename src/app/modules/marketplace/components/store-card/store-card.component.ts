import { Component, OnInit, Input } from "@angular/core";
import { Store } from "../../../../../generated/graphql";

@Component({
  selector: "app-store-card",
  templateUrl: "./store-card.component.html",
  styleUrls: ["./store-card.component.scss"]
})
export class StoreCardComponent implements OnInit {
  @Input() store: Store;

  constructor() {}

  ngOnInit() {}
}
