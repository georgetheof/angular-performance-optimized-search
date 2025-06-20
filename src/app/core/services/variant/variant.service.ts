import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

import { VariantApiService } from './variant.api.service';
import { Variant } from '../../../shared/models';

@Injectable({ providedIn: 'root' })
export class VariantService {
  private variantApiSrv = inject(VariantApiService);

  api(): VariantApiService {
    return this.variantApiSrv;
  }
}
