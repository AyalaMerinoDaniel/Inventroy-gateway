import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from './models/list-sidenav.model';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDrawerOpen = true;
  isLogin: boolean = true;
  listSideNav: MenuItemModel[] = [];
  user?: UserModel;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isPageLogin();
  }

  ngOnInit(): void {
    this.getListSinedav();
    this.getDataUser();
  }

  isPageLogin() {
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const publicRoutes = ['/login'];
      this.isLogin = !publicRoutes.some(route => event.url.startsWith(route));
    }
  });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  getListSinedav() {
    this.listSideNav = [
      {
        icon: '/assets/font-awasome-icons/boxes-stacked-solid.svg',
        name: 'Productos',
        route: '/inventory/products',
        color: 'tertiary-color',
      },
      {
        icon: '/assets/font-awasome-icons/tags-solid.svg',
        name: 'Categorias',
        route: '/inventory/categories',
        color: 'gray',
      },
    ];
  }

  getDataUser(){
    this.authService.user.subscribe(user=>{
      if(user){
        this.user = user;
      }
    })
  }

  logout(){
    this.authService.logout();
    this.isDrawerOpen = true;
  }
}
