import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import {
  trigger,
  transition,
  style,
  animate,
  keyframes
} from "@angular/animations";

@Component({
  selector: "app-cart-button",
  templateUrl: "./cart-button.component.html",
  styleUrls: ["./cart-button.component.scss"],
  animations: [
    trigger("pop", [
      transition(":increment", [
        style({ transform: "scale(1) translate(30%, 50%)", opacity: 1 }),
        animate(
          "300ms ease-out",
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
export class CartButtonComponent implements OnInit, OnDestroy {
  count = 0;
  cartSub: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSub = this.cartService.cartedSubject
      .pipe(
        map(items =>
          items.length > 0
            ? items
                .map(item => item.itemQuantity)
                .reduce((total, quantity) => total + quantity)
            : 0
        )
      )
      .subscribe(count => (this.count = count));
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
}
