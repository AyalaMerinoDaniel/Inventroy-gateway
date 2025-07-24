import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { GenericOption } from 'src/app/models/selector/select-request-body.model';
import { ProductLIstModel } from 'src/app/modules/products/models/products.model';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { GENERAL_MESSAGES } from 'src/app/shared/constants/message.constants';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePurchaseModel, ItemsPurchaseDetailsModel, ItemsPurchaseModel } from '../../models/purchase-create-update.model';
import { DialogsService } from 'src/app/services/dialogs-service/dialogs.service';
import { PurchaseService } from '../../services/purchase.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { LocalStorageKeys } from 'src/app/enums/local-storage-keys';
import { PurchaseListModel } from '../../models/purchase-list.model';

@Component({
  selector: 'app-new-edit-purchase',
  templateUrl: './new-edit-purchase.component.html',
  styleUrls: ['./new-edit-purchase.component.scss']
})
export class NewEditPurchaseComponent implements OnInit {
  form: FormGroup;
  formProduct: FormGroup;

  keyFormUserId = 'userId';
  keyFormCustomerName = 'customerName';

  keyFormProduct = 'product';
  keyFormQuantity = 'quantity';

  endpointUsers = getFullEndpoint(EndpointsPaths.usersSelector);
  endpointProducts = getFullEndpoint(EndpointsPaths.productSelector);

  productSelected?: ProductLIstModel;
  productList: ItemsPurchaseDetailsModel[] = [];
  dataSource = new MatTableDataSource<ItemsPurchaseDetailsModel>([]);

  displayedColumns: string[] = [
    'id', 
    'name', 
    'description', 
    'price',
    'quantity',
    'total',
    'actions'
  ];

  totalPurchase: number = 0;
  itemsPurchase: ItemsPurchaseModel [] = [];

  idPurchase?: number;
  purchaseData?: PurchaseListModel;

  constructor(
    private productService: ProductService,
    private messageService: MessagesService,
    private dialogService: DialogsService,
    private purchaseService: PurchaseService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { 
    this.form = new FormGroup({
      [`${this.keyFormUserId}`]: new FormControl('', Validators.required),
      [`${this.keyFormCustomerName}`]: new FormControl('', Validators.required),
    });

    this.formProduct = new FormGroup({
      [`${this.keyFormProduct}`]: new FormControl('', Validators.required),
      [`${this.keyFormQuantity}`]: new FormControl('', Validators.required),
    });

    this.idPurchase = this.localStorageService.getData(LocalStorageKeys.idPurchase);
  }

  ngOnInit(): void {
    if(this.idPurchase){
      this.getPurchaseById(this.idPurchase);
      this.displayedColumns = this.displayedColumns.filter(c => c !== 'actions');
    }
  }

  getPurchaseById(id: number){
    this.dialogService.showDialogLoading();
      this.purchaseService.getDetailsPurchaseById(id).subscribe({
        next: res=>{
          if(res.statusCode === ResponseTypeEnum.OK){
            this.dialogService.closeDialogLoading();
            const data: PurchaseListModel = res.result;
            this.setToFormDetailsToPurchase(data);
          }
        },
        error: _ => this.dialogService.closeDialogLoading()
    });
  }

  mapDataPurchase(data: PurchaseListModel):CreatePurchaseModel{
    return {
      customerName: data.customerName,
      userId: data.user
      ? new GenericOption(data.user.id!, data.user.name)
      : undefined
    }
  }

  setToFormDetailsToPurchase(data: PurchaseListModel){
    const purchaseData = this.mapDataPurchase(data);
    this.form.patchValue(purchaseData);
    this.productList = data.items!;
    this.dataSource.data = this.productList;
    this.totalPurchase = data.total ?? 0;
  }

  onChangeProduct(data?: GenericOption){
    if(data){
      this.getProductById(+data.id)
    }
  }

  getProductById(id: number){
    this.productService.getProductById(id).subscribe((res) => {
      if (res.statusCode === 200) {
        const data: ProductLIstModel = res.result;
        this.productSelected = data;
        this.formProduct.get(this.keyFormQuantity)?.setValue('');
      }
    });
  }

  onChangeQuantity(quantity: number){
    if(quantity > this.productSelected?.stock!){
      this.messageService.showWarning(
        `La cantidad solicitada no puede ser mayor al stock disponible (${this.productSelected?.stock})`
      );
      this.formProduct.get(this.keyFormQuantity)?.setValue("");
    }
  }

  addProduct(){
    if(this.formProduct.valid){
      const quantity = this.formProduct.get(this.keyFormQuantity)?.value;
      const existProduct = this.productList.find(product=> product.product?.id === this.productSelected?.id)

      if(existProduct){
        existProduct.quantity! += Number(quantity);
      }else{
        const product : ItemsPurchaseDetailsModel = {
          quantity: +quantity,
          product: {
            id: this.productSelected?.id,
            name: this.productSelected?.name,
            description: this.productSelected?.description,
            price: this.productSelected?.price,
          }
        }
        this.productList.push(product);
      }
      
      this.dataSource.data = this.productList;
      this.productSelected = undefined;
      this.formProduct.reset();
      this.getTotalPurchase()
    }else{
      this.formProduct.markAllAsTouched();
      this.messageService.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED);
    }
  }

  getTotalPurchase(){
    this.totalPurchase = this.productList.reduce((total, product) => {
      const subtotal = (product.product?.price || 0) * (product.quantity || 0);
      return total + subtotal;
    }, 0);
  }

  onSubmitForm(){
    if(this.canSavePurchase()){
      this.getItemsPurchase();
      const data: CreatePurchaseModel = this.form.value;
      data.items = this.itemsPurchase;
      data.total = this.totalPurchase;
      this.createPurchase(data);
    }
  }

  createPurchase(purchase: CreatePurchaseModel){
    const message = `¿Estás seguro que desea guardar la compra?`
    const ref = this.dialogService.showDialogConfirm('Guardar compra', message);
    ref.afterClosed().subscribe(res=>{
      if(res){
        this.requestCreatePurchase(purchase);
      }
    });
  }

  requestCreatePurchase(purchase: CreatePurchaseModel){
    this.dialogService.showDialogLoading();
    this.purchaseService.createPurchase(purchase).subscribe({
      next: res=>{
        if(res.statusCode === ResponseTypeEnum.OK){
          this.dialogService.closeDialogLoading()
          this.messageService.showSuccess(res.friendlyMessage[0]);
          this.back();
        }
      },
      error: _ => this.dialogService.closeDialogLoading()
    })
  }

  canSavePurchase(): boolean{
    if(!this.form.valid){
      this.messageService.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED);
      this.form.markAllAsTouched();
      return false;
    }

    if(this.productList.length < 1){
      this.messageService.showWarning('Es necesario agregar productos para generar la compra');
      return false;
    }

    return true;
  }

  getItemsPurchase(){
    this.itemsPurchase = [];
    this.productList.forEach(product=>{
      const newItemProduct: ItemsPurchaseModel = {
        productId: product.product?.id!,
        quantity: product.quantity!
      }
      this.itemsPurchase.push(newItemProduct);
    });
  }

  back(){
    this.router.navigate(['/inventory/purchases/list'])
  }

  deleteProduct(id: number) {
    this.productList = this.productList.filter(product => product.product?.id !== id);
    this.dataSource.data = this.productList;
    this.getTotalPurchase();
  }


}
