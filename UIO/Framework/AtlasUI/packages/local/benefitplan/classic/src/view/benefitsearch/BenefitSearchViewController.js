/**
 * Created by s6393 on 9/28/2016.
 */
Ext.define('Atlas.benefitplan.view.benefitsearch.BenefitSearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitsearchview',
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                ruleSetDataSaved : 'ruleSetDataSaved'
            }
        }
    },
    ruleSetDataSaved: function() {
        this.onSearch(null);
    },
    onReset: function (bt) {
        bt.up('form').reset();
        this.lookup('benefitGrid').getStore().removeAll();
    },
    onSearch:  function () {
        Ext.getBody().mask('Loading');
            var me = this,
                view = me.getView(),
                vm = me.getViewModel(),
                cmbBenefit = view.down('[name=benefit]').getValue(),
                cmbIndustryStandardName = view.down('[name=industryStandardName]'),
                hipaaCode = view.down('[name = hipaa]').getValue(),
                startDate = me.lookup('benefitStartDate').getValue(),
                endDate = me.lookup('benefitEndDate').getValue();
        if(cmbBenefit != '' || cmbIndustryStandardName.getSelection() || startDate != '' || endDate != '') {
            var store = vm.getStore('benefitsearch'),
                proxy = store.getProxy();
            if (cmbBenefit != '' && cmbBenefit != null) {
                proxy.setExtraParam('BnftName', cmbBenefit);
            } else {
                delete proxy.extraParams['BnftName'];
            }
            if (hipaaCode != '' && hipaaCode != null) {
                proxy.setExtraParam('bnftCode', hipaaCode);
            } else {
                delete proxy.extraParams['bnftCode'];
            }
            if (cmbIndustryStandardName.getSelection()) {
                proxy.setExtraParam('SvcTypeSK', cmbIndustryStandardName.getSelection().get('SvcTypeSK'));
            }
            else {
                delete proxy.extraParams['SvcTypeSK'];
            }
            if (startDate != "" && startDate != null) {
                proxy.setExtraParam('EfctvStartDt', startDate);
            }
            else {
                delete proxy.extraParams['EfctvStartDt'];
            }
            if (endDate != "" && endDate != null) {
                proxy.setExtraParam('EfctvEndDt', endDate);
            }
            else {
                delete proxy.extraParams['EfctvEndDt'];
            }
            store.load({callback: function(){
                Ext.getBody().unmask();
            }
            });
        }
        Ext.getBody().unmask();
    },
    onNewBenefitClick: function () {
        this.openBenefitDetailConfiguration(0, false);
    },
    onPlanBenefitGridItemClick: function() {
        var me = this,
            getGrid= me.getView().down('[itemId="benefitGrid"]'),
            row = getGrid.getSelectionModel().getSelection()[0],
            benefitSK = row.get('BnftSK');
        if(me.lookup('copyEditButton').hasFocus)
        {
            Ext.Msg.show({
                title: 'Confirm Copy and Edit',
                msg: 'Are you sure you want to copy and edit Benefit ' + row.get('BnftName') + '?',
                buttons : Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function(btn) {
                    if(btn == 'yes') {
                        Ext.getBody().mask('Loading');
                        var store = this.getViewModel().getStore('copyEditBenefit');
                        store.getProxy().setUrl("/CopyBenefitDefinition" + '?origBnftSK='+ benefitSK +'&CurrentUser='+ this.getViewModel().get('user').un);
                        store.load(function(records, operation, success){
                            Ext.getBody().unmask();
                            if(success) {
                                me.openBenefitDetailConfiguration(JSON.parse(operation.getResponse().responseText)["id"][0], true);
                            } else {
                                Ext.Msg.show({
                                    title: 'Failed to Copy and Edit',
                                    msg: 'Data failed to copy and edit:',
                                    buttons: Ext.Msg.OK,
                                    closable: false,
                                    draggable: false,
                                    resizable: false
                                });
                            }
                        });
                    }
                }, scope: this
            });
        }
        else
        //they double clicked a row or clicked the edit button
        {
            Ext.Msg.show({
                title: 'Confirm Edit',
                msg: 'Are you sure you want to edit Benefit ' + row.get('BnftName') + '?',
                buttons : Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function(btn) {
                    if(btn == 'yes') {
                        this.openBenefitDetailConfiguration(benefitSK, false);
                    }
                }, scope: this
            });
        }
	},
    openBenefitDetailConfiguration: function(cmbBenefitSK, iscopy) {
        //CAH possibly ask through events if the hierarchy forms are dirty.
        //if so, ask if they want to lose changes
        //if so, fire the event, else maybe focus the hierarchy page
        this.fireEvent('onCloseBenefitDetailConfiguration', {viewclass: this.getViewModel().get('viewclass')});
        this.fireEvent('openView', 'merlin', 'benefitplan', 'benefitdefinition.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            benefitSK: cmbBenefitSK,
            isCopy: iscopy
        });
    },
    onCancelClick: function() {
        this.getView().close();
    }
});