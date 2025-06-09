import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/auth/services/auth.service";
import { PlatformService } from "../../../core/services/platform.service";

@Component({
  selector: 'app-oauth-callback',
  template: '<div>Processing login...</div>',
  standalone: true
})
// OAuthCallbackComponent handles the redirect from Google
export class OAuthCallbackComponent implements OnInit {
  private processingCallback = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private platformService: PlatformService
  ) {}

  ngOnInit() {
    // Only process on the browser, not during SSR
    if (this.platformService.isBrowserPlatform() && !this.processingCallback) {
      this.processingCallback = true;
      
      this.route.queryParams.subscribe(params => {
        const code = params['code'];
        if (code) {
          // Check if we've already processed this code
          const processedCode = this.platformService.getLocalStorageItem('processed_oauth_code');
          if (processedCode === code) {
            this.router.navigate(['/dashboard']);
            return;
          }
          
          // Store the code we're processing
          this.platformService.setLocalStorageItem('processed_oauth_code', code);
          
          // 5. Get stored verifier and exchange code for tokens
          const codeVerifier = this.platformService.getLocalStorageItem('code_verifier');
          this.authService.handleOAuth2Callback(code, codeVerifier)
            .subscribe({
              next: () => {
                this.router.navigate(['/dashboard']);
              },
              error: () => {
                this.platformService.removeLocalStorageItem('processed_oauth_code');
                this.router.navigate(['/login']);
              }
            });
        }
      });
    }
  }
}