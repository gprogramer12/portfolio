import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onespinner } from './onespinner';

describe('Onespinner', () => {
  let component: Onespinner;
  let fixture: ComponentFixture<Onespinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Onespinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Onespinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
