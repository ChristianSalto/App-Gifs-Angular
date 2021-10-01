import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @ViewChild('refTextSearch') refTextSearch!: ElementRef<HTMLInputElement>; // con este decorador accederemos al input a traves de la referencia

  constructor(private gifsService: GifsService) {}

  handleSearch() {
    const value = this.refTextSearch.nativeElement.value;

    if (value.trim().length === 0) return;

    this.gifsService.searchGifs(value);

    this.refTextSearch.nativeElement.value = '';
  }
}
