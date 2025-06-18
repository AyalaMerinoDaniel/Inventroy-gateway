import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { GENERAL_MESSAGES } from 'src/app/shared/constants/message.constants';
import { LoginModel, ResponseLoginModel } from '../../models/login.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  keyFormEmail = 'email';
  keyFormPassword = 'password';

  constructor(
    private messagesService: MessagesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      [`${this.keyFormEmail}`]: new FormControl('', [Validators.required, Validators.email]),
      [`${this.keyFormPassword}`]: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
   }

  ngOnInit(): void {
  }

  onSubmitForm(){
    if(this.form.valid){
      const data: LoginModel = this.form.value;
      this.requestLogin(data);
    }else{
      this.form.markAllAsTouched();
      this.messagesService.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED)
    }
  }

  requestLogin(body:LoginModel){
    this.authService.login(body).subscribe({
      next: (res)=>{
        if(res.statusCode === ResponseTypeEnum.OK){
          const data: ResponseLoginModel = res.result;
          this.proccessReponse(data);
        }
      }
    })
  }

  proccessReponse(data: ResponseLoginModel){
    this.authService.setTokens(data.token, data.refreshToken);
    this.authService.setUser(data.user);
    this.router.navigate(['/inventory/welcome'])
  }
}
