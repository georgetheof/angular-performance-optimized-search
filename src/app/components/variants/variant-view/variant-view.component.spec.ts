import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VariantViewComponent } from './variant-view.component';
import { RouterModule } from '@angular/router';

describe('VariantViewComponent', () => {
  let component: VariantViewComponent;
  let fixture: ComponentFixture<VariantViewComponent>;

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

  const getByTestId = (testId: string) => {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        VariantViewComponent,
      ],
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantViewComponent);
    component = fixture.componentInstance;
    component.variant = variant;
    fixture.detectChanges();
  });

  it('should create the variant-view component', () => {
    expect(component).toBeTruthy();
  });

  it('should display variant name', () => {
    const name = getByTestId('variant-view-name');
    expect(name.nativeElement.innerText).toBe('Variant cubitum');
  });

  it('should display variant gene', () => {
    const gene = getByTestId('variant-view-gene');
    expect(gene.nativeElement.innerText).toBe('Gene: decerno');
  });

  it('should display variant location', () => {
    const location = getByTestId('variant-view-location');
    expect(location.nativeElement.innerText).toBe(
      'Location: Chromosome 6:340186'
    );
  });

  it('should display variant type', () => {
    const type = getByTestId('variant-view-variant-type');
    expect(type.nativeElement.innerText).toBe(
      'Variant Type: Missense Mutation'
    );
  });

  it('should display variant frequency', () => {
    const frequency = getByTestId('variant-view-frequency');
    expect(frequency.nativeElement.innerText).toBe('Frequency: 0.09%');
  });

  it('should display variant pathogenicity', () => {
    const pathogenicity = getByTestId('variant-view-pathogenicity');
    expect(pathogenicity.nativeElement.innerText).toBe(
      'Pathogenicity: Uncertain Significance'
    );
  });

  it('should display variant exon', () => {
    const exon = getByTestId('variant-view-exon');
    expect(exon.nativeElement.innerText).toBe('Exon: 17');
  });

  it('should display variant clinical significance', () => {
    const clinicalSignificance = getByTestId(
      'variant-view-clinical-significance'
    );
    expect(clinicalSignificance.nativeElement.innerText).toBe(
      'Clinical Significance: Pariatur adhuc nostrum.'
    );
  });

  it('should display variant references', () => {
    const name = getByTestId('variant-view-references');
    expect(name.nativeElement.innerText).toBe(
      'References: 1c6fee7a-3696-4663-9285-7d73bf927488, be8e4d3a-6efe-4a48-aad9-5a680a8b1d5d'
    );
  });
});
