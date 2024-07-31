import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontyHallGameComponent } from './monty-hall-game.component';

describe('MontyHallGameComponent', () => {
  let component: MontyHallGameComponent;
  let fixture: ComponentFixture<MontyHallGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MontyHallGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MontyHallGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
