import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Directive({
  selector: '[checkPermission]'
})
export class PermissionDirective {
  @Input() role?: string | string[];

  constructor(
    private el: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userRole = this.authService.getUser()?.role;

    const roles = Array.isArray(this.role) ? this.role : [this.role];

    const hasPermission = roles.includes(userRole);

    if (!hasPermission) {
      this.el.nativeElement.style.display = 'none';
    }
  } 

}
