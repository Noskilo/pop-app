import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  animations: [
    trigger("expandRight", [
      state(
        "in",
        style({
          opacity: 1,
          width: "15rem"
        })
      ),
      state(
        "out",
        style({
          opacity: 0,
          width: "0rem",
          display: "none"
        })
      ),
      transition("out => in", [
        style({ display: "block" }),
        animate("0.3s ease")
      ]),
      transition("in => out", [animate("0.3s ease")])
    ])
  ]
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  state = "out";

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      test: [false]
    });
  }

  toggle() {
    if (this.state === "in") {
      this.state = "out";
    } else {
      this.state = "in";
    }
  }

  show() {
    this.state = "in";
  }

  hide() {
    this.state = "out";
  }
}
