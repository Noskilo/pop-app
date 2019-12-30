import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  FaIconLibrary,
  FontAwesomeModule
} from "@fortawesome/angular-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faChevronLeft,
  faChevronRight,
  faEnvelope,
  faHeart,
  faHome,
  faLock,
  faSearch,
  faShoppingCart,
  faStar,
  faStarHalfAlt,
  faMoon,
  faTimes,
  faPlus,
  faSun,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { AppCommonModule } from "../app-common/app-common.module";
import { ActionBannerComponent } from "./components/action-banner/action-banner.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { CartButtonComponent } from "./components/cart-button/cart-button.component";
import { FavoriteButtonComponent } from "./components/favorite-button/favorite-button.component";
import { MegaMenuComponent } from "./components/mega-menu/mega-menu.component";
import { MegaSubMenuComponent } from "./components/mega-menu/mega-sub-menu/mega-sub-menu.component";
import { MegaMenuOverlayService } from "./components/mega-menu/service/mega-menu-overlay.service";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";
import { StoreChipComponent } from "./components/store-chip/store-chip.component";
import { MarketplaceRoutingModule } from "./marketplace-routing.module";
import { MarketplaceComponent } from "./marketplace.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { ProductPageComponent } from "./pages/product-page/product-page.component";
import { MatRadioModule } from "@angular/material/radio";
import { CartService } from "./services/cart.service";
import { DarkToggleComponent } from "./components/dark-toggle/dark-toggle.component";
import { StoresPageComponent } from './pages/stores-page/stores-page.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  entryComponents: [MegaSubMenuComponent],
  declarations: [
    MarketplaceComponent,
    NavbarComponent,
    ActionBannerComponent,
    LandingPageComponent,
    CartButtonComponent,
    FavoriteButtonComponent,
    MegaMenuComponent,
    MegaSubMenuComponent,
    CarouselComponent,
    ProductCardComponent,
    StarRatingComponent,
    StoreChipComponent,
    ProductPageComponent,
    DarkToggleComponent,
    StoresPageComponent,
    StoreCardComponent,
    LoginPageComponent
  ],
  imports: [
    AppCommonModule,
    CommonModule,
    MarketplaceRoutingModule,
    MatRippleModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  providers: [MegaMenuOverlayService, CartService]
})
export class MarketplaceModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      ...[
        faSearch,
        faTimes,
        faShoppingCart,
        faHeart,
        faChevronRight,
        faChevronLeft,
        faLock,
        faBars,
        faEnvelope,
        faHome,
        faStar,
        farStar,
        faStarHalfAlt,
        faPlus,
        faMinus,
        faMoon,
        faSun
      ]
    );
  }
}
