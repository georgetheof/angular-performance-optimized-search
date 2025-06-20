import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  map,
  combineLatest,
  debounceTime,
  skip,
  take,
  tap,
} from 'rxjs';
import {
  fetchVariantsStart,
  selectSelectedVariant,
  selectVariants,
  setSelectedVariant,
  updateVariant,
} from '../../store/variant-state';
import { Classification, Variant } from '../../shared/models';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { VariantClassificationComponent } from '../../components/variants/variant-classification/variant-classification.component';
import { VariantViewComponent } from '../../components/variants/variant-view/variant-view.component';
import { VariantsListComponent } from '../../components/variants/variants-list/variants-list.component';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    CommonModule,
    SearchInputComponent,
    VariantsListComponent,
    VariantViewComponent,
    VariantClassificationComponent,
  ],
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsComponent implements OnInit {
  private readonly store = inject(Store);

  private variants$ = this.store.select(selectVariants);

  searchValue$: BehaviorSubject<string> = new BehaviorSubject('');
  selectedVariant$ = this.store.select(selectSelectedVariant);

  filteredVariants$ = combineLatest([this.searchValue$, this.variants$]).pipe(
    debounceTime(200),
    map(([searchValue, variants]) => {
      const searchValueLowerCase = searchValue.toLowerCase();

      return variants.filter((v) =>
        v.name.toLowerCase().includes(searchValueLowerCase)
      );
    })
  );

  filteredVariantsCount$ = this.filteredVariants$.pipe(
    map((data) => data.length)
  );

  ngOnInit() {
    this.fetchVariants();
  }

  onSearchValueChange(value: string) {
    this.searchValue$.next(value);
  }

  onVariantSelected(value: Variant | null) {
    this.store.dispatch(setSelectedVariant({ variant: value }));
  }

  onScrolledToBottom() {
    this.fetchVariants();
  }

  onClassificationSelected(value: Classification) {
    this.selectedVariant$
      .pipe(
        take(1),
        tap((selectedVariant) => {
          if (!selectedVariant) return;

          const updatedVariant: Variant = {
            ...selectedVariant,
            classification: value,
          };

          this.store.dispatch(updateVariant({ updatedVariant }));
        })
      )
      .subscribe();
  }

  private fetchVariants() {
    this.store.dispatch(fetchVariantsStart());
  }
}
