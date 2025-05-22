import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { catchError, map, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() width = '18';
  @Input() height = '18';
  @Input() image?: string;
  @Input() type?: 'xsmall' | 'small' | 'normal' | 'medium' | 'big' | 'xbig';
  @Input() color?:
    | 'primary-color'
    | 'gray'
    | 'secundary-color'
    | 'accent-color'
    | 'white'
    | 'black'
    | 'tertiary-color'
    | 'green'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | string;
  @Input() colorHover?:
    | 'primary-color'
    | 'gray'
    | 'secundary-color'
    | 'accent-color'
    | 'white'
    | 'black'
    | 'tertiary-color'
    | 'green'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  @Input() directColor = '';
  @Input() directHoverColor = '';
  idContent = '';

  hasError = false;
  svg?: HTMLElement;
  parentElement?: HTMLElement;
  constructor(
    private elRef: ElementRef,
    private httpClient: HttpClient
  ) {
    this.idContent = uuidv4();
  }

  ngOnInit() {
    this.setupSize();
    this.setupColor();
    this.setupHoverColor();

    this.parentElement = this.elRef.nativeElement.parentElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['color']) {
      this.setupColor();
      this.changeColor(this.directColor);
    }

    if (changes['colorHover']) {
      this.setupHoverColor();
    }

    if (changes['image']) {
      this.setImage();
    }
  }

  ngOnDestroy(): void {
    if (this.parentElement) {
      this.parentElement.innerHTML += '';
    }
  }

  setupViews(result: string) {
    var container = document.getElementById(this.idContent);
    if (container) {
      container.innerHTML = result;
      this.svg = container?.firstChild as HTMLElement;
      this.svg?.setAttribute('width', this.width);
      this.svg?.setAttribute('height', this.height);
      this.changeColor(this.directColor);
      if (this.directHoverColor) {
        this.addParentListeners();
      }
    }
  }

  async setImage() {
    const result = await this.fileExists(this.image!).then();
    if (result == '_') {
      this.hasError = true;
    } else {
      this.setupViews(result ?? '');
    }
  }

  addParentListeners() {
    this.parentElement?.addEventListener('mouseenter', () => {
      this.changeColor(this.directHoverColor);
    });

    this.parentElement?.addEventListener('mouseleave', () => {
      this.changeColor(this.directColor);
    });
  }

  mouseenter() {
    this.changeColor(this.directHoverColor);
  }
 
  changeColor(color: string) {
    try {
      this.svg?.setAttribute('fill', color);
    } catch (e: any) {
    }
  }

  fileExists(url: string): Promise<string> {
    return this.httpClient
      .get(url, { responseType: 'text' })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return '_';
        })
      )
      .toPromise();
  }

  setupSize() {
    switch (this.type) {
      case 'xsmall':
        this.width = '10';
        this.height = '10';
        break;
      case 'small':
        this.width = '12';
        this.height = '12';
        break;
      case 'normal':
        this.width = '14';
        this.height = '14';
        break;
      case 'medium':
        this.width = '20';
        this.height = '20';
        break;
      case 'big':
        this.width = '24';
        this.height = '24';
        break;
      case 'xbig':
        this.width = '32';
        this.height = '32';
        break;
    }
  }

  setupColor() {
    switch (this.color) {
      case 'primary-color':
        this.directColor = 'var(--primary-color)';
        break;
      case 'gray':
        this.directColor = 'var(--gray)';
        break;
      case 'secundary-color':
        this.directColor = 'var(--secundary-color)';
        break;
      case 'accent-color':
        this.directColor = 'var(--tertiary-color)';
        break;
      case 'white':
        this.directColor = 'white';  // estándar CSS, funciona sin var()
        break;
      case 'green':
        this.directColor = 'var(--button-green)';
        break;
      case 'tertiary-color':
        this.directColor = 'var(--tertiary-color)';
        break;
      case 'black':
        this.directColor = 'black';
        break;
      case 'success':
        this.directColor = 'var(--toast-success)';
        break;
      case 'warning':
        this.directColor = 'var(--toast-warning)';
        break;
      case 'error':
        this.directColor = 'var(--toast-error)';
        break;
      case 'info':
        this.directColor = 'var(--toast-info)';
        break;
      default:
        this.directColor = this.color || 'black';
    }
  }
  

  setupHoverColor() {
    switch (this.colorHover) {
      case 'primary-color':
        this.directColor = 'primary-color';
        break;
      case 'gray':
        this.directColor = 'gray';
        break;
      case 'secundary-color':
        this.directColor = 'secundary-color';
        break;
      case 'accent-color':
        this.directColor = 'tertiary-color';
        break;
      case 'white':
        this.directColor = 'white';
        break;
      case 'green':
        this.directColor = 'button-green'
        break;
      case 'tertiary-color':
        this.directColor = 'var(--tertiary-color)';
        break;
      case 'black':
        this.directColor = 'button';
        break;
      case 'success':
        this.directColor = 'toast-success';
        break;
      case 'warning':
        this.directColor = 'toast-warning';
        break;
      case 'error':
        this.directColor = 'toast-error';
        break;
      case 'info':
        this.directColor = 'toast-info';
        break;
    }
  }

}
