import { TestBed } from '@angular/core/testing';

import { OrderPizzaService } from './order-pizza.service';

describe('OrderPizzaService', () => {
  let service: OrderPizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
