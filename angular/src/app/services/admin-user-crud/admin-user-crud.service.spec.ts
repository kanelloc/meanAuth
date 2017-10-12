import { TestBed, inject } from '@angular/core/testing';

import { AdminUserCrudService } from './admin-user-crud.service';

describe('AdminUserCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminUserCrudService]
    });
  });

  it('should be created', inject([AdminUserCrudService], (service: AdminUserCrudService) => {
    expect(service).toBeTruthy();
  }));
});
