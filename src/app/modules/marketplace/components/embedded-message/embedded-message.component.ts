import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-embedded-message",
  templateUrl: "./embedded-message.component.html",
  styleUrls: ["./embedded-message.component.scss"],
  animations: [
    trigger("flyInOut", [
      state(
        "in",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),
      transition("void => *", [
        style({ transform: "translateX(-50%)", opacity: 0 }),
        group([
          animate("0.3s ease"),
          animate(
            "500ms ease",
            style({
              opacity: 1
            })
          )
        ])
      ]),
      transition("* => void", [
        group([
          animate(
            "500ms ease",
            style({
              transform: "translateX(50%)"
            })
          ),
          animate(
            "300ms ease",
            style({
              opacity: 0
            })
          )
        ])
      ])
    ]),
    trigger("pop", [
      transition(":increment", [
        style({ transform: "scale(1)", opacity: 1 }),
        animate(
          "800ms ease-out",
          keyframes([
            style({ transform: "scale(1.0)", offset: 0 }),
            style({ transform: "scale(1.1)", offset: 0.7 }),
            style({ transform: "scale(0.95)", offset: 0.8 }),
            style({ transform: "scale(1.05)", offset: 0.9 }),
            style({ transform: "scale(0.98)", offset: 0.95 }),
            style({ transform: "scale(1.0)", offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class EmbeddedMessageComponent implements OnInit {
  @Input() message: string;
  @Input() pop = 0;

  constructor() {}

  ngOnInit() {}
}
