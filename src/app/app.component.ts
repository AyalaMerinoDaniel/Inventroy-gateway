import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from './models/list-sidenav.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDrawerOpen = true;
  isLogin: boolean = true;
  listSideNav: MenuItemModel[] = [];

  constructor(private router: Router) {
    this.isPageLogin();
  }

  ngOnInit(): void {
    this.getListSinedav();
  }

  isPageLogin() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLogin = event.url !== '/login';
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
        route: '/products',
        color: 'tertiary-color',
      },
      {
        icon: '/assets/font-awasome-icons/tags-solid.svg',
        name: 'Categorias',
        route: '/categories',
        color: 'gray',
      },
    ];
  }
}
