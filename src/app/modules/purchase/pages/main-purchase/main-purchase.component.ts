import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from 'src/app/models/list-sidenav.model';

@Component({
  selector: 'app-main-purchase',
  templateUrl: './main-purchase.component.html',
  styleUrls: ['./main-purchase.component.scss']
})
export class MainPurchaseComponent implements OnInit {
  listSideNav: MenuItemModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getListSinedav();
  }

  getListSinedav() {
    this.listSideNav = [
      {
        icon: '/assets/font-awasome-icons/clipboard-list-solid.svg',
        name: 'Lista de compras',
        route: '/inventory/purchases/list',
      },
      {
        icon: '/assets/font-awasome-icons/cart-plus-solid.svg',
        name: 'Nueva compra',
        route: '/inventory/purchases/new',
      },
    ];
  }

}
