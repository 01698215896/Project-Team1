import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicplayComponent } from './musicplay.component';

describe('MusicplayComponent', () => {
  let component: MusicplayComponent;
  let fixture: ComponentFixture<MusicplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicplayComponent]
    });
    fixture = TestBed.createComponent(MusicplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
