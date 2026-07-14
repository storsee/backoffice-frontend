import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-package-benefits',
  templateUrl: './package-benefits.component.html',
  styleUrl: './package-benefits.component.scss'
})
export class PackageBenefitsComponent {
  @Input() name;
  @Input() data;

  constructor(public activeModal : NgbActiveModal){}

}
