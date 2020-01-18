import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth.service";
import { Router, Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  error: string;
  errorCount = 0;

  returnUrl: string;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.loginForm = this.fb.group({
      userLogin: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submit() {
    this.loading = true;
    this.authService
      .login(
        this.loginForm.get("userLogin").value,
        this.loginForm.get("password").value
      )
      .subscribe(
        loggedIn => {
          this.loading = false;
          if (!loggedIn) {
            if (this.error) {
              this.errorCount++;
            } else {
              this.error =
                "Your credentials were incorrect. Please check and try again.";
            }
          } else {
            this.error = "";
            this.router.navigate([this.returnUrl], {
              replaceUrl: true
            });
          }
        },
        _ => {
          this.loading = false;
          this.error =
            "An unexpected error occurred. Please wait and try again later.";
        }
      );
  }
}
