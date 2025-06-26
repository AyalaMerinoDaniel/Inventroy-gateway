import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Directive({
  selector: '[checkPermission]'
})
export class PermissionDirective {
  @Input() role: string = '';

  constructor(
    private el: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userRole = this.authService.getUser()?.role;
    if (userRole !== this.role) {
      this.el.nativeElement.style.display = 'none';
    }
  } 

}
