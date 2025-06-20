import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  CdkVirtualScrollViewport,
  FixedSizeVirtualScrollStrategy,
  ScrollingModule,
  VIRTUAL_SCROLL_STRATEGY,
} from '@angular/cdk/scrolling';
import { Variant } from '../../../shared/models';

class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(20, 70, 110);
  }
}

@Component({
  standalone: true,
  imports: [ScrollingModule],
  providers: [
    { provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy },
  ],
  selector: 'app-variants-list',
  templateUrl: 'variants-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsListComponent {
  @Input() variants: Variant[] = [];
  @Input() selectedVariant: Variant | null = null;

  @Output() variantSelected: EventEmitter<Variant | null> = new EventEmitter();
  @Output() scrolledToBottom: EventEmitter<void> = new EventEmitter();

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  get selectedVariantId(): string | null {
    return this.selectedVariant?.id || null;
  }

  onVariantSelected(variant: Variant) {
    const newVariant = this.selectedVariantId === variant.id ? null : variant;

    this.variantSelected.emit(newVariant);
  }

  onScrollIndexChange() {
    if (this.virtualScroll.measureScrollOffset('bottom') < 100) {
      this.scrolledToBottom.emit();
    }
  }

  trackByVariantId(index: number, item: Variant): string {
    return item.id;
  }
}
