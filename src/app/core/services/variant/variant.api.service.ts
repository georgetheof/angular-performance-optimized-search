import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { Variant } from '../../../shared/models';

@Injectable({ providedIn: 'root' })
export class VariantApiService {
  private readonly controller = 'variant';

  constructor(private http: HttpClient) {}

  fetchVariants(): Observable<Variant[]> {
    const variantsBatch = this.generateVariantBatch();
    return of([...variantsBatch]).pipe(delay(500));
  }

  generateVariantBatch(): Variant[] {
    const variants: Variant[] = [];
    for (let i = 0; i < 10000; i++) {
      const variant = this.generateVariant();
      variants.push(variant);
    }
    return variants;
  }

  private generateVariant(): Variant {
    return {
      id: faker.string.uuid(),
      name: `Variant ${faker.lorem.word()}`,
      gene: faker.lorem.word(),
      location: `Chromosome ${faker.number.int(22)}:${faker.number.int(
        1000000
      )}`,
      variantType: faker.helpers.arrayElement([
        'Missense Mutation',
        'Frameshift Deletion',
        'Insertion',
      ]),
      frequency: `${faker.number.int({ min: 1, max: 10 }) / 100}%`,
      pathogenicity: faker.helpers.arrayElement([
        'Benign',
        'Likely Benign',
        'Uncertain Significance',
        'Likely Pathogenic',
        'Pathogenic',
      ]),
      exon: faker.number.int({ min: 1, max: 20 }),
      clinicalSignificance: faker.lorem.sentence(),
      references: [faker.string.uuid(), faker.string.uuid()],
    };
  }
}
