import { environment } from "../environment/environment";

export let urlConstant: ReturnType<typeof buildUrlConstant>;

function buildUrlConstant() {
  const base = environment.APIUrl;
  return {
    LoginAPI: {
      loginAdministrator: base + 'users/loginUser',
      loginStoreadmin: base + 'storeadmin/loginStoreadmin',
    },
    DashboardAPI: {
      superAdminDashboard: base + 'dashboard/superAdminDashboard',
      leadsDashboard: base + 'dashboard/leadsDashboard',
      storeDashboard: base + 'dashboard/storeDashboard/',
    },
    SiteConfigAPI: {
      getSiteConfig: base + 'siteconfig/getSiteconfig',
      updateSiteConfig: base + 'siteconfig/updateSiteconfig/1',
    },
    PaymentSettingAPI: {
      getPaymentSetting: base + 'paymentsetting/getPaymentsetting',
      updatePaymentSetting: base + 'paymentsetting/updatePaymentsetting/1',
    },
    PoliciesAPI: {
      getPolicies: base + 'policies/getPolicies',
      updatePolicies: base + 'policies/updatePolicies/1',
    },
    PagesAPI: {
      getPages: base + 'pages/getAllPages',
      getAllPagesByPage: base + 'pages/getAllPagesByPage',
      addPages: base + 'pages/createPage',
      updatePages: base + 'pages/updatePage/',
      deletePages: base + 'pages/deletePage/',
    },
    PageCategorysAPI: {
      getPageCategorysAPIs: base + 'pagescategory/getAllPagesCategory',
      getAllPageCategorysByPage: base + 'pagescategory/getAllPageCategorysByPage',
      addPageCategorysAPIs: base + 'pagescategory/createPagesCategory',
      updatePageCategorysAPIs: base + 'pagescategory/updatePagesCategory/',
      deletePageCategorysAPIs: base + 'pagescategory/deletePagesCategory/',
    },
    RolesAPI: {
      getRoles: base + 'roles/getAllRoles',
      addRoles: base + 'roles/createRole',
      updateRoles: base + 'roles/updateRole/',
      deleteRoles: base + 'roles/deleteRole/',
    },
    FaqsAPI: {
      getFaqs: base + 'faq/getAllFaqs',
      getAllFaqByPage: base + 'faq/getAllFaqByPage',
      addFaq: base + 'faq/createFaq',
      updateFaq: base + 'faq/updateFaq/',
      deleteFaq: base + 'faq/deleteFaq/',
    },
    CouponsAPI: {
      getCoupons: base + 'coupon/getAllCoupons',
      getAllCouponsByPage: base + 'coupon/getAllCouponsByPage',
      addCoupon: base + 'coupon/createCoupon',
      updateCoupon: base + 'coupon/updateCoupon/',
      deleteCoupon: base + 'coupon/deleteCoupon/',
    },
    PackagesAPI: {
      getPackages: base + 'package/getAllPackages',
      getAllPackagesByPage: base + 'package/getAllPackagesByPage',
      addPackage: base + 'package/createPackage',
      updatePackage: base + 'package/updatePackage/',
      deletePackage: base + 'package/deletePackage/',
    },
    StoresAPI: {
      getStores: base + 'store/getAllStores',
      getAllStoresByPage: base + 'store/getAllStoresByPage',
      getStoreById: base + 'store/getStoreById',
      checkStoreSlug: base + 'store/checkStoreSlug',
      addStore: base + 'store/createStore',
      updateStore: base + 'store/updateStore/',
      updateStoreLimits: base + 'store/updateStoreLimits/',
      updateStoreSettings: base + 'store/updateStoreSettings/',
      deleteStore: base + 'store/deleteStore/',
      renewStorePlan: base + 'store/renew-plan/',
    },
    TransactionsAPI: {
      getTransactions: base + 'transaction/getAllTransactions',
      getAllTransactionsByPage: base + 'transaction/getAllTransactionsByPage',
      getTransactionByStoreId: base + 'transaction/getTransactionByStoreId',
      addTransaction: base + 'transaction/createTransaction',
      updateTransaction: base + 'transaction/updateTransaction/',
      deleteTransaction: base + 'transaction/deleteTransaction/',
    },
    ThemeCategorysAPI: {
      getThemeCategorys: base + 'themecategory/getAllThemeCategorys',
      getAllThemecategorysByPage: base + 'themecategory/getAllThemecategorysByPage',
      addThemeCategory: base + 'themecategory/createThemeCategory',
      updateThemeCategory: base + 'themecategory/updateThemeCategory/',
      deleteThemeCategory: base + 'themecategory/deleteThemeCategory/',
    },
    ContactleadsAPI: {
      getContactleads: base + 'contactlead/getAllContactleads',
      getAllContactleadsByPage: base + 'contactlead/getAllContactleadsByPage',
      addContactlead: base + 'contactlead/createContactlead',
      updateContactlead: base + 'contactlead/updateContactlead/',
      deleteContactlead: base + 'contactlead/deleteContactlead/',
    },
    LeadsAPI: {
      getLeads: base + 'leads/getAllLeads',
      getAllLeadsByPage: base + 'leads/getAllLeadsByPage',
      getLeadsByStatusByPage: base + 'leads/getLeadsByStatusByPage',
      addLead: base + 'leads/createLead',
      updateLead: base + 'leads/updateLead/',
      deleteLead: base + 'leads/deleteLead/',
    },
    TemplatesAPI: {
      getTemplates: base + 'template/getAllTemplates',
      getAllTemplatesByPage: base + 'template/getAllTemplatesByPage',
      getTemplateById: base + 'template/getTemplateById',
      addTemplate: base + 'template/createTemplate',
      updateTemplate: base + 'template/updateTemplate/',
      deleteTemplate: base + 'template/deleteTemplate/',
    },
    PermissionsAPI: {
      getPermissionsByRole: base + 'permissions/getPermissionsByRole/',
      rolePermissionUpdate: base + 'permissions/updatePermissionsByRole/',
      addRoles: base + 'roles/createRole',
      updateRoles: base + 'roles/updateRole/',
      deleteRoles: base + 'roles/deleteRole/',
    },
    UsersAPI: {
      getUsers: base + 'users/getAllUsers',
      getAllUsersByPage: base + 'users/getAllUsersByPage',
      addUser: base + 'users/createUser',
      updateUser: base + 'users/updateUser/',
      updateUserStatus: base + 'users/updateUserStatus/',
      deleteUser: base + 'users/deleteUser/',
    },
    TicketsAPI: {
      getTickets: base + 'tickets/getAllTickets',
      getAllTicketsByPage: base + 'tickets/getAllTicketsByPage',
      getTicketsByCustomerIdByPage: base + 'tickets/getTicketsByCustomerIdByPage',
      addTicket: base + 'tickets/createTicket',
      updateTicket: base + 'tickets/updateTicket/',
      deleteTicket: base + 'tickets/deleteTicket/',
    },
    BannersAPI: {
      getBanners: base + 'banner/getAllBanners',
      getAllBannersByPage: base + 'banner/getAllBannersByPage',
      addBanner: base + 'banner/createBanner',
      updateBanner: base + 'banner/updateBanner/',
      deleteBanner: base + 'banner/deleteBanner/',
    },
    StoreusersAPI: {
      getStoreusers: base + 'storeadmin/getAllStoreadmins',
      getAllStoreadminsByPage: base + 'storeadmin/getAllStoreadminsByPage',
      getStoreusersByStoreId: base + 'storeadmin/getStoreAdminsByStoreId/',
      addStoreuser: base + 'storeadmin/createStoreadmin',
      updateStoreuser: base + 'storeadmin/updateStoreadmin/',
      deleteStoreuser: base + 'storeadmin/deleteStoreadmin/',
    },
    FilesAPI: {
      fileUpload: base + 'file/upload',
      deleteFile: base + 'file/deleteFile/',
      getFoldersByPath: base + 'file/getFoldersByPath',
      getFilesByPath: base + 'file/getFilesByPath',
    },
  };
}

export function rebuildUrlConstant() {
  urlConstant = buildUrlConstant();
}

// Initial build (before config loads — urls will rebuild after ConfigService.load())
rebuildUrlConstant();
