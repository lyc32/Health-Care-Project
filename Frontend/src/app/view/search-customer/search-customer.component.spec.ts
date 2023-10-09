import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomerComponent } from './search-customer.component';

describe('CustomerListComponent', () => {
  let component: SearchCustomerComponent;
  let fixture: ComponentFixture<SearchCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
