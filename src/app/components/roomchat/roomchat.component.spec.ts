import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomchatComponent } from './roomchat.component';

describe('RoomchatComponent', () => {
  let component: RoomchatComponent;
  let fixture: ComponentFixture<RoomchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomchatComponent]
    });
    fixture = TestBed.createComponent(RoomchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
