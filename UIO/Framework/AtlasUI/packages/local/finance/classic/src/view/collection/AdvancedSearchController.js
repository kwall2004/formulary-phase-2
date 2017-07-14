Ext.define('Atlas.finance.view.collection.AdvancedSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-collection-advsearch',

    init: function(){
        var storeProxy = this.getViewModel().getStore("storeCollectioncreditmasterext").getProxy();

        storeProxy.setExtraParam('pBatchSize', 0);
        storeProxy.setExtraParam('pagination', true);
    },

    onSearch: function () {
        var me = this,
            vm = me.getViewModel();
        var where ='';

        if(!Ext.isEmpty(vm.get("recipientID"))){
            where ="recipientID = '" +vm.get("recipientID")+ "' AND ";
        }

        if(me.getView().down("#itemidlettertype").getValue())
             where +="letterNameID = '"+ me.getView().down("#itemidlettertype").getValue() +"' AND ";

        if(me.getView().down("#dateFrom").getValue())
             where +="CreateDate >= '"+ Ext.Date.format(new Date(me.getView().down("#dateFrom").getValue()), 'm/d/Y') +"' AND ";

        if(me.getView().down("#dateTo").getValue())
            where +="CreateDate <= '"+ Ext.Date.format(new Date(me.getView().down("#dateTo").getValue()), 'm/d/Y') +"' AND ";

        if(where.length > 3)
        {
            where = where.substring(0,where.length-5);
        }

        var storeCollectioncreditmasterext = vm.getStore("storeCollectioncreditmasterext");

        storeCollectioncreditmasterext.getProxy().setExtraParam('pWhere', where);

        storeCollectioncreditmasterext.load();
    },

    changeddateformat : function(value, metaData, record, rowIndex, colIndex, store, view) {
        if(!value)
            return '';
        return value.replace('AM','').replace('PM','');
    },

    changeDateFormatCreateDate: function(value){
        return Ext.util.Format.date(Ext.Date.utcToLocal(new Date(value)), 'm/d/Y');
    },

    onLeaveDate:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },

    onReset: function (bt) {
        var me = this;
        me.getView().down("#itemIdmembertypeaheadbox").setValue("");
        me.getViewModel().set("recipientID","");
        me.getView().down("#dateFrom").setValue("");
        me.getView().down("#dateTo").setValue("");
    },

    onLettersListLoad: function (store, records) {
        store.filter('moduleName', 'Finance');
        this.getViewModel().set("recipientID","");
        if(store.data.items.length!=0)
        this.getView().down("#itemidlettertype").setValue(store.data.items[0].data.LetterNameID);
    },

    membertypeaheadboxselect: function(member) {
        // if(member.lastSelection[0].data.recipientID)
        // this.getViewModel().set("recipientID",member.lastSelection[0].data.recipientID);
        this.getViewModel().set("recipientID",member.getValue());

    },

    gpAdvanceSearch_itemclick : function (dv, record, item, index, e){
       // var controller = Ext.create('Atlas.finance.view.collection.CollectionController');
        this.fireEvent('financecollectionadvsearchcontrolleronLoadSelected',record,true);
        this.btncancel();
    },


    btncancel :function () {
        var   winopen = Ext.WindowManager.getActive();
        if (winopen) {
            winopen.close();
        }
    }
});