import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from './models/list-sidenav.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDrawerOpen = true;

  listSideNav: MenuItemModel[] = [];

  constructor(){}

  ngOnInit(): void {
    this.getListSinedav();
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  getListSinedav(){
    this.listSideNav = [
      { icon: '/assets/font-awasome-icons/boxes-stacked-solid.svg', name: 'Productos', route: '/products', color: 'tertiary-color' },
      { icon: '/assets/font-awasome-icons/tags-solid.svg', name: 'Categorias', route: '/categories',  color: 'gray' },
    ]
  }
}
