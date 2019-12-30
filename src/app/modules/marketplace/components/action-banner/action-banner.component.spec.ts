import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBannerComponent } from './action-banner.component';

describe('ActionBannerComponent', () => {
  let component: ActionBannerComponent;
  let fixture: ComponentFixture<ActionBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
