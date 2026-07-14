export class PackageReqModel {
    slug: string = '';
    tierSlug: string = 'starter';
    billingCycle: string = 'monthly';
    billingLabel: string = '1 Month';
    name: string;
    tagline: string = '';
    description: string = '';
    amount: number;
    duration: number;
    productLimit: number;
    maxOrders: number = 0;
    trialDays: number = 0;
    color: string = '#1d68f1';
    isPopular: boolean = false;
    isRecommended: boolean = false;
    isActive: boolean = true;
    sortOrder: number = 0;
    benefits: string;
    features: string = '{}';
}
