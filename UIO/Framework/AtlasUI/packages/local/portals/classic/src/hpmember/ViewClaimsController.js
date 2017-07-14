
/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - View Claims
 * Description: Controller for the View claims Page
 */
Ext.define('Atlas.portals.view.hpmember.ViewClaimsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsMemberMHPViewClaimsController',

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user');

        this.callFamilyMember(user.recipientId);
        this.onSearchClick();
    },

    loadStatuses: function () {
        var combo = this.lookupReference('claimsStatusCombo'),
            statuses = [['All', 'All'], ['Denied', 'F2'], ['Paid', 'F1'], ['Pending', 'A1,A2,F0,P2,R1,R2,R3']],
            statusesStore = {};

        statusesStore = new Ext.data.ArrayStore({
            fields: ['text', 'value'],
            data: statuses
        });

        combo.setStore(statusesStore);
        combo.setValue('All');
    },

    onFamilySelected: function (combo, record) {
        this.callFamilyMember(record.get('value'));
    },

    callFamilyMember: function (recipientId) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
        claimsDisclaimerStore = this.getViewModel().getStore('claimsDisclaimerStore'),
        servicesneededmodel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {});

        servicesneededmodel.getProxy().setExtraParam('pSessionID', user.sessionId);
        servicesneededmodel.getProxy().setExtraParam('pRecipientID', recipientId);
        servicesneededmodel.getProxy().setExtraParam('pFieldList', "birthDate,home.State,firstName,lastName,@Age,@enrollmentStatus,recipientID,@familyList,@subscriberId,@primaryLOB,gender");
        servicesneededmodel.getProxy().setExtraParam('portalPlan', "");
        servicesneededmodel.load({
            callback: function (record) {
                //parse familyList
                var String = record.get('@familyList');
                if (String != null || String != undefined) {
                    var parts = String.split('^');

                    var answer = [];

                    for (var i = 0; i < parts.length; i++) {
                        if (i < 1) continue;
                        if (i % 2 == 1) {
                            answer.push(parts[i - 1] + '^' + parts[i]);
                        }
                    }

                    var familyArray = [];

                    for (var i = 0; i < answer.length; i++) {
                        individualArray = [];
                        var arraySplit = answer[i].split("^");
                        individualArray.push(arraySplit[0]);
                        individualArray.push(arraySplit[1]);
                        familyArray.push(individualArray);
                    }

                    var familyStore = new Ext.data.ArrayStore({
                        fields: ['name', 'value'],
                        data: familyArray
                    });

                    var familyCombo = me.lookupReference('familyCombo');
                    familyCombo.setStore(familyStore);
                    if (familyCombo.getValue() == null || familyCombo.getValue() == '') {
                        familyCombo.setValue(recipientId);
                    }

                    me.lookupReference('statusRef').setValue(record.get('@enrollmentStatus'));

                    claimsDisclaimerStore.getProxy().setExtraParam('pFunction', "getAttribute");
                    claimsDisclaimerStore.getProxy().setExtraParam('pRole', "memberPortal");
                    claimsDisclaimerStore.getProxy().setExtraParam('pPlan', '');
                    claimsDisclaimerStore.getProxy().setExtraParam('pLobID', '');
                    claimsDisclaimerStore.getProxy().setExtraParam('pBenefitPlanCode', '');
                    claimsDisclaimerStore.getProxy().setExtraParam('pDataName', 'claimDisclaimerLine1,claimDisclaimerLine2,claimDisclaimerLine3,meridianMedicaidLiability,nonMeridianMedicaidLiability');
                    claimsDisclaimerStore.getProxy().setExtraParam('pRecipientID', '');
                    claimsDisclaimerStore.load({
                        scope: this,
                        failure: function (rec, operation) {
                            Ext.Msg.alert('Failure', 'Display dynamic data error, Please contact admin.');

                        },
                        success: function (rec, operation) {

                        },
                        callback: function (recs, operation, success) {
                            var displaymessage1 = '';
                            var displaymessage2 = '';
                            var displaymessage3 = '';
                            for (var i = 0; i < recs.length; i++) {
                                if (recs[i].data.dataName == 'claimDisclaimerLine1') {
                                    displaymessage1 = recs[i].data.dataValue;
                                }
                                if ((recs[i].data.dataName == 'claimDisclaimerLine2') && (record.get('@primaryLOB') == 'Medicare')){
                                    displaymessage2 = recs[i].data.dataValue;
                                }
                                if (recs[i].data.dataName == 'claimDisclaimerLine3'){
                                    displaymessage3 = recs[i].data.dataValue;
                                }
                            }

                            me.lookupReference('infoDisplay1Ref').setValue(displaymessage1);
                            if (displaymessage2 != ''){
                                me.lookupReference('infoDisplay2Ref').setHidden(false);
                            }
                            me.lookupReference('infoDisplay2Ref').setValue(displaymessage2);
                            me.lookupReference('infoDisplay3Ref').setValue(displaymessage3);
                        }
                    });
                }
            }
        });


    },

    onStatusClick: function (grid, rowIndex) {
        Ext.Msg.alert("Claim Status Information","Member is not eligible or a procedure code on the claim is not a covered benefit");
    },

    onSearchClick: function () {

        var status = this.lookupReference('claimsStatusCombo').getValue(),
            dateFrom = this.lookupReference('dateFrom').getValue(),
            dateTo = this.lookupReference('dateTo').getValue(),
            claimsDetailStore = this.getViewModel().getStore('claimsDetailStore'),
            user = Ext.first('viewport').getViewModel().get('user'),
            whereClause = '',
            requiredInfo = false,
            status = status === 'All' ? '' : status;

        if (dateFrom != null && dateFrom != "") {
            if (dateTo != null && dateTo != "") {
                requiredInfo = true;
            }
        }
        if (!requiredInfo) {
            Ext.Msg.alert('Warning', 'Please enter valid Date From & To dates.');
        }

        claimsDetailStore.removeAll();
        claimsDetailStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        claimsDetailStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        claimsDetailStore.getProxy().setExtraParam('pStmtFromDate', dateFrom);
        claimsDetailStore.getProxy().setExtraParam('pStmtToDate', dateTo);
        claimsDetailStore.getProxy().setExtraParam('pStatusFilter', status);
        claimsDetailStore.getProxy().setExtraParam('pExcludeFilter', 'F3,A7');
        claimsDetailStore.getProxy().setExtraParam('pStartRecord', 1);
        claimsDetailStore.getProxy().setExtraParam('pEndRecord', 250);
        claimsDetailStore.getProxy().setExtraParam('pSort', 'stmtFromDate desc');
        claimsDetailStore.load({
            scope: this,
            failure: function (record, operation) {

            },
            success: function (record, operation) {
                
            },
            callback: function (records, operation, success) {

            }
        });
    },

    onClaimsDetailLoaded: function(store,records) {
        var vm = this.getViewModel(),
            claimsDetailPaged = vm.getStore('claimsDetailPaged');

        claimsDetailPaged.getProxy().setData(records);
        claimsDetailPaged.reload();
    }

});
