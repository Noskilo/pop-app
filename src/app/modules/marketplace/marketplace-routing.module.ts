import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MarketplaceComponent } from "./marketplace.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { ProductPageComponent } from "./pages/product-page/product-page.component";
import { StoresPageComponent } from "./pages/stores-page/stores-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { ProductsPageComponent } from "./pages/products-page/products-page.component";
import { StorePageComponent } from "./pages/store-page/store-page.component";

const routes: Routes = [
  {
    path: "",
    component: MarketplaceComponent,
    children: [
      {
        path: "",
        component: LandingPageComponent
      },
      {
        path: "product/:id",
        component: ProductPageComponent
      },
      {
        path: "products",
        component: ProductsPageComponent
      },
      {
        path: "store/:id",
        component: StorePageComponent
      },
      {
        path: "stores",
        component: StoresPageComponent
      },
      {
        path: "login",
        component: LoginPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule {}
