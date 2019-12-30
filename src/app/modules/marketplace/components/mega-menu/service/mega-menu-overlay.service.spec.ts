import { TestBed } from '@angular/core/testing';

import { MegaMenuOverlayService } from './mega-menu-overlay.service';

describe('MegaMenuOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MegaMenuOverlayService = TestBed.get(MegaMenuOverlayService);
    expect(service).toBeTruthy();
  });
});
