import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownItemComponent } from './drop-down-item.component';

describe('DropDownItemComponent', () => {
  let component: DropDownItemComponent;
  let fixture: ComponentFixture<DropDownItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
