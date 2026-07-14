export type BillingCycleId = 'monthly' | 'semiannual' | 'annual';

export const BILLING_CYCLES: { id: BillingCycleId; label: string }[] = [
  { id: 'monthly', label: '1 Month' },
  { id: 'semiannual', label: '6 Months' },
  { id: 'annual', label: '1 Year' },
];

export function inferBillingCycle(pkg: any): BillingCycleId {
  if (pkg?.billingCycle) return pkg.billingCycle;
  const d = Number(pkg?.duration || 0);
  if (d >= 365) return 'annual';
  if (d >= 180) return 'semiannual';
  return 'monthly';
}

export function filterPackagesByCycle(packages: any[], cycle: BillingCycleId): any[] {
  return (packages || []).filter((p) => inferBillingCycle(p) === cycle);
}

export function planDisplayDuration(pkg: any): string {
  return pkg?.billingLabel || durationDaysLabel(Number(pkg?.duration || 0));
}

function durationDaysLabel(days: number): string {
  if (days >= 365) return '1 Year';
  if (days >= 180) return '6 Months';
  if (days >= 30) return '1 Month';
  return `${days} days`;
}
