import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../core/auth/services/auth.service';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string = '/dashboard';

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private platformService = inject(PlatformService);

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });

    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Auto-navigate to returnUrl if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // Add this getter
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService
      .login(
        {
          username: this.f['username'].value,
          password: this.f['password'].value,
        },
        this.f['rememberMe'].value
      )
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.error = error.message || 'Invalid username or password';
          this.loading = false;
        },
      });
  }

  forgotPassword() {
    this.router.navigate(['/reset-password']);
  }

  signInWithGoogle() {
    this.authService.initiateGoogleLogin();
  }
}
