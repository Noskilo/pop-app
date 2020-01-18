import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  keyframes
} from "@angular/animations";

@Component({
  selector: "app-favorite-button",
  templateUrl: "./favorite-button.component.html",
  styleUrls: ["./favorite-button.component.scss"],
  animations: [
    trigger("pop", [
      transition(":increment", [
        style({ transform: "scale(1) translate(30%, 50%)", opacity: 1 }),
        animate(
          "800ms ease-out",
          keyframes([
            style({ transform: "scale(1.0) translate(30%, 50%)", offset: 0 }),
            style({ transform: "scale(1.1) translate(30%, 50%)", offset: 0.7 }),
            style({
              transform: "scale(0.95) translate(30%, 50%)",
              offset: 0.8
            }),
            style({
              transform: "scale(1.05) translate(30%, 50%)",
              offset: 0.9
            }),
            style({
              transform: "scale(0.98) translate(30%, 50%)",
              offset: 0.95
            }),
            style({ transform: "scale(1.0) translate(30%, 50%)", offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class FavoriteButtonComponent implements OnInit {
  count = 0;
  constructor() {}

  ngOnInit() {}
}
