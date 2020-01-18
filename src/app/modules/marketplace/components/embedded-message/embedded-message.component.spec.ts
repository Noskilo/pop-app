import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedMessageComponent } from './embedded-message.component';

describe('EmbeddedMessageComponent', () => {
  let component: EmbeddedMessageComponent;
  let fixture: ComponentFixture<EmbeddedMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbeddedMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
