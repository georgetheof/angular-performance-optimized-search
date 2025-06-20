import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VariantsListComponent } from './variants-list.component';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';

describe('VariantsListComponent', () => {
  let component: VariantsListComponent;
  let fixture: ComponentFixture<VariantsListComponent>;

  const variant = {
    id: '82d8f100-9db0-4b5c-99f5-caa524c42736',
    name: 'Variant cubitum',
    gene: 'decerno',
    location: 'Chromosome 6:340186',
    variantType: 'Missense Mutation',
    frequency: '0.09%',
    pathogenicity: 'Uncertain Significance',
    exon: 17,
    clinicalSignificance: 'Pariatur adhuc nostrum.',
    references: [
      '1c6fee7a-3696-4663-9285-7d73bf927488',
      'be8e4d3a-6efe-4a48-aad9-5a680a8b1d5d',
    ],
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        ScrollingModule,
        VariantsListComponent,
      ],
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsListComponent);
    component = fixture.componentInstance;
  });

  it('should create the variant-list component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render variant list items', fakeAsync(() => {
    component.variants = [variant];

    // Wait for cdk-virtual-scroll-viewport to load the items
    fixture.autoDetectChanges();
    tick(50);

    const variantListItem = fixture.debugElement.query(By.css(`[data-testid="variant-list-item-${variant.id}"]`));

    expect(variantListItem).toBeDefined();
    expect(variantListItem.nativeElement.innerText).toBe(variant.name);
  }));

  it('should emit selected variant when clicked', fakeAsync(() => {
    const variantSelectedEmitSpy = spyOn(component.variantSelected, 'emit');
    component.variants = [variant];

    // Wait for cdk-virtual-scroll-viewport to load the items
    fixture.autoDetectChanges();
    tick(50);

    const variantListItem = fixture.debugElement.query(By.css(`[data-testid="variant-list-item-${variant.id}"]`));
    variantListItem.nativeElement.dispatchEvent(new Event('click'));

    expect(variantSelectedEmitSpy).toHaveBeenCalledOnceWith(variant);
  }));

  it('should emit event when scroll to bottom is reached', fakeAsync(() => {
    component.variants = [variant];
    const scrolledToBottomEmitSpy = spyOn(component.scrolledToBottom, 'emit');

    // Wait for cdk-virtual-scroll-viewport to load the items
    fixture.autoDetectChanges();
    tick(50);

    spyOn(component.virtualScroll, 'measureScrollOffset').and.returnValue(10);

    const cdk = fixture.debugElement.query(By.directive(CdkVirtualScrollViewport));
    cdk.nativeElement.dispatchEvent(new Event('scrolledIndexChange'));

    expect(scrolledToBottomEmitSpy).toHaveBeenCalled();
  }));
});
