import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logoslider } from './logoslider';

describe('Logoslider', () => {
  let component: Logoslider;
  let fixture: ComponentFixture<Logoslider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logoslider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logoslider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
