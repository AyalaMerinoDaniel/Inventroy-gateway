import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { SelectorService } from 'src/app/services/selector-service/selector.service';
import { ResponseApi } from 'src/app/models/response.model';
import { GenericOption } from 'src/app/models/selector/select-request-body.model';
import { EMPTY, of, Subscription } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
})
export class SelectorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() endpoint!: string;
  @Input() label: string = 'Seleccionar';
  @Input() localList?: GenericOption[];

  @Output() onItemSelected = new EventEmitter<GenericOption | undefined>();
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  searchControl = new FormControl();
  options: GenericOption[] = [];
  loading = false;
  selectedItem?: GenericOption;

  private limit = 10;
  private currentPage = 1;
  private allLoaded = false;
  private currentQuery = '';

  subs?: Subscription;

  constructor(private selectorService: SelectorService) {}

  ngOnInit(): void {
    if (this.localList) {
      this.options = this.localList;
      return;
    }
    this.listenForChanges();
    this.loadOptions().subscribe();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value: any) => {
          if (typeof value === 'object' && value !== null) {
            return of();
          }

          this.currentQuery = value || '';
          this.resetSearch();
          return this.loadOptions();
        })
      )
      .subscribe();
  }

  listenForChanges() {
    this.subs = this.form
      .get(this.controlName)
      ?.valueChanges.subscribe((newValue) => {
        this.proccessNewValueAutoSelect(newValue);
      });
  }

  proccessNewValueAutoSelect(newValue: any) {
    if (typeof newValue === 'object') {
      this.searchControl.setValue(newValue ?? null);
      this.setItemToForm();
    }
  }

  ngAfterViewInit(): void {
    if (this.matAutocomplete) {
      this.matAutocomplete.opened.subscribe(() => {
        setTimeout(() => this.attachScrollListener());
      });
    }
  }

  private attachScrollListener(): void {
    const panel = document.querySelector('.mat-autocomplete-panel');
    if (panel) {
      panel.addEventListener('scroll', () => {
        const threshold = 150;
        const position = panel.scrollTop + panel.clientHeight;
        const height = panel.scrollHeight;

        if (height - position < threshold && !this.loading && !this.allLoaded) {
          this.loadOptions().subscribe();
        }
      });
    }
  }

  private resetSearch(): void {
    this.options = [];
    this.currentPage = 1;
    this.allLoaded = false;
  }

  private loadOptions() {
    if (this.loading || this.allLoaded) return EMPTY;

    this.loading = true;
    const offset = (this.currentPage - 1) * this.limit;

    return this.selectorService
      .getListApi(this.endpoint, this.limit, offset, this.currentQuery)
      .pipe(
        tap((res: ResponseApi) => {
          const newData = res.result.results;
          const total = res.result.total;

          this.options =
            this.currentPage === 1 ? newData : [...this.options, ...newData];

          if (this.options.length >= total) {
            this.allLoaded = true;
          }

          this.loading = false;
          this.currentPage++;
        })
      );
  }

  setItemToForm(): void {
    const item = this.searchControl.value;
    if (item && item.id) {
      this.selectedItem = item;
      this.form.get(this.controlName)?.patchValue(item.id);
      this.onItemSelected.emit(item);
    }
  }

  displayFn = (option: GenericOption) => option?.value || '';

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
