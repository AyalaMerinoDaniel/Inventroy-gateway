import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserTypeListEnum } from 'src/app/enums/generals.enum';
import { ValidationMessagesModel } from 'src/app/models/validations-messages.model';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match.validator';

@Component({
  selector: 'app-form-create-update-user',
  templateUrl: './form-create-update-user.component.html',
  styleUrls: ['./form-create-update-user.component.scss']
})
export class FormCreateUpdateUserComponent implements OnInit {
  @Input() idUser?: number;

  form!: FormGroup;

  keyFormName = 'name';
  keyFormEmail = 'email';
  keyFormPassword = 'password';
  keyFormConfirmPassord = 'confirmPassword';
  keyFormRole = 'role';

  userTypeList = UserTypeListEnum();

  validationMessages: ValidationMessagesModel[] = [
    { type: 'required', message: 'Este campo es obligatorio' },
    { type: 'passwordMismatch', message: 'La contraseña no coincide' },
    { type: 'minLength', message: 'No cumple el minimo de caracteres' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    const isEdit = !!this.idUser;
    this.form = new FormGroup({
      [`${this.keyFormName}`]: new FormControl('', Validators.required),
      [`${this.keyFormEmail}`]: new FormControl('', [Validators.required, Validators.email]),
      [`${this.keyFormPassword}`]: new FormControl('', isEdit ? [] : [Validators.required , Validators.minLength(8)]),
      [`${this.keyFormConfirmPassord}`]: new FormControl('', isEdit ? [] : [Validators.required, Validators.minLength(8)]),
      [`${this.keyFormRole}`]: new FormControl('', Validators.required),
    },{
        validators: isEdit ? null : passwordMatchValidator(this.keyFormPassword, this.keyFormConfirmPassord)
    })
  }

}
