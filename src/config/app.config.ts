interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: [],
  customerRoles: [],
  tenantRoles: ['App Owner', 'App Administrator'],
  tenantName: 'Organization',
  applicationName: 'test',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
