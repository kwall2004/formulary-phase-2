Ext.define('Atlas.finance.view.audit.AdvancedSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-audit-advsearch',

    onSearch: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            audittakebacks = this.getViewModel().getStore('advsearchresults'),
            formVals = me.getView().down('form').getValues(),
            emptyFlag = true,
            myProxy = audittakebacks.getProxy();

        // audittakebacks.onAfter('load', 'onAuditTakebacksLoad');

        for(field in formVals){
            if(formVals[field]){
                emptyFlag = false;
                break;
            }
        }
        if (emptyFlag){
            Ext.Msg.alert('PBM', 'At least one search criteria is required');
            return;
        }

        vm.set('searchValues', formVals);

        myProxy.setExtraParam('pNcpdpID', vm.get('searchValues').cbxPhar);
        myProxy.setExtraParam('prxNum', vm.get('searchValues').rxNum);
        myProxy.setExtraParam('pAuditID', 0);
        myProxy.setExtraParam('pTransactionID', vm.get('searchValues').auditClaimId);
        myProxy.setExtraParam('pAdjustTransID', vm.get('searchValues').newClaimId);
        myProxy.setExtraParam('pProcessDateFrom', (vm.get('searchValues').processDateFrom !== '') ? Ext.Date.format(new Date(vm.get('searchValues').processDateFrom), 'm/d/Y') : null);
        myProxy.setExtraParam('pProcessDateTo', (vm.get('searchValues').processDateTo !== '') ? Ext.Date.format(new Date(vm.get('searchValues').processDateTo), 'm/d/Y') : null);


        audittakebacks.load();
    },
    widgetAttach:function(col, widget, rec){
        var notEmptyVal;
        if (col.text === 'Claim ID'){
            notEmptyVal = rec.get('transactionId') !== '0' ? true : false;
        }
        else{
            notEmptyVal = rec.get('adjustTransId') !== '0' ? true : false;
        }
        widget.setVisible(notEmptyVal);
    },

    onLeaveDate:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },

    onClickClaim: function(btn){
        var me = this,
            record = btn._rowContext.record,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar'),
            atlasId,
          /*  node = me.getView().up('merlinworkspace').getViewModel().get('menuitems').findNode('route','merlin/claims/ClaimsToolbar'),

            menuId = node.get('menuID');*/

        atlasId = btn.getWidgetColumn().text === 'Claim ID' ? record.get('transactionId'): record.get('adjustTransId');

        me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
            atlasId: atlasId,
            menuId: menuId
        });
    },

    onReset: function (bt) {
        var me = this,
            view = me.getView()
            store = view.lookup('auditAdvSearchGrid').getStore();

        bt.up('form').reset();
        store.removeAll();
    },

    onRecordSelect: function (grid, rec) {
        this.fireEvent('searchaudittakebacks', rec.get('auditId'));
        this.getView().close();
    },

    renderSvcDate: function(val){
        var arrayVal = val.split('-');

        return arrayVal[1] + '/' + arrayVal[2] + '/' + arrayVal[0];
    },

    renderQty: function(val){
        return parseFloat(val).toFixed(2);
    }
});