import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stroked-button',
  templateUrl: './stroked-button.component.html',
  styleUrls: ['./stroked-button.component.scss'],
})
export class StrokedButtonComponent implements OnInit {
  @Input() label: string = 'Guardar';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  constructor() {}

  ngOnInit(): void {}
}
