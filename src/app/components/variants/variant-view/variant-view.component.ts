import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Variant } from '../../../shared/models';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-variant-view',
  templateUrl: './variant-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantViewComponent {
  @Input() variant: Variant | null = null;

  get references(): string {
    if (!this.variant?.references?.length) return 'N/A';

    return this.variant.references.join(', ');
  }
}
