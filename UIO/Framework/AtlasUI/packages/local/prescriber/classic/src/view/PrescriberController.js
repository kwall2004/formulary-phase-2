/**
 * Created by T4317 on 8/31/2016.
 */

Ext.define('Atlas.prescriber.view.PrescriberController', {
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.prescriber',
    selectedNPI: null,
    listen: {
        controller: {
            '*': {
                contactLogLoaded: 'getContactLog'
            }
        }
    },
    init:function () {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            atlasId = view.atlasId;

        var carrierlobsstore = vm.getStore('carrierlobsstore');
        carrierlobsstore.load();
        var masterrecord={};
        masterrecord.page='prescriber';
        vm.set('contactlogmasterrecord',masterrecord);


        var npi=me.getView().NPI;
        var form = me.getView().down('prescriber-general') === null ? me.getView() : me.getView().down('prescriber-general');
        if(npi!='' && npi!=undefined  ) {
            //view.down('#cboMember').setValue(npi);  ---------------------------------- need to load data with that npi
            //this.getMasterDataOnTypeAhead(form, npi);
        }


        this.getViewModel().set('isAdvancedSearch', false);
        this.getViewModel().set('isNPISearch', true);

        //linked from dashboard claim alerts widget
        if (atlasId !== null) {
            view.lookup('npitextbox').setValue(atlasId);
            this.selectedNPI = atlasId;
            //defer so that the form gets rendered in time before we can loadRecord
            Ext.defer(function() {
                me.searchNPI();
            }, 1000);
        }

        me.callParent();
    },
    searchNPI: function() {
        var me = this,
            npi = me.lookup('npitextbox').getValue(),
            form = this.getView().down('prescriber-general') === null ? this.getView() : this.getView().down('prescriber-general');

        if (form) {
            me.getMasterDataOnNPILookup(form, npi);
        }
    },
    onPrescriberSelection: function (combo, record) {

        var me = this,
            form = me.getView().down('prescriber-general') === null ? me.getView() : me.getView().down('prescriber-general');
        if(combo && combo.lastSelection) {
            if (!combo.lastSelection[0].data)
                return;
            combo.setValue(combo.lastSelection[0].data.npi + ' ' + combo.lastSelection[0].data.fullname);

            me.lookup('npitextbox').setValue("");
        }

        me.getMasterDataOnNPILookup(form, record.get('npi'), record);
    },

    getMasterDataOnNPILookup: function(form, npi) {

        this.selectedNPI = npi;
        var me = this,
            vm = me.getViewModel(),
            prescriberMasterModel = Ext.create('Atlas.common.model.Prescriber', {});
        prescriberMasterModel.getProxy().setExtraParam('pKeyValue', npi);
        prescriberMasterModel.load(
            {
                scope: me,
                callback: function (masterrecord, operation, success) {
                    //debugger

                    masterrecord.data.page='prescriber';
                    masterrecord.data.key='npi';
                    masterrecord.data.keyvalue=masterrecord.data.npi;
                    masterrecord.data.keytext=masterrecord.data.fullname;
                    vm.set('masterrecord', masterrecord);
                    vm.set('contactlogmasterrecord',masterrecord.data);
                    var lobs = masterrecord.data.FWAPrescriberLockLOB;
                    masterrecord.data.FWAPrescriberLockLOBName = ''
                    if (lobs != undefined && lobs.length>0)
                    {
                        var a =[];
                        if (lobs.indexOf(',')!=-1) {
                            a = lobs.split(',');

                        }
                        else{
                            a.push(lobs);
                        }
                        var carrierlobsstore = vm.getStore('carrierlobsstore');
                        for (var i=0;i<a.length;i++)
                        {
                            if (i!=0){
                                masterrecord.data.FWAPrescriberLockLOBName+=', ';
                            }
                            var rec = carrierlobsstore.findRecord('carrierLOBId',a[i]);
                            masterrecord.data.FWAPrescriberLockLOBName+=rec.get('lobName') ;

                        }
                    }
                    this.getPriorAuthData(me, npi);
                    this.onClaimsSearch(me, npi);
                    this.getFaxData(me, npi);
                    this.getContactLog();
                    me.fireEvent('recordLoaded');
                }
            });
    },
    getFaxData: function(me,npi) {
        var vm = me.getViewModel(),
            faxandattachments = vm.getStore('faxandattachments');
        if(vm.get('openedTabs.fax') === true) {
            faxandattachments.getProxy().setExtraParam('pNPI', npi);
            faxandattachments.load();
        }
    },
    getPriorAuthData: function(me,npi){
        var vm = me.getViewModel(),
            priorauthstore = vm.getStore('priorauths');

        if(vm.get('openedTabs.priorAuth') === true)
        {
            priorauthstore.getProxy().setExtraParam('pKeyValue', npi);
            priorauthstore.getProxy().setExtraParam('pKeyType', 'npi');
            priorauthstore.load({
                callback:function(record){
                }
            });
        }
    },
    onClaimsSearch: function(toDate, fromDate) {
        //debugger;

        var vm = this.getViewModel(),
            claimsStore = vm.getStore('claims');
        if(vm.get('openedTabs.claims') === true) {
            var vm = this.getViewModel(),
                claimsStore = vm.getStore('claims'),
                parentRecord = this.getView().getViewModel().get('masterrecord'),
                npi = parentRecord.get('npi'),
                date = Atlas.common.utility.Utilities.getLocalDateTime() ,
                where = '';
            where = this.buildWhereClause(where, 'respStatus', '=', this.lookup('claimStatus').getValue());
            where = this.buildWhereClause(where, 'RecipientId', '=', this.lookup('recipientIdClaims').getValue());
            where = this.buildWhereClause(where, 'npi', '=', this.lookup('npiClaims').getValue());
            where = this.buildWhereClause(where, 'ncpdpid', '=', this.lookup('ncpdpidClaims').getValue());
            //where = this.buildWhereClause(where,'ndc', '=', this.lookup('ndc').getValue());
            where = this.buildWhereClause(where, 'rxid', '=', this.lookup('rxid').getValue());
            where = this.buildWhereClause(where, 'gcnseq', '=', this.lookup('gcnseq').getValue());
            where = this.buildWhereClause(where, 'gcnseq', '=', this.lookup('gcndirect').getValue());
            if (toDate && fromDate) {
                where = this.buildWhereClause(where, 'serviceDate', '>=', this.formatDate(this.lookup('serveDateFrom').getValue()));
                where = this.buildWhereClause(where, 'serviceDate', '<=', this.formatDate(this.lookup('serveDateTo').getValue()));
            } else {
                where = this.buildWhereClause(where, 'serviceDate', '>=', this.formatDate(date));
                where = this.buildWhereClause(where, 'serviceDate', '<=', this.formatDate(new Date(date.setMonth(date.getMonth() - 1))));
            }
            where = this.buildWhereClause(where, 'claimID', '=', this.lookup('claimId').getValue());


            claimsStore.getProxy().setExtraParam('pKeyValue', npi);
            claimsStore.getProxy().setExtraParam('pKeyType', 'npi');
            claimsStore.getProxy().setExtraParam('pRowNum', 0);
            claimsStore.getProxy().setExtraParam('pRowId', 0);
            claimsStore.getProxy().setExtraParam('pBatchSize', 100);
            claimsStore.getProxy().setExtraParam('pWhere', where);
            claimsStore.load({
                callback: function (record) {
                }
            });
        }
    },
    onNPIEnter: function(field, e) {
        //var prescriberList = Ext.create('Atlas.common.model.Prescriber', {});
        if(e.getKey() == e.ENTER) {
            var that = this.getView(),
                npi = that.lookup('npitextbox').getValue(),
                form = this.getView().down('prescriber-general') === null ? this.getView() : this.getView().down('prescriber-general');

            this.selectedNPI = npi;
            this.fireEvent('SearchMemberPAHistory', 'npi', npi, '');
            that.lookup('advancedtextbox').setValue("");
            this.getMasterDataOnNPILookup(form, npi);
        }
    },
    getContactLog: function() {
        this.fireEvent('contactloggridrefresh');
    },
    onRender: function() {
        if (Ext.first('viewport').getViewModel().get('prescriberrecord')) {
            var vm = this.getView().getViewModel(),
                form = this.getView().lookup('prescriber-general-form');

            vm.set('masterrecord',Ext.first('viewport').getViewModel().get('prescriberrecord'));
           // form.loadRecord(vm.get('masterrecord'));
            this.onPrescriberSelection(null, vm.get('masterrecord'));
        }
    },
    onSearchTypeToggle: function (seg, button, isPressed, eOpts) {
        var vm = this.getViewModel();
        if (button.action === 'npi') {
            vm.set('isNPISearch', true);
            vm.set('isAdvancedSearch',false);
        } else {
            vm.set('isAdvancedSearch',true);
            vm.set('isNPISearch', false);
        }


    },
    onMenuClick: function (menu, item) {
        var me = this,
            view = me.getView(),
            cards = view.getLayout().getLayoutItems(),
            created = false,
            len = cards.length,
            i = 0;

        //Check if the tab exists
        for (; i < len; i++) {
            if (cards[i].route === item.route) {
                created = true;
                view.setActiveTab(cards[i]);
            }
        }

        if (!created) {
            view.add({
                xclass: Atlas.common.Util.classFromRoute(item.route),
                height : '100%',
                route: item.route,
                title: item.text
            });
            view.setActiveTab(len);

            if (item.text == 'Prior Auth') {
                if (this.selectedNPI != null) {
                    this.fireEvent('SearchMemberPAHistory', 'npi', this.selectedNPI, '');
                }
            }
            else if (item.text == 'Claims') {
                this.fireEvent('SearchClaimsCommonController', 'npi', this.selectedNPI, true);
            }

            else if (item.text == "Contact Log") {
                this.fireEvent('contactloggridrefresh');
            }
        }
    },
    menuOnClick: function (selection) {
        var tabPanel = this.getView();

        var existingTab = tabPanel.down(selection.value),
            tab;

        if (!existingTab) {
            tab = tabPanel.add({
                xtype: selection.value
            });

            tabPanel.setActiveTab(tab);
        } else {
            tabPanel.setActiveTab(existingTab);
        }
    }

});
