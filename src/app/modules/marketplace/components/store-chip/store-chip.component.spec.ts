import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreChipComponent } from './store-chip.component';

describe('StoreChipComponent', () => {
  let component: StoreChipComponent;
  let fixture: ComponentFixture<StoreChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
