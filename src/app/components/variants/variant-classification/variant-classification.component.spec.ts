import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VariantClassificationComponent } from './variant-classification.component';
import { VARIANT_CLASSIFICATION_OPTIONS } from '../../../shared/constants/variants';
import { RouterModule } from '@angular/router';

describe('VariantClassificationComponent', () => {
  let component: VariantClassificationComponent;
  let fixture: ComponentFixture<VariantClassificationComponent>;

  const variantClassificationOptions = [...VARIANT_CLASSIFICATION_OPTIONS];

  const getByTestId = (testId: string) => {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        VariantClassificationComponent,
      ],
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the variant-classification component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a header', () => {
    const header = getByTestId('variant-classification-header');
    expect(header.nativeElement.innerText).toBe('Classification:');
  });

  variantClassificationOptions.forEach((opt) => {
    it(`should have '${opt.value}' classification option`, () => {
      const radioOption = getByTestId(`variant-classification-${opt.id}`);
      expect(radioOption).toBeDefined();
    });

    it(`should have '${opt.value}' classification option label`, () => {
      const radioOption = getByTestId(`variant-classification-label-${opt.id}`);
      expect(radioOption.nativeElement.innerText).toBe(opt.value);
    });
  });

  it('should emit selected classification', () => {
    const classificationSelectedEmitSpy = spyOn(component.classificationSelected, 'emit');
    const classification = variantClassificationOptions[1];
    const option = getByTestId(`variant-classification-${classification.id}`);

    option.nativeElement.dispatchEvent(new Event('change'));
    expect(classificationSelectedEmitSpy).toHaveBeenCalledOnceWith(classification.value);
  });
});
