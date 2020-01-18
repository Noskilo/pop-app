import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, catchError } from "rxjs/operators";
import {
  LoginGQL,
  LoginQuery,
  LoginQueryVariables
} from "../../generated/graphql";
import * as jwt_decode from "jwt-decode";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

export interface Token {
  uid: number;
  aud?: string;
  iss?: string;
  iat?: number;
  exp?: number;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: Token;
  private loginState = new BehaviorSubject(false);
  loginStateObservable = this.loginState.asObservable();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platform: any,
    private loginGQL: LoginGQL,
    private apollo: Apollo
  ) {
    if (isPlatformBrowser(platform)) {
      const authToken = localStorage.getItem("authToken");

      if (authToken) {
        this.token = jwt_decode(authToken);
        if (Date.now() >= this.token.exp * 1000) {
          this.logout();
        } else {
          this.loginState.next(true);
        }
      }
    }
  }

  login(username: string, password: string) {
    return this.apollo
      .query<LoginQuery, LoginQueryVariables>({
        query: this.loginGQL.document,
        fetchPolicy: "network-only",
        variables: {
          username: username,
          password: password
        }
      })
      .pipe(
        map(response => {
          if (response.data.login) {
            this.token = jwt_decode(response.data.login);

            if (isPlatformBrowser(this.platform)) {
              localStorage.setItem("authToken", response.data.login);
            }

            this.loginState.next(true);
            return true;
          }

          this.loginState.next(false);
          return false;
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platform)) {
      localStorage.removeItem("authToken");
    }

    this.token = null;
    this.loginState.next(false);
    this.router.navigate(["/login"]);
  }

  get userToken() {
    return this.token;
  }

  isLoggedIn() {
    return this.loginState.getValue();
  }
}
