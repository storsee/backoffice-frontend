import { Routes } from "@angular/router";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { UsersComponent } from "../../components/users/users.component";
import { RolesComponent } from "../../components/roles/roles.component";
import { PagesComponent } from "../../components/pages/pages.component";
import { PageCategoriesComponent } from "../../components/page-categories/page-categories.component";
import { BannersComponent } from "../../components/banners/banners.component";
import { TicketsComponent } from "../../components/tickets/tickets.component";
import { FaqComponent } from "../../components/faq/faq.component";
import { CouponsComponent } from "../../components/coupons/coupons.component";
import { ThemeCategoryComponent } from "../../components/theme-category/theme-category.component";
import { TemplatesComponent } from "../../components/templates/templates.component";
import { PackagesComponent } from "../../components/packages/packages.component";
import { StoresComponent } from "../../components/stores/stores.component";
import { ContactLeadsComponent } from "../../components/contact-leads/contact-leads.component";
import { SiteConfigurationComponent } from "../../components/site-configuration/site-configuration.component";
import { StoreUsersComponent } from "../../components/store-users/store-users.component";
import { PoliciesComponent } from "../../components/policies/policies.component";
import { TransactionsComponent } from "../../components/transactions/transactions.component";
import { PaymentSettingComponent } from "../../components/payment-setting/payment-setting.component";
import { FileManagerComponent } from "../../components/file-manager/file-manager.component";
import { LeadDashboardComponent } from "../../components/lead-dashboard/lead-dashboard.component";
import { LeadsComponent } from "../../components/leads/leads.component";
export const routing: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: "full"
    },{
        path: '',
        component: DashboardComponent
    },{
        path: 'dashboard',
        component: DashboardComponent
    },{
        path: 'users',
        component: UsersComponent
    },{
        path: 'roles',
        component: RolesComponent
    },{
        path: 'pages',
        component: PagesComponent
    },{
        path: 'page-categories',
        component: PageCategoriesComponent
    },{
        path: 'banners',
        component: BannersComponent
    },{
        path: 'tickets',
        component: TicketsComponent
    },{
        path: 'faq',
        component: FaqComponent
    },{
        path: 'coupons',
        component: CouponsComponent
    },{
        path: 'theme-category',
        component: ThemeCategoryComponent
    },{
        path: 'templates',
        component: TemplatesComponent
    },{
        path: 'packages',
        component: PackagesComponent
    },{
        path: 'stores',
        component: StoresComponent
    },{
        path: 'contact-leads',
        component: ContactLeadsComponent
    },{
        path: 'site-configuration',
        component: SiteConfigurationComponent
    },{
        path: 'store-users',
        component: StoreUsersComponent
    },{
        path: 'policies',
        component: PoliciesComponent
    },{
        path: 'transactions',
        component: TransactionsComponent
    },{
        path: 'payment-setting',
        component: PaymentSettingComponent
    },{
        path: 'file-manager',
        component: FileManagerComponent
    },{
        path: 'lead-dashboard',
        component: LeadDashboardComponent
    },{
        path: 'leads',
        component: LeadsComponent
    },{
        path: '**',
        component: DashboardComponent
    },
]