import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.scss"]
})
export class StarRatingComponent implements OnInit {
  @Input() rating = 0;

  constructor() {}

  ngOnInit() {}

  starType(index: number) {
    if (index <= Math.floor(this.rating)) {
      return ["fas", "star"];
    } else if (index === Math.ceil(this.rating)) {
      return ["fas", "star-half-alt"];
    } else {
      return ["far", "star"];
    }
  }
}
