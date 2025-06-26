import { Pipe, PipeTransform } from '@angular/core';
import { UserTypeEnum } from 'src/app/enums/generals.enum';

@Pipe({
  name: 'nameTypeUser'
})
export class NameTypeUserPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case UserTypeEnum.ADMIN:
        return "Administrador";
      case UserTypeEnum.USER:
        return "Vendedor";
      default:
        return "Desconocido";
    }
  }

}
