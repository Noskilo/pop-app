import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-cart-button",
  templateUrl: "./cart-button.component.html",
  styleUrls: ["./cart-button.component.scss"]
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
