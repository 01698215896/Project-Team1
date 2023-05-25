import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldsongComponent } from './oldsong.component';

describe('OldsongComponent', () => {
  let component: OldsongComponent;
  let fixture: ComponentFixture<OldsongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OldsongComponent]
    });
    fixture = TestBed.createComponent(OldsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
