import {Component, EventEmitter, Output} from '@angular/core';
import { OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  // Output EventEmitter to send search queries to the parent component
  @Output() searchEvent = new EventEmitter<string>();

  // Holds the search query entered by the user
  searchQuery: string = '';

  // Method to emit the search query to the parent component
  emitSearchQuery() {
    this.searchEvent.emit(this.searchQuery);
  }
}
