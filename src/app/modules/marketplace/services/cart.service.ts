import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Carted } from "../../../../generated/graphql";

@Injectable()
export class CartService {
  private carted = new BehaviorSubject<Carted[]>([]);
  public cartedSubject = this.carted.asObservable();

  constructor() {}

  addItem(item: Carted) {
    const items = this.carted.value;
    let found = false;

    items.forEach((existingItem, i) => {
      if (existingItem.skuId === item.skuId) {
        items[i].itemQuantity += Number(item.itemQuantity);

        this.carted.next(items);
        found = true;
        return;
      }
    });

    if (!found) {
      items.push(item);
      this.carted.next(items);
    }
  }

  get currentCartedItems() {
    return this.carted.value;
  }
}
