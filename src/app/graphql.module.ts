import { NgModule, Inject, PLATFORM_ID } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { environment } from "../environments/environment";
import { ApolloLink, concat } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpHeaders } from "@angular/common/http";
import { ServerError } from "apollo-link-http-common";
import { AuthService } from "./services/auth.service";
import { isPlatformBrowser } from "@angular/common";

const uri = environment.graphqlServer; // <-- add the URL of the GraphQL server here

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: []
})
export class GraphQLModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platform: any
  ) {
    const link = this.httpLink.create({ uri });

    const authMiddleware = new ApolloLink((operation, forward) => {
      if (isPlatformBrowser(this.platform)) {
        operation.setContext({
          headers: new HttpHeaders().set(
            "Authorization",
            "Bearer " + localStorage.getItem("authToken") || null
          )
        });
      }

      return forward(operation);
    });

    const errorMiddleware = onError(({ networkError, graphQLErrors }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case "UNAUTHENTICATED":
              this.authService.logout();
          }
        }
      }

      if (networkError) {
        if (networkError.hasOwnProperty("statusCode")) {
          const serverError = networkError as ServerError;
          if (serverError.statusCode === 401) {
            this.authService.logout();
          }
        }
      }
    });

    this.apollo.create({
      cache: new InMemoryCache(),
      link: errorMiddleware.concat(concat(authMiddleware, link))
    });
  }
}
