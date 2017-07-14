Ext.define('Atlas.letter.controller.AdvancedSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.letter-advsearch',

    init: function () {
        //Load Main menus for the right side - have to know parent Id
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            letterTypesStore = vm.getStore('lettertypes'),
            proxy = letterTypesStore.getProxy();

        letterTypesStore.filterBy(function(record){
            var templateName = record.get('LetterTemplateName').toLowerCase();
            switch (templateName) {
                case 'na':
                case 'n/a':
                //case 'formularychange.aspx':
                case 'collectioncredit.aspx':
                case 'cobc.aspx':
                    return false;
                    break;
                default:
                    return true;
                    break;
            }
        });
        letterTypesStore.load({callback: function(records){
            // Select first option in advLetterType combo box
            //var rec = letterTypesStore.getAt(0);
            //view.down('#advLetterType').setValue(rec.data.LetterNameID);
        }});
    },
    onLeaveDate:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },
    onAdvSearch: function () {
        var me = this,
            vm = me.getViewModel(),
            parmMemberName = '',
            parmFromDate='',
            parmLetterType='',
            parmToDate = '',
            store = this.getViewModel().getStore('letterdetailsstore'),
            whereClause='';

        vm.set('searchValues', me.getView().down('form').getValues());

        if(vm.get('searchValues').advMemberName)
            parmMemberName = vm.get('searchValues').advMemberName;
        if(vm.get('searchValues').advSentFromDate)
            parmFromDate   = vm.get('searchValues').advSentFromDate;
        if(vm.get('searchValues').advLetterType)
            parmLetterType = vm.get('searchValues').advLetterType;
        if(vm.get('searchValues').advSentToDate)
            parmToDate     = vm.get('searchValues').advSentToDate;

        if(parmLetterType != ''){
            whereClause = ' LetterNameID = "' + parmLetterType + '" ';
        }

        if(parmMemberName != ''){
            whereClause+=  (whereClause == ''? '' : ' and ') + ' recipientID = "' + parmMemberName + '" ';
        }

        if (parmFromDate!=''){
            whereClause+= (whereClause == ''? '' : ' and ') + ' SentDate >= "' + parmFromDate + '" ';
        }

        if(parmToDate != ''){
            whereClause+= (whereClause == ''? '' : ' and ') + ' SentDate <= "' + parmToDate + '" ';
        }
        if(whereClause != '') {
            store.getProxy().setExtraParam('pWhere', whereClause);
            store.getProxy().setExtraParam('pSort', '');
            //store.getProxy().setExtraParam('pBatchSize', '350');
            store.getProxy().setExtraParam('pBatchSize', '');
            store.loadPage(1);
        }
    },

    onReset: function (bt) {
        bt.up('form').reset();
        var view = this.getView();
        view.down('#gdLetterSearch').store.removeAll();
        view.down('#gdLetterSearch_PagingToolBar').onLoad();
    },

    onRecordSelect: function (grid, rec) {
        var me = this;

        me.fireEvent('AdvRowSelect', rec);
        me.getView().close();
    },

    onStateChange: function (combo, value) {
        /*var me = this;
        var store = this.getViewModel().getStore('letterdetailsstore');
        store.getProxy().setExtraParam('pWhere', ' LetterNameID = ' + value + ' ');
        store.getProxy().setExtraParam('pSort', '');
        store.getProxy().setExtraParam('pBatchSize', '1000');

        //me.getView().mask('Loading...');
        //me.getView().unmask();
        store.load();*/
    },

    buildSearchQuery: function (store, operation) {
        var me = this,
            vm = me.getViewModel(),
            data = vm.get('searchValues'),
            //proxy = store.getProxy(),
            where,
            parts = [];

        if (data.letterType) {
            parts.push("LocState='" + data.letterType + "'");
            if (data.county) {
                parts.push("locCounty='" + data.county + "'");
            }
        }

        /*if (data.zip) {
            parts.push("locZip begins '" + data.zip + "'");
        }

        if (data.city) {
            parts.push("locCity='" + data.city + "'");
        }

        if (data.name) {
            parts.push("wrdIdx contains '" + data.name + '*');
        }*/

        where = parts.join(' and ');

        if (!where && !data.pic) {
            Ext.Msg.alert('Message', 'Please enter at least one search criteria');
        }
        else {
            if (data.pic) {
                //Note check added to ensure we are clearing out previous value
                //proxy.setExtraParam('pPIC', data.pic ? data.pic + '*' : '');
            }

            //proxy.setExtraParam('pWhere', where);
        }

        return true;
    }
});