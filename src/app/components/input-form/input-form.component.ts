import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationMessagesModel } from 'src/app/models/validations-messages.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName: string = '';
  @Input() label: string= '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() appearance: 'fill' | 'outline' | 'standard' | 'legacy' = 'outline';
  @Input() validationMessages: ValidationMessagesModel[] = [
  { type: 'required', message: 'Este campo es obligatorio' },
  { type: 'minlength', message: 'No cumple el minimo de caracteres' },
  { type: 'maxlength', message: 'No cumple el maximo de caracteres' },
  { type: 'email', message: 'El formato del correo es inválido' },
  { type: 'pattern', message: 'El formato ingresado no es válido' }, 
  ];

  constructor() { }

  ngOnInit(): void {
  }

  hasFormError(formControl: string, validationType: string){
    if(this.form.get(formControl)?.touched){
      return this.form.get(formControl)?.hasError(validationType)
    }
    return false;
  }

}
