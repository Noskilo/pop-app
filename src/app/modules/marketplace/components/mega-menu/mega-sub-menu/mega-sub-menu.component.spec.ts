import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaSubMenuComponent } from './mega-sub-menu.component';

describe('MegaSubMenuComponent', () => {
  let component: MegaSubMenuComponent;
  let fixture: ComponentFixture<MegaSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
