Ext.define('Atlas.prescriber.view.SearchPriorAuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SearchPriorAuthController',



    LoadAuthMasterList: function() {
        var me = this,
            view = this.getViewModel(),
            MasterListStore = view.getStore('PriorAuthMasterListStore'),
            sessionId =  Ext.first('viewport').getViewModel().getData().user.retSessionID,
            username = Ext.first('viewport').getViewModel().getData().user.un;
        var d = Atlas.common.utility.Utilities.getLocalDateTime() ;
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

    exportExcel: function(view, data, e) {

            viewMdl = this.getViewModel();
        this.getView().items.map["authgrid"].saveDocumentAs({
            type: 'xlsx',
            title: 'Prior Auth Details',
            fileName: 'AuthDetail.xlsx'
            });
    },

    onOneClick: function(view, data, e){
       var fromDT = view.up().up().items.items["0"].items.items[1].rawValue,
           toDT = view.up().up().items.items["0"].items.items[3].rawValue,
           memID = view.up().up().items.items["0"].items.items[0].rawValue,
           meds = view.up().up().items.items["0"].items.items[2].rawValue,
           authStatus = view.up().up().items.items["0"].items.items[4].value,
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

    }


});