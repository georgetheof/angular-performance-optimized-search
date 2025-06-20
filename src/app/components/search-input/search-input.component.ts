import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  @Input() label: string = 'Search';

  @Output() searchValueChange: EventEmitter<string> = new EventEmitter();

  onSearchValueChange(e: any) {
    this.searchValueChange.emit(e.target.value);
  }
}
