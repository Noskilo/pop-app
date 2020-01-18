import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { AttributeGroup, Category } from "src/generated/graphql";
import {
  Attribute,
  Carted,
  Product,
  ProductGQL
} from "../../../../../generated/graphql";
import { CartService } from "../../services/cart.service";

enum MessageType {
  Success,
  Error,
  Info
}

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"]
})
export class ProductPageComponent implements OnInit {
  product: Product;
  depthCategories: Pick<Category, "title">[] = [];
  flatCategories: Category[][] = [];

  attributeChoices: AttributeGroup[] = [];

  cartForm: FormGroup;

  message: {
    content: string;
    type: MessageType;
  };

  constructor(
    private meta: Meta,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productQuery: ProductGQL,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const paramMap = this.route.snapshot.paramMap;

    if (paramMap.has("id")) {
      const id = paramMap.get("id");
      this.productQuery
        .fetch({
          id: id
        })
        .subscribe(response => {
          this.product = response.data.product as Product;

          this.meta.updateTag({
            name: "Description",
            content: this.product.description
          });

          this.depthCategories = [];
          this.flatCategories = [];
          this.product.categories.forEach(category => {
            this.flatCategories.push(this.traverse(category));
          });

          this.extractDepthCategories(this.product.categories);

          const uniqueGroups: {
            [key: string]: Pick<AttributeGroup, "id" | "name">;
          } = {};

          const uniqueAttributes: {
            [key: string]: Attribute;
          } = {};
          this.product.skus.forEach(sku => {
            sku.attributes.forEach(attribute => {
              uniqueGroups[attribute.attributeGroup.id] =
                attribute.attributeGroup;
              uniqueAttributes[attribute.id] = attribute;
            });
          });

          let cartFormConfig = {
            quantity: [1, Validators.required]
          };

          for (let key in uniqueGroups) {
            if (uniqueGroups.hasOwnProperty(key)) {
              const attributeGroup = uniqueGroups[key] as AttributeGroup;
              const attributes = [];

              for (let attributeKey in uniqueAttributes) {
                if (uniqueAttributes.hasOwnProperty(attributeKey)) {
                  const attribute = uniqueAttributes[attributeKey];

                  if (attribute.attributeGroup.id === attributeGroup.id) {
                    attributes.push(attribute);
                  }
                }
              }

              attributeGroup.attributes = attributes;
              this.attributeChoices.push(attributeGroup);

              cartFormConfig[`group${key}`] = [null, Validators.required];
            }
          }

          this.cartForm = this.fb.group(cartFormConfig);
        });
    }
  }

  private extractDepthCategories(categories: any[]) {
    categories.forEach(category => {
      if (category.children && category.children.length > 0) {
        this.extractDepthCategories(category.children);
      } else {
        this.depthCategories.push(category);
      }
    });
  }

  private traverse(node: Category, path: Category[] = []) {
    if (node.children && node.children.length > 0) {
      return path.concat(
        ...[node],
        ...node.children.map(child => this.traverse(child, path))
      );
    } else {
      return path.concat(...[node]);
    }
  }

  increment() {
    let quantityControl = this.cartForm.get("quantity");
    quantityControl.setValue(Number(quantityControl.value) + 1);
  }

  decrement() {
    let quantityControl = this.cartForm.get("quantity");
    if (quantityControl.value > 1) {
      quantityControl.setValue(Number(quantityControl.value) - 1);
    }
  }

  addToCart() {
    const item: Carted = {
      id: null,
      product: null,
      sku: null,
      skuId: "1",
      productId: this.product.id,
      itemQuantity: Number(this.cartForm.get("quantity").value)
    };

    this.cartService.addItem(item);

    this.message = {
      content: "Added to cart!",
      type: MessageType.Success
    };
  }
}
