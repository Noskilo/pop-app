import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import {
  FaIconLibrary,
  FontAwesomeModule
} from "@fortawesome/angular-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCaretDown,
  faChevronLeft,
  faChevronRight,
  faClipboardList,
  faEnvelope,
  faExclamationTriangle,
  faHeart,
  faHome,
  faLock,
  faMinus,
  faMoon,
  faPlus,
  faSearch,
  faShoppingCart,
  faSignOutAlt,
  faSlidersH,
  faStar,
  faStarHalfAlt,
  faSun,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { AppCommonModule } from "../app-common/app-common.module";
import { ActionBannerComponent } from "./components/action-banner/action-banner.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { CartButtonComponent } from "./components/cart-button/cart-button.component";
import { DarkToggleComponent } from "./components/dark-toggle/dark-toggle.component";
import { DropDownItemComponent } from "./components/drop-down/drop-down-item/drop-down-item.component";
import { DropDownComponent } from "./components/drop-down/drop-down.component";
import { EmbeddedMessageComponent } from "./components/embedded-message/embedded-message.component";
import { FavoriteButtonComponent } from "./components/favorite-button/favorite-button.component";
import { MegaMenuComponent } from "./components/mega-menu/mega-menu.component";
import { MegaSubMenuComponent } from "./components/mega-menu/mega-sub-menu/mega-sub-menu.component";
import { MegaMenuOverlayService } from "./components/mega-menu/service/mega-menu-overlay.service";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";
import { StoreCardComponent } from "./components/store-card/store-card.component";
import { StoreChipComponent } from "./components/store-chip/store-chip.component";
import { UserMenuComponent } from "./components/user-menu/user-menu.component";
import { MarketplaceRoutingModule } from "./marketplace-routing.module";
import { MarketplaceComponent } from "./marketplace.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { ProductPageComponent } from "./pages/product-page/product-page.component";
import { ProductsPageComponent } from "./pages/products-page/products-page.component";
import { StorePageComponent } from "./pages/store-page/store-page.component";
import { StoresPageComponent } from "./pages/stores-page/stores-page.component";
import { CartService } from "./services/cart.service";
import { ThemeService } from "./services/theme.service";
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';

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
    LoginPageComponent,
    EmbeddedMessageComponent,
    UserMenuComponent,
    DropDownComponent,
    DropDownItemComponent,
    ProductsPageComponent,
    StorePageComponent,
    HamburgerMenuComponent
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
  providers: [MegaMenuOverlayService, CartService, ThemeService]
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
        faSignOutAlt,
        faClipboardList,
        faExclamationTriangle,
        faSun,
        faCaretDown,
        faSlidersH
      ]
    );
  }
}
