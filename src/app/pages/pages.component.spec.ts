import { TestBed } from '@angular/core/testing';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';

describe('PagesComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterModule, PagesComponent],
    })
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PagesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    const fixture = TestBed.createComponent(PagesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeDefined();
  });
});
