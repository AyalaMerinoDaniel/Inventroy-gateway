import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Input() maxVisiblePages = 5;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalPages = this.totalPages;

    if (totalPages <= this.maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(this.currentPage - half, 1);
      let end = Math.min(start + this.maxVisiblePages - 1, totalPages);

      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(end - this.maxVisiblePages + 1, 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }

  changePage(page: number | string) {
    if (page === '...' || page === this.currentPage) return;
    this.pageChange.emit(Number(page));
  }

  prevPage() {
    if (this.currentPage > 1) this.changePage(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.changePage(this.currentPage + 1);
  }
}
