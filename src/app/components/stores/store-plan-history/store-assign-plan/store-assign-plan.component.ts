import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from '../../../packages/packages.service';
import { StoreService } from '../../stores.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { BILLING_CYCLES, filterPackagesByCycle, planDisplayDuration } from '../../../../shared/utils/plan-billing.util';

@Component({
  selector: 'app-store-assign-plan',
  templateUrl: './store-assign-plan.component.html',
  styleUrls: ['./store-assign-plan.component.scss']
})
export class StoreAssignPlanComponent implements OnInit {
  @Input() storeId: number;
  @Input() store: any;

  allPackages: any[] = [];
  packageList: any[] = [];
  selectedPackage: any = null;
  isSaving = false;
  selectedBillingCycle: 'monthly' | 'semiannual' | 'annual' = 'monthly';
  readonly billingCycles = BILLING_CYCLES;

  applyPackageLimits = true;
  useCustomLimits = false;
  productLimit = 0;
  maxOrders = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private packageservice: PackageService,
    private storeservice: StoreService,
    public sharedservice: SharedService
  ) {}

  ngOnInit(): void {
    if (this.store) {
      this.productLimit = this.store.productLimit ?? 0;
      this.maxOrders = this.store.maxOrders ?? 0;
    }
    this.loadPackages();
  }

  loadPackages() {
    this.packageservice.getPackageList().subscribe((res: any) => {
      if (res && res.data) {
        this.allPackages = res.data.map((p: any) => {
          try {
            p.benefits = typeof p.benefits === 'string' ? JSON.parse(p.benefits) : (p.benefits || []);
          } catch {
            p.benefits = [];
          }
          return p;
        });
        this.applyBillingCycleFilter();
      }
    });
  }

  selectBillingCycle(cycle: 'monthly' | 'semiannual' | 'annual') {
    this.selectedBillingCycle = cycle;
    this.applyBillingCycleFilter();
  }

  applyBillingCycleFilter() {
    this.packageList = filterPackagesByCycle(this.allPackages, this.selectedBillingCycle);
    if (!this.packageList.length) {
      this.selectedPackage = null;
      return;
    }
    const stillValid = this.packageList.find((p) => p.id === this.selectedPackage?.id);
    if (!stillValid) {
      const popular = this.packageList.find((p) => p.isRecommended) || this.packageList.find((p) => p.isPopular);
      this.selectedPackage = popular || this.packageList[0];
      this.onCustomLimitsToggle();
    }
  }

  planDurationLabel(pkg: any): string {
    return planDisplayDuration(pkg);
  }

  selectPackage(pkg: any) {
    this.selectedPackage = pkg;
    if (!this.useCustomLimits) {
      this.productLimit = pkg.productLimit ?? 0;
      this.maxOrders = pkg.maxOrders ?? 0;
    }
  }

  onCustomLimitsToggle() {
    if (this.selectedPackage && !this.useCustomLimits) {
      this.productLimit = this.selectedPackage.productLimit ?? 0;
      this.maxOrders = this.selectedPackage.maxOrders ?? 0;
    }
  }

  limitLabel(value: number): string {
    return value === 0 || value == null ? 'Unlimited' : String(value);
  }

  assignPlan() {
    if (!this.storeId || !this.selectedPackage) {
      this.sharedservice.showAlert(2, 'Select a plan');
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;

    const body: any = {
      packageId: this.selectedPackage.id,
      applyPackageLimits: this.applyPackageLimits,
    };

    if (this.applyPackageLimits && this.useCustomLimits) {
      body.productLimit = Number(this.productLimit) || 0;
      body.maxOrders = Number(this.maxOrders) || 0;
    } else if (!this.applyPackageLimits) {
      body.applyPackageLimits = false;
    }

    this.storeservice.renewStorePlan(this.storeId, body).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe({
      next: () => {
        this.sharedservice.showAlert(1, 'Plan assigned successfully');
        this.activeModal.close(true);
      },
      error: (err) => {
        this.sharedservice.showAlert(2, err.error?.message || 'Something went wrong');
      }
    });
  }
}
