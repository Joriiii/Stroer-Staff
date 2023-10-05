import {Component, EventEmitter, Output} from '@angular/core';
import { OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery: string = '';


  emitSearchQuery() {
    this.searchEvent.emit(this.searchQuery);
  }
}
