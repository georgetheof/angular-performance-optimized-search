import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Classification } from '../../../shared/models';
import { VARIANT_CLASSIFICATION_OPTIONS } from '../../../shared/constants/variants';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-variant-classification',
  templateUrl: './variant-classification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantClassificationComponent {
  @Input() selectedClassification: Classification | null = null;

  @Output() classificationSelected: EventEmitter<Classification> =
    new EventEmitter();

  readonly variantClassificationOptions = [...VARIANT_CLASSIFICATION_OPTIONS];

  onClassificationSelected(e: any) {
    const newClassification = Classification[
      e.target.value
    ] as unknown as Classification;

    this.classificationSelected.emit(newClassification);
  }
}
