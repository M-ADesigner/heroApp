import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {
  constructor(private route: Router, private authservice: AuthService) {}

  get user(): User | undefined {
    return this.authservice.currentUser;
  }

  public sidebarItems = [
    {
      label: 'Listado',
      icon: 'label',
      url: './list',
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: './new-hero',
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search',
    },
  ];

  onLogout() {
    this.authservice.logout();
    this.route.navigateByUrl('/auth');
  }
}
