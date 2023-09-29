import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent implements OnInit {
  public users?: User;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService
      .login('andresavilamf@gmail.com', 'dadasd.asdasdasf.asdweqw')
      .subscribe((user) => {
        this.router.navigateByUrl('/');
        console.log(user);
      });
  }
  ngOnInit(): void {}
}
