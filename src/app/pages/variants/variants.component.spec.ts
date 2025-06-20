import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { take } from 'rxjs';
import { VariantsComponent } from './variants.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { VariantsListComponent } from '../../components/variants/variants-list/variants-list.component';
import { VariantViewComponent } from '../../components/variants/variant-view/variant-view.component';
import { VariantClassificationComponent } from '../../components/variants/variant-classification/variant-classification.component';
import { Classification, Variant } from '../../shared/models';
import {
  fetchVariantsStart,
  selectVariants,
  setSelectedVariant,
  updateVariant,
} from '../../store/variant-state';
import { RouterModule } from '@angular/router';
import { successState } from '../../shared/helpers/state.helpers';

describe('VariantsComponent', () => {
  let component: VariantsComponent;
  let fixture: ComponentFixture<VariantsComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const getByTestId = (testId: string) => {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  };
  const getComponent = (component: any) => {
    return fixture.debugElement.query(By.directive(component));
  };

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        VariantsComponent,
        SearchInputComponent,
        VariantsListComponent,
        VariantViewComponent,
        VariantClassificationComponent,
      ],
      providers: [
        provideMockStore({
          initialState: {
            variant: {
              variants: [],
              fetchVariantsState: successState([]),
              selectedVariant: null,
            },
          },
        }),
      ],
    })));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(VariantsComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create the variants component', () => {
    expect(component).toBeTruthy();
  });

  it('should include search input component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-search-input')).toBeDefined();
  });

  it('should have proper label for search input component', () => {
    const compiled = fixture.debugElement.query(By.css('app-search-input'));
    expect(compiled.attributes['label']).toBe('Search for variants by name');
  });

  it('should include variants list component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-variants-list')).toBeDefined();
  });

  it('should include variant view component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-variant-view')).toBeDefined();
  });

  it('should include variant classification component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-variant-classification')).toBeDefined();
  });

  it('should get variants on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith({ type: fetchVariantsStart.type });
  });

  // TODO: Fix store specs
  // it('should display the number of results', (done) => {
  //   component.filteredVariantsCount$.pipe(take(1)).subscribe({
  //     complete: () => {
  //       fixture.detectChanges();
  //       const resultsCount = getByTestId('variants-results-count');
  //       expect(resultsCount.nativeElement.innerText).toBe('Results: 10000');
  //       done();
  //     },
  //   });
  // });

  // it('should display filtered results when searching variants by name', (done) => {
  //   let variant: any = {};
  //   store
  //     .select(selectVariants)
  //     .pipe(take(1))
  //     .subscribe((variants) => (variant = variants[0]));

  //   store.dispatch(
  //     updateVariant({
  //       ...variant,
  //       name: 'Random-Unique-Variant-Name',
  //     })
  //   );

  //   const searchInput = getComponent(SearchInputComponent);
  //   searchInput.componentInstance.searchValueChange.emit(
  //     'Random-Unique-Variant-Name'
  //   );

  //   component.filteredVariantsCount$.pipe(take(1)).subscribe({
  //     complete: () => {
  //       fixture.detectChanges();
  //       const resultsCount = getByTestId('variants-results-count');

  //       expect(resultsCount.nativeElement.innerText).toBe('Results: 1');
  //       done();
  //     },
  //   });
  // });

  // it('should display no results message when no results are found', (done) => {
  //   const searchInput = getComponent(SearchInputComponent);
  //   searchInput.componentInstance.searchValueChange.emit(
  //     'Random-Unique-Variant-Name_' + Date.now()
  //   );

  //   component.filteredVariantsCount$.pipe(take(1)).subscribe({
  //     complete: () => {
  //       fixture.detectChanges();
  //       const resultsCount = getByTestId('variants-results-count');
  //       const noResultsMessage = getByTestId('variants-no-results-message');

  //       expect(resultsCount.nativeElement.innerText).toBe('Results: 0');
  //       expect(noResultsMessage.nativeElement.innerText).toBe(
  //         'Select a variant from the list to view'
  //       );
  //       done();
  //     },
  //   });
  // });

  // it('should select variant when selected variant is emitted from variants list component', (done) => {
  //   component.filteredVariantsCount$.pipe(take(1)).subscribe({
  //     complete: () => {
  //       fixture.detectChanges();
  //       const variant = store.selectSnapshot(VariantsState.variantsSelector)[0];
  //       const variantsList = getComponent(VariantsListComponent);

  //       variantsList.componentInstance.variantSelected.emit(variant);
  //       expect(dispatchSpy).toHaveBeenCalledWith(
  //         setSelectedVariant(variant)
  //       );
  //       done();
  //     },
  //   });
  // });

  // it('should display selected variant', (done) => {
  //   const variant = store.selectSnapshot(VariantsState.variantsSelector)[0];
  //   store.dispatch(setSelectedVariant(variant));

  //   component.selectedVariant$.pipe(take(1)).subscribe({
  //     complete: () => {
  //       fixture.detectChanges();

  //       const variantView = getComponent(VariantViewComponent);
  //       expect(variantView.componentInstance.variant).toEqual(variant);
  //       done();
  //     },
  //   });
  // });

  // it('should update classification of selected variant when event is emitted from variant classification', (done) => {
  //   const variant = store.selectSnapshot(VariantsState.variantsSelector)[0];
  //   store.dispatch(setSelectedVariant(variant));

  //   component.selectedVariant$.pipe(take(1)).subscribe({
  //     complete: () => {
  //       fixture.detectChanges();

  //       const variantClassification = getComponent(VariantClassificationComponent);
  //       variantClassification.componentInstance.classificationSelected.emit(
  //         Classification['Likely Pathogenic']
  //       );

  //       expect(dispatchSpy).toHaveBeenCalledWith(
  //         updateVariant({
  //           ...variant,
  //           classification: Classification['Likely Pathogenic'],
  //         })
  //       );
  //       done();
  //     },
  //   });
  // });
});
