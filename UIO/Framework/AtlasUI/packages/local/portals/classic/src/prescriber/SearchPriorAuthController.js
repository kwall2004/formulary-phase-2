Ext.define('Atlas.portals.view.prescriber.SearchPriorAuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PortalsRxSearchPriorAuthController',



    LoadAuthMasterList: function() {
        var me = this,
            view = this.getViewModel(),
            MasterListStore = view.getStore('PriorAuthMasterListStore'),
            sessionId =  Ext.first('viewport').getViewModel().getData().user.retSessionID,
            username = Ext.first('viewport').getViewModel().getData().user.un;
        var d = new Date();
        var strFromDate = (d.getMonth())  + "/" +  d.getDate() + "/" + d.getFullYear();
        var strToDate = (d.getMonth()+1)  + "/" +  d.getDate() + "/" + d.getFullYear();

        MasterListStore.getProxy().setExtraParam('pSessionID',sessionId);
        MasterListStore.getProxy().setExtraParam('pKeyType','prescriber');
        MasterListStore.getProxy().setExtraParam('pKeyValue',username);
        MasterListStore.getProxy().setExtraParam('pFromDate',strFromDate);
        MasterListStore.getProxy().setExtraParam('pToDate',strToDate);
        MasterListStore.getProxy().setExtraParam('pRecipientId','0');
        MasterListStore.getProxy().setExtraParam('pBrand','');
        MasterListStore.getProxy().setExtraParam('pPAStat','');
        MasterListStore.load();

    },

    init: function() {
        var me = this,
            view = this.getViewModel(),
            FStore = view.getStore('PriorAuthStore'),
            recipientId = Ext.first('viewport').getViewModel().getData().user.retRecipientID;

        FStore.getProxy().setExtraParam('pListName','PriorAuthStatusPortal');
        FStore.load();

            this.LoadAuthMasterList();//working fine

    },

    resetControls: function() {
        this.lookupReference('authStatus').setValue('');
        this.lookupReference('member').setValue('');
        this.lookupReference('drugSearch').setValue('');
        this.lookupReference('dateTo').setValue(new Date());
        this.lookupReference('dateFrom').setValue(Ext.Date.add(new Date(), Ext.Date.MONTH, -1));
        this.init();
    },

    exportExcel: function(view, data, e) {

            viewMdl = this.getViewModel();
        this.getView().items.map["authgrid"].saveDocumentAs({
            type: 'xlsx',
            title: 'Prior Auth Details',
            fileName: 'AuthDetail.xlsx'
            });
    },

    onOneClick: function(view, data, e){
       var fromDT = this.lookupReference('dateFrom').value,
           toDT = this.lookupReference('dateTo').value,
           memID = this.lookupReference('member').value,
           meds = this.lookupReference('drugSearch').value,
           authStatus = this.lookupReference('authStatus').value,
            viewMdl = this.getViewModel(),
            MasterListStore = viewMdl.getStore('PriorAuthMasterListStore'),
            sessionId =  Ext.first('viewport').getViewModel().getData().user.retSessionID,
            username = Ext.first('viewport').getViewModel().getData().user.un;

        switch(authStatus)
        {
            case 'Pending':
                authStatus = 2;
                break;
            case 'Approved':
                authStatus = 1;
                break;
            case 'Denied':
                authStatus = 3;
                break;
            case 'Incomplete':
                authStatus = 4;
                break;
            default:
                authStatus = "";
        }

        MasterListStore.getProxy().setExtraParam('pSessionID',sessionId);
        MasterListStore.getProxy().setExtraParam('pKeyType','prescriber');
        MasterListStore.getProxy().setExtraParam('pKeyValue',username);
        MasterListStore.getProxy().setExtraParam('pFromDate',fromDT);
        MasterListStore.getProxy().setExtraParam('pToDate',toDT);
        MasterListStore.getProxy().setExtraParam('pRecipientId', memID);
        MasterListStore.getProxy().setExtraParam('pBrand',meds);
        MasterListStore.getProxy().setExtraParam('pPAStat',authStatus);
        MasterListStore.load();

    },

    hedisAction: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex),
            id = record.get('recipientID') ? record.get('recipientID') : record.get('recipientid');

        Ext.create('Ext.window.Window', {
            title: 'HEDIS Details (' + record.get('memberName') + ')',
            modal: true,
            items: {
                xtype: 'portalsprescriberhedisalertwindow',
                viewModel: {
                    stores: {
                        hedisAlerts: {
                            model: 'Atlas.portals.prescriber.model.MemberHedisSummary'
                        }
                    },

                    data: {
                        id: id
                    }
                }
            }
        }).show();
    },

    viewPA: function(rec) {
        this.fireEvent('openView','rxprescriber','portals','prescriber_CreatePriorAuth', {
            keyType: 'AuthID',
            keyValue: rec.get('authID'),
            viewOnly: true,
            atlasId: rec.get('authID') + '-view'
        });
    },

    updatePA: function(rec) {
        this.fireEvent('openView','rxprescriber','portals','prescriber_CreatePriorAuth', {
            keyType: 'AuthID',
            keyValue: rec.get('authID'),
            viewOnly: false,
            atlasId: rec.get('authID') + '-update'
        });
    },

    refreshPA: function(grid) {
        var termDate = grid.getWidgetRecord().get('TermDateTime'),
            authStatus = '';

        if (termDate && (new Date(termDate).getTime() < new Date().getTime())) {
            authStatus = grid.getWidgetRecord().get('authStatus');
        }

        this.fireEvent('openView','rxprescriber','portals','prescriber_CreatePriorAuth', {
            keyType: 'AuthID',
            keyValue: grid.getWidgetRecord().get('authID'),
            authStatus: authStatus,
            atlasId: grid.getWidgetRecord().get('authID') + '-refresh'
        });
    }
});