import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApolloModule } from "apollo-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GraphQLModule } from "./graphql.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
