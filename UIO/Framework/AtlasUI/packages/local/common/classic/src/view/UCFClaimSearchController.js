/**
 * Created by T4317 on 11/21/2016.
 */
Ext.define('Atlas.common.view.UCFClaimSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ucfclaimsearch',

    init: function(){
        var me = this,
            storeUcfClaims = me.getViewModel().getStore('ucfclaims');
        storeUcfClaims.getProxy().setExtraParam('pagination', true);
        storeUcfClaims.onAfter('load', 'onLoadUcfClaims');
        me.lookupReference('refExportToExcel').setDisabled(true);
    },

    onClaimSearch: function () {
        var vm = this.getViewModel(),
            ucfClaimsStore = vm.getStore('ucfclaims'),
            startDate = this.lookup('startDate').getValue() ? this.lookup('startDate').getValue(): '',
            endDate = this.lookup('endDate').getValue() ? this.lookup('endDate').getValue() : '';
        ucfClaimsStore.getProxy().setExtraParam('pcRecipID', this.lookup('recipientId').getValue() ? this.lookup('recipientId').getValue() : '');
        ucfClaimsStore.getProxy().setExtraParam('pcStart', this.formatDate(startDate));
        ucfClaimsStore.getProxy().setExtraParam('pcEnd', this.formatDate(endDate));
        ucfClaimsStore.getProxy().setExtraParam('pcProdID', this.lookup('gcndirect').getValue() ? this.lookup('gcndirect').getValue() : '');
        ucfClaimsStore.getProxy().setExtraParam('pcGcnSeq', this.lookup('gcnseq').getValue() ? this.lookup('gcnseq').getValue() : '');
        ucfClaimsStore.getProxy().setExtraParam('pcPrescrID', this.lookup('prescId').getValue() ? this.lookup('prescId').getValue() : '');
        ucfClaimsStore.getProxy().setExtraParam('pcPharmID', this.lookup('pharmId').getValue() ? this.lookup('pharmId').getValue() : '');
        ucfClaimsStore.getProxy().setExtraParam('pcRxNum', this.lookup('rxNum').getValue());
        ucfClaimsStore.load();

    },
    onClaimReset:function (btn) {
        var
            me = this,
            gridStore = this.lookupReference('claimsTable').getStore();
        btn.up('form').reset();
        gridStore.removeAll();
        me.lookupReference('refPagingToolbar').onLoad();
        me.lookupReference('refExportToExcel').setDisabled(true);
        // gridStore.load({
        //     params: {
        //         pcEnd: '2/1/2017',
        //         pcStart: '2/2/2017'
        //     }
        // });
    },
    widgetAttach:function(col, widget, rec){
        switch(col.dataIndex){
            case 'ClaimRefNum':
                if(rec.get('ClaimRefNum') === 0){
                    widget.setVisible(false);
                }
                else{
                    widget.setVisible(true);
                }
                break;
            case 'PharmacyName':
                if(!(rec.get('PharmacyName'))){
                    widget.setVisible(false);
                }
                else{
                    widget.setVisible(true);
                }
                break;
            case 'PrescriberName':
                if(!(rec.get('PrescriberName'))){
                    widget.setVisible(false);
                }
                else{
                    widget.setVisible(true);
                }
                break;
        }

        col.mon(col.up('gridpanel').getView(),{
            itemupdate: function(){
                switch(col.dataIndex){
                    case 'ClaimRefNum':
                        if(rec.get('ClaimRefNum') === 0){
                            widget.setVisible(false);
                        }
                        else{
                            widget.setVisible(true);
                        }
                        break;
                    case 'PharmacyName':
                        if(!(rec.get('PharmacyName'))){
                            widget.setVisible(false);
                        }
                        else{
                            widget.setVisible(true);
                        }
                        break;
                    case 'PrescriberName':
                        if(!(rec.get('PrescriberName'))){
                            widget.setVisible(false);
                        }
                        else{
                            widget.setVisible(true);
                        }
                        break;
                }
            }
        });
    },
    onLoadUcfClaims: function(store,records){
            var me = this;
        for(var idx = 0, length = records.length; idx < length; idx = idx + 1){
            var currentRec = records[idx];
            if(currentRec.get('ClaimRefNum') === 0){
                currentRec.set('notZeroClaim', false);
            }
            else {
                currentRec.set('notZeroClaim', true);
            }
            if(!(currentRec.get('PharmacyName'))){
                currentRec.set('notZeroPharm', false);
            }
            else{
                currentRec.set('notZeroPharm', true);
            }
            if(!(currentRec.get('PrescriberName'))){
                currentRec.set('notZeroPresc', false);
            }
            else{
                currentRec.set('notZeroPresc', true);
            }
        }
        if(records.length > 0){
         me.lookupReference('refExportToExcel').setDisabled(false);
        }
        else{
            me.lookupReference('refExportToExcel').setDisabled(true);
        }
    },
    formatDate: function(date) {
        if(date !== '') {
            return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
        }
        return '';

    },
    routeToMember:function (button) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'),
            selected = button._rowContext.record,
            recipientID = selected.get('recipientID');

        if (recipientID != '' && recipientID != null) {
            me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
                atlasId: recipientID,
                menuId: menuId,
                RID: recipientID,
                keyValue: '0',
                openView: true,
                recordCase: null,
                subTabs: ['member-demographics']
            });
        }
    },
    routeToPrescriber:function (button) {
        this.routeTo(button._rowContext.record.get('NPI'), 'merlin/prescriber/PrescriberToolbar');
    },
    routeToPharmacy:function (button) {
        this.routeTo(button._rowContext.record.get('NCPDPID'), 'merlin/pharmacy/Pharmacy');
    },
    routeToClaims: function (button) {
        this.routeTo(button._rowContext.record.get('ClaimRefNum'), 'merlin/claims/ClaimsToolbar');
    },
    routeToClaimsDbClick: function (row, record) {
        this.routeTo(record.get('transactionID'), 'merlin/claims/UCFClaimProcessing');
    },
    routeTo: function (atlasId, route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/'),
            atlasId = atlasId;

        me.fireEvent('openView',viewRoute[0],viewRoute[1],viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId
        });
    },
    exportToExcelClick : function(){
            var grid  = this.getView().lookupReference('claimsTable'),
            store = grid.getStore();

        Atlas.common.utility.Utilities.exportToExcel(store, 'patPaidAmt');
    }
});