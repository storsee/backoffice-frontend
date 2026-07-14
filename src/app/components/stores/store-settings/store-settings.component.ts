import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from '../stores.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-store-settings',
  templateUrl: './store-settings.component.html',
  styleUrls: ['./store-settings.component.scss']
})
export class StoreSettingsComponent implements OnInit {
  @Input() store: any;

  isSaving = false;
  fullAccess = true;

  isActive = true;
  isLocked = false;
  isBlacklisted = false;
  allowStorefront = true;
  allowDashboard = true;
  allowCheckout = true;
  allowProductAdd = true;

  useCustomProductLimit = false;
  useCustomOrderLimit = false;
  productLimit = 150;
  maxOrders = 100;

  lockReason = '';
  adminNotes = '';

  constructor(
    public activeModal: NgbActiveModal,
    private storeservice: StoreService,
    public sharedservice: SharedService,
  ) {}

  ngOnInit(): void {
    if (!this.store) return;
    this.isActive = !!this.store.isActive;
    this.isLocked = !!this.store.isLocked;
    this.isBlacklisted = !!this.store.isBlacklisted;
    this.allowStorefront = this.store.allowStorefront !== 0 && this.store.allowStorefront !== false;
    this.allowDashboard = this.store.allowDashboard !== 0 && this.store.allowDashboard !== false;
    this.allowCheckout = this.store.allowCheckout !== 0 && this.store.allowCheckout !== false;
    this.allowProductAdd = this.store.allowProductAdd !== 0 && this.store.allowProductAdd !== false;
    this.lockReason = this.store.lockReason || '';
    this.adminNotes = this.store.adminNotes || '';

    const pl = Number(this.store.productLimit || 0);
    const mo = Number(this.store.maxOrders || 0);
    this.useCustomProductLimit = pl > 0;
    this.useCustomOrderLimit = mo > 0;
    this.productLimit = pl > 0 ? pl : 150;
    this.maxOrders = mo > 0 ? mo : 100;

    this.syncFullAccessFlag();
  }

  limitLabel(value: number): string {
    return !value || value <= 0 ? 'Unlimited' : String(value);
  }

  syncFullAccessFlag() {
    this.fullAccess =
      !this.isLocked &&
      !this.isBlacklisted &&
      !!this.isActive &&
      this.allowStorefront &&
      this.allowDashboard &&
      this.allowCheckout &&
      this.allowProductAdd;
  }

  onFullAccessChange(enabled: boolean) {
    if (enabled) {
      this.restoreFullAccess();
    }
    this.syncFullAccessFlag();
  }

  onLockChange(enabled: boolean) {
    if (enabled) {
      this.allowDashboard = false;
      this.allowStorefront = false;
      if (!this.lockReason) {
        this.lockReason = 'Store locked by platform administrator.';
      }
    } else if (!this.isBlacklisted) {
      this.allowStorefront = true;
      this.allowDashboard = true;
    }
    this.syncFullAccessFlag();
  }

  onBlacklistChange(enabled: boolean) {
    if (enabled) {
      this.isLocked = true;
      this.isActive = false;
      this.allowStorefront = false;
      this.allowDashboard = false;
      this.allowCheckout = false;
      this.allowProductAdd = false;
      if (!this.lockReason) {
        this.lockReason = 'Store blacklisted by platform administrator.';
      }
    } else {
      this.isLocked = false;
      this.isActive = true;
      this.allowStorefront = true;
      this.allowDashboard = true;
      this.allowCheckout = true;
      this.allowProductAdd = true;
      if (
        this.lockReason === 'Store blacklisted by platform administrator.' ||
        this.lockReason === 'Store locked by platform administrator.'
      ) {
        this.lockReason = '';
      }
    }
    this.syncFullAccessFlag();
  }

  onFeatureChange() {
    this.syncFullAccessFlag();
  }

  restoreFullAccess() {
    this.isLocked = false;
    this.isBlacklisted = false;
    this.isActive = true;
    this.allowStorefront = true;
    this.allowDashboard = true;
    this.allowCheckout = true;
    this.allowProductAdd = true;
    this.lockReason = '';
    this.fullAccess = true;
  }

  saveSettings() {
    if (!this.store?.id) return;
    if (this.isSaving) return;

    if (this.useCustomProductLimit && (!this.productLimit || this.productLimit < 1)) {
      this.sharedservice.showAlert(2, 'Enter a valid product limit (minimum 1) or choose Unlimited');
      return;
    }
    if (this.useCustomOrderLimit && (!this.maxOrders || this.maxOrders < 1)) {
      this.sharedservice.showAlert(2, 'Enter a valid order limit (minimum 1) or choose Unlimited');
      return;
    }

    this.isSaving = true;
    const body = {
      isActive: this.isActive,
      isLocked: this.isLocked,
      isBlacklisted: this.isBlacklisted,
      allowStorefront: this.allowStorefront,
      allowDashboard: this.allowDashboard,
      allowCheckout: this.allowCheckout,
      allowProductAdd: this.allowProductAdd,
      productLimit: this.useCustomProductLimit ? Number(this.productLimit) : 0,
      maxOrders: this.useCustomOrderLimit ? Number(this.maxOrders) : 0,
      lockReason: this.lockReason,
      adminNotes: this.adminNotes,
    };

    this.storeservice.updateStoreSettings(this.store.id, body).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe({
      next: () => {
        this.sharedservice.showAlert(1, 'Store settings saved');
        this.activeModal.close(true);
      },
      error: (err) => {
        this.sharedservice.showAlert(2, err.error?.message || err.error?.error || 'Something went wrong');
      }
    });
  }
}
