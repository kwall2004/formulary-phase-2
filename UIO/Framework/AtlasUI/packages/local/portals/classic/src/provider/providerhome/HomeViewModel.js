// k3279 - Kevin Tabasan - 11/10/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.providerhomeviewmodel',

  stores: {
    notifications: {
      model: 'Atlas.portals.provider.model.Notification',
      listeners: {
        load: 'onNotificationMessagesLoad'
      }
    },

    notificationMessages: {
      proxy: {
        type: 'memory'
      },
      sorters: [
        {
          property: 'date',
          direction: 'DESC'
        }
      ]
    },

    batchList: {
      proxy: {
        type: 'memory'
      }
    },

    portalFuncs: {
      model: 'Atlas.portals.provider.model.PortalMemberFuncs'
    },

    coc: {
      model: 'Atlas.portals.provider.model.COCMessage',
      sorters: [
        {
          property: 'createDate',
          direction: 'DESC'
        }
      ]
    },

    notificationStatuses: {
      model: 'Atlas.portals.provider.model.NotificationStatus'
    },

    messageStatuses: {
      model: 'Atlas.portals.provider.model.MessagesStatus'
    },

    deleteNotifications: {
      model: 'Atlas.portals.provider.model.DeleteNotification'
    },

    printNotifications: {
      model: 'Atlas.portals.provider.model.PrintNotification'
    },
    providerList: {
      model: 'Atlas.portals.provider.model.ProviderList',
      listeners: {
        load: 'reformatProviderList'
      }
    },

    memberData: {
      model: 'Atlas.portals.hpmember.model.MemberDataWeb'
    },

    reformattedProviderList: {
      proxy: {
        type: 'memory'
      }
    },
    userPrefs: {
      model: 'Atlas.portals.provider.model.UserSetupWeb'
    }
  }
});