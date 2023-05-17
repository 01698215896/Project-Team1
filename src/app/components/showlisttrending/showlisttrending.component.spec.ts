import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowlisttrendingComponent } from './showlisttrending.component';

describe('ShowlisttrendingComponent', () => {
  let component: ShowlisttrendingComponent;
  let fixture: ComponentFixture<ShowlisttrendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowlisttrendingComponent]
    });
    fixture = TestBed.createComponent(ShowlisttrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
