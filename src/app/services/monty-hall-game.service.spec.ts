import { TestBed } from '@angular/core/testing';

import { MontyHallGameService } from './monty-hall-game.service';

describe('MontyHallGameService', () => {
  let service: MontyHallGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontyHallGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
