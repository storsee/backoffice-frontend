import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../transactions/transactions.service';
import { StoreAssignPlanComponent } from './store-assign-plan/store-assign-plan.component';

@Component({
  selector: 'app-store-plan-history',
  templateUrl: './store-plan-history.component.html',
  styleUrls: ['./store-plan-history.component.scss']
})
export class StorePlanHistoryComponent implements OnInit {
  @Input() store: any;

  isLoading = false;
  isError = false;
  transactions: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private transactionservice: TransactionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.store && this.store.id) {
      this.loadTransactions();
    }
  }

  loadTransactions() {
    this.isLoading = true;
    this.isError = false;
    this.transactionservice.getTransactionByStoreId(this.store.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res && res.data) {
          this.transactions = res.data;
        } else {
          this.transactions = [];
        }
      },
      error: () => {
        this.isLoading = false;
        this.isError = true;
      }
    });
  }

  openAssignPlan() {
    if (!this.store || !this.store.id) {
      return;
    }
    const modalRef = this.modalService.open(StoreAssignPlanComponent, {
      size: 'lg',
      backdrop: 'static',
      centered: true
    });
    modalRef.componentInstance.storeId = this.store.id;
    modalRef.componentInstance.store = this.store;
    modalRef.result.then(result => {
      if (result) {
        this.loadTransactions();
      }
    }, () => {});
  }
}
