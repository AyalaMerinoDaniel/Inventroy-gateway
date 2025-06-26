import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusUserType'
})
export class StatusUserTypePipe implements PipeTransform {

  transform(value: string | null): string {
    console.log(value)
    if(value){
      return 'user-disable'
    }else{
      return 'user-enable'
    }
  }

}
