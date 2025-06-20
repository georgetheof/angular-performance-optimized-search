import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { SearchInputComponent } from './search-input.component';

describe('CustomInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display the search input field', () => {
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('input');
    expect(searchInput).toBeTruthy();
  });

  it('should render with default label', () => {
    fixture.detectChanges();

    const searchInputLabel = fixture.nativeElement.querySelector('label');
    expect(searchInputLabel.textContent).toBe('Search');
  });

  it('should render with custom label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const searchInputLabel = fixture.nativeElement.querySelector('label');
    expect(searchInputLabel.textContent).toBe('Test Label');
  });

  it('should emit search input value', () => {
    const searchValueChangeEmitSpy = spyOn(component.searchValueChange, 'emit');
    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'Testing emitted value';
    searchInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(searchValueChangeEmitSpy).toHaveBeenCalledOnceWith('Testing emitted value');
  });
});
