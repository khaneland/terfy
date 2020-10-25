export const availableExtensions = new Set([
  'onApp',
  'onWindowClass',
  'decorateWindowClass',
  'onWindow',
  'onRendererWindow',
  'onUnload',
  'decorateSessionClass',
  'decorateSessionOptions',
  'middleware',
  'reduceUI',
  'reduceSessions',
  'reduceTermGroups',
  'decorateBrowserOptions',
  'decorateMenu',
  'decorateTerm',
  'decorateTerfy',
  'decorateTerfyTerm', // for backwards compatibility with Terfyterm
  'decorateHeader',
  'decorateTerms',
  'decorateTab',
  'decorateNotification',
  'decorateNotifications',
  'decorateTabs',
  'decorateConfig',
  'decorateKeymaps',
  'decorateEnv',
  'decorateTermGroup',
  'decorateSplitPane',
  'getTermProps',
  'getTabProps',
  'getTabsProps',
  'getTermGroupProps',
  'mapTerfyTermState',
  'mapTermsState',
  'mapHeaderState',
  'mapNotificationsState',
  'mapTerfyTermDispatch',
  'mapTermsDispatch',
  'mapHeaderDispatch',
  'mapNotificationsDispatch'
]);