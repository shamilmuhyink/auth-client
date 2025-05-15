import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { PlatformService } from "../../services/platform.service";

@Component({
  selector: 'app-oauth-callback',
  template: '<div>Processing login...</div>',
  standalone: true
})
export class OAuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private platformService: PlatformService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        // Get stored code verifier
        const codeVerifier = this.platformService.getLocalStorageItem('code_verifier');
        
        // Exchange code for tokens
        this.authService.handleOAuth2Callback(code, codeVerifier).subscribe({
          next: () => this.router.navigate(['/dashboard']),
          error: () => this.router.navigate(['/login'])
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}