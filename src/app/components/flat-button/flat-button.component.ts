import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flat-button',
  templateUrl: './flat-button.component.html',
  styleUrls: ['./flat-button.component.scss']
})
export class FlatButtonComponent implements OnInit {
  @Input() label: string = 'Guardar';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
