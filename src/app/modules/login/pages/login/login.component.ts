import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  keyFormEmail = 'email';
  keyFormPassword = 'password';

  constructor() {
    this.form = new FormGroup({
      [`${this.keyFormEmail}`]: new FormControl('', Validators.required),
      [`${this.keyFormPassword}`]: new FormControl('', Validators.required),
    })
   }

  ngOnInit(): void {
  }

}
