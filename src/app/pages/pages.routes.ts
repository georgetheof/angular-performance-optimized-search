import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { VariantsComponent } from './variants/variants.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'variants',
        component: VariantsComponent,
      },
      { path: '', pathMatch: 'full', redirectTo: 'variants' },
    ],
  },
];

export default routes;
