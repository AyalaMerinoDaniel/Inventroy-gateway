import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseFiltersModel } from '../../models/purchase-filters.model';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { GENERAL_MESSAGES } from 'src/app/shared/constants/message.constants';
import { PurchaseService } from '../../services/purchase.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { PurchaseListModel } from '../../models/purchase-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { DialogsService } from 'src/app/services/dialogs-service/dialogs.service';
import { cleanObject } from 'src/app/shared/functions/general-functions';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { LocalStorageKeys } from 'src/app/enums/local-storage-keys';

@Component({
  selector: 'app-list-purchase',
  templateUrl: './list-purchase.component.html',
  styleUrls: ['./list-purchase.component.scss']
})
export class ListPurchaseComponent implements OnInit {
  form: FormGroup;

  keyFormStartDate = 'startDate';
  keyFormEndDate = 'endDate';
  keyFormUserId = 'userId';

  listPurchases: PurchaseListModel [] = [];
  dataSource = new MatTableDataSource<PurchaseListModel>();
  displayedColumns: string[] = [
    'id', 
    'date', 
    'user',
    'customerName',
    'productCount',
    'quantityTotal',
    'total',
    'actions'
  ];

  limit: number = 10;
  page: number = 1;
  totalItems: number = 0;

  endpointUsers = getFullEndpoint(EndpointsPaths.usersSelector);

  constructor(
    private messagesService: MessagesService,
    private purchaseService: PurchaseService,
    private dialogService: DialogsService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.form = new FormGroup({
      [`${this.keyFormStartDate}`]: new FormControl('', Validators.required),
      [`${this.keyFormEndDate}`]: new FormControl('', Validators.required),
      [`${this.keyFormUserId}`]: new FormControl(''),
    });
    this.localStorageService.remove(LocalStorageKeys.idPurchase);
   }

  ngOnInit(): void {
    this.getListPurchases();
  }

  getDataForm(){
    const data : PurchaseFiltersModel = this.form.value;
    var offset = (this.page - 1) * this.limit;
    data.offset = offset;
    data.limit = this.limit;
    if(data.startDate) data.startDate = moment(data.startDate).format('YYYY-MM-DD');
    if(data.endDate) data.endDate = moment(data.endDate).format('YYYY-MM-DD');

    return data;
  }

  submitForm(){
    if(this.form.valid){
      this.getListPurchases();
    }else{
      this.messagesService.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED);
      this.form.markAllAsTouched();
    }
  }

  getListPurchases(){
    const body = cleanObject(this.getDataForm());
    this.dialogService.showDialogLoading();
    this.purchaseService.getListPurchases(body).subscribe({
      next: res=>{
        this.dialogService.closeDialogLoading()
        if(res.statusCode === ResponseTypeEnum.OK){
          this.listPurchases = res.result.results;
          this.dataSource.data = this.listPurchases;
          this.totalItems = res.result.total
        }
      },
      error: _ => this.dialogService.closeDialogLoading()
    })
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getListPurchases();
  }

  cleanForm(){
    this.form.reset();
    this.getListPurchases();
  }

  onValueChange(value: Date) {
    const startDate = moment(this.form.get(this.keyFormStartDate)?.value);
    const endDate = moment(value);
    const months = endDate.diff(startDate, 'months', true);
    
    if(endDate < startDate){
      this.messagesService.showWarning('La fecha final no puede ser menor a la fecha inicial');
      this.form.get(this.keyFormEndDate)?.setValue('');
      return;
    }

    if(months > 1){
      this.messagesService.showWarning('El periodo no puede ser más de un mes');
      this.form.get(this.keyFormEndDate)?.setValue('');
      return;
    }
  }

  seeDetails(id: number){
    this.localStorageService.setData(LocalStorageKeys.idPurchase, id);
    this.router.navigate(['/inventory/purchases/details'])
  }

  goToNewPurchase(){
    this.router.navigate(['/inventory/purchases/new'])
  }
}
