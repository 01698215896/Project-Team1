import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListalbumComponent } from './listalbum.component';

describe('ListalbumComponent', () => {
  let component: ListalbumComponent;
  let fixture: ComponentFixture<ListalbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListalbumComponent]
    });
    fixture = TestBed.createComponent(ListalbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
