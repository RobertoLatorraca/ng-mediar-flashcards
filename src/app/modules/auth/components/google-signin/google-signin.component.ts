import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var google: any;

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss']
})
export class GoogleSigninComponent implements OnInit {

  constructor(private authService: AuthService, ngZone: NgZone) {
    this.handleCredentialResponse = googleResponse => ngZone.run(
      () => {
        this.authService.googleSignIn(googleResponse.credential).subscribe();
      }
    );
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: "460910267165-7b4qqjqkft140eikhqfcgenighdgv2st.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButtonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt();  // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
  }

}
