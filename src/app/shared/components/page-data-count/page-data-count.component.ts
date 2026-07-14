import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-data-count',
  templateUrl: './page-data-count.component.html',
  styleUrl: './page-data-count.component.scss'
})
export class PageDataCountComponent {
  @Input() totalCount : any;
  @Input() filteredCount : any;

}
