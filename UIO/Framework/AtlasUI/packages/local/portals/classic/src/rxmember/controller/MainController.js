Ext.define('Atlas.portals.rxmember.controller.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsRxmemberMainController',

    listen: {
        controller: {
            '*': {
                userSet: 'onAuthValid'
            }
        }
    },

    onAuthValid: function() {
        var user = Ext.first('viewport').getViewModel().getData().user,
            firstName = user.FirstName,
            lastName = user.LastName,
            fullName = '';

        this.getViewModel().set('userModel', user);
        fullName = firstName ? firstName + ' ' : fullName;
        fullName += lastName ? lastName : '';
        this.getViewModel().set('userModel.FullName', fullName);
        this.loadMemberCoverages();
        this.loadActiveMemberCoverages();
        this.loadOverduePrescriptions();
        this.initializeYears();
    },

    loadOverduePrescriptions: function() {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            overduePrescriptions = vm.getStore('overduePrescriptions');

        overduePrescriptions.getProxy().setExtraParam('pSessionID', user.retSessionID);
        overduePrescriptions.getProxy().setExtraParam('pKeyValue', user.retRecipientID);
        overduePrescriptions.load({
            callback: function(tempData) {
                if (tempData != null || tempData == '') {
                    if (tempData.length > 0) {
                        vm.set('hasOverduePrescriptions', true);
                    } else {
                        vm.set('hasOverduePrescriptions', false);
                    }
                } else {
                    vm.set('hasOverduePrescriptions', false);
                }
            }
        });
    },

    loadMemberCoverages: function() {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            memberCoverages = vm.getStore('memberCoverages'),
            gridCoverageRef = me.lookupReference('memberCoveragesRef');

        memberCoverages.getProxy().setExtraParam('pSessionId', user.retSessionID);
        memberCoverages.getProxy().setExtraParam('pRecipientId', user.retRecipientID);
        memberCoverages.sort('EffDate', 'DESC');
        memberCoverages.load({
            callback: function (records, operation) {
                var coverageArr = [];
                for(var i = 0; i < records.length; i++) {
                    if(records[i].getData().TermDate === "") {
                        coverageArr.push(records[i]);
                    }
                }

                var coverageStore = new Ext.data.ArrayStore({
                    fields: ['BIN', 'CMSContractId', 'CMSPBPId', 'CarrierId', 'CarrierLOBId', 'CarrierName', 'DisplayName', 'EffDate', 'LOBName', 'MemberId', 'PCN', 'PlanBenefitId', 'PlanBenefitName', 'PlanGroupId', 'PlanGroupName', 'PrimaryCarePhys', 'RecipientId',  'SystemId', 'TermDate', 'id'],
                    data: coverageArr,
                    pageSize: 15,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                });


                gridCoverageRef.setStore(coverageStore);
            }
        });
    },

    loadActiveMemberCoverages: function() {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            memberCoverages = vm.getStore('activeMemberCoverages');

        memberCoverages.getProxy().setExtraParam('pSessionId', user.retSessionID);
        memberCoverages.getProxy().setExtraParam('pRecipientId', user.retRecipientID);
        memberCoverages.load({
            callback: function(records) {
                var currentPlans = [],
                    planHtml = '',
                    i = 0;

                if (!records) { return; }
                if (records.length === 0) { return; }
                currentPlans = records.filter(function(item) {
                    return item.get('TermDate') == '' || new Date(item.get('TermDate')).getTime() >= new Date().getTime();
                });
                if (currentPlans.length === 0) { return; }
                for (i = 0; i < currentPlans.length; i++) {
                    planHtml += currentPlans[i].get('PlanGroupName') + '<br>';
                }
                me.lookupReference('memberCurrentPlans').setText(planHtml, false);
            }
        });
    },

    loadPrescriptionExpenses: function(year) {
        var me = this,
            user = Ext.first('viewport').getViewModel().getData().user,
            prescriptionExpensesStore = this.getViewModel().getStore('prescriptionExpenses');

        prescriptionExpensesStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        prescriptionExpensesStore.getProxy().setExtraParam('pRecipientId', user.retRecipientID);
        prescriptionExpensesStore.getProxy().setExtraParam('pYear', year);
        prescriptionExpensesStore.load({
            callback: function(records) {
                var total = 0
                    i = 0;

                if (!records) { return; }
                if (records.length === 0) { return; }
                for (i = 0; i < records.length; i++) {
                    total += parseFloat(records[i].data.amt);
                }

                me.getViewModel().set('totalAmount', Math.ceil(total * 100) / 100);
            }
        });
    },

    initializeYears: function() {
        var currentYear = new Date().getFullYear(),
            combo = this.lookupReference('yearCombo'),
            year = [],
            years = [],
            yearsStore = {};

        for (currentYear; currentYear >= 2010; currentYear--) {
            year = [];
            year.push(currentYear);
            years.push(year);
        }

        yearsStore = new Ext.data.ArrayStore({
            fields: ['value'],
            data: years
        });

        combo.setStore(yearsStore);
        combo.setValue(new Date().getFullYear());
    },

    onYearSelected: function(combo, newValue) {
        this.loadPrescriptionExpenses(newValue);
    },

    onCoverageSelected: function(combo, record) {
        var me = this,
            deductibleModel = Ext.create('Atlas.portals.rxmember.model.MemberDeductible', {}),
            user = Ext.first('viewport').getViewModel().getData().user,
            form = this.lookupReference('deductibles'),
            benefitYear = record.get('TermDate') ? new Date(record.get('TermDate')).getFullYear() : new Date().getFullYear();

        deductibleModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        deductibleModel.getProxy().setExtraParam('pRecipientID', user.retRecipientID);
        deductibleModel.getProxy().setExtraParam('pMemberid', user.MemberID);
        deductibleModel.getProxy().setExtraParam('pBenefitYear', benefitYear);
        deductibleModel.getProxy().setExtraParam('pPlanBenefitId', record.get('PlanBenefitId'));
        deductibleModel.load({
            success: function(deductibleRecord) {
                var spentAmount = deductibleRecord.get('CurrentTroopAmt'),
                    pocketMax = deductibleRecord.get('MaxTroopAmt'),
                    deductible = deductibleRecord.get('DeductibleAmt'),
                    pctSpent = 0;

                if (pocketMax === 'N/A' || pocketMax <= 0) {
                    me.getViewModel().set('hasDeductible', false);
                    return;
                }
                if (deductible === 'N/A' || deductible <= 0) {
                    pctSpent = parseInt(spentAmount.replace(/,/g, '')) / parseInt(pocketMax.replace(/,/g, ''));
                    me.lookupReference('progressBar').setValue(pctSpent);
                    me.getViewModel().set('spentAmount', 'Spent: $' + spentAmount);
                    me.lookupReference('DeductibleAmt').setText('$' + pocketMax);
                    me.getViewModel().set('hasDeductible', true);
                    return;
                }

                var copay = parseInt(pocketMax.replace(/,/g, '')) - parseInt(deductible.replace(/,/g, ''));
                var pctDeductible = parseInt(deductible.replace(/,/g, '')) / parseInt(pocketMax.replace(/,/g, ''));

                if (pocketMax !== 0 && deductible !== 0) {
                    me.lookupReference('DeductibleAmt').setText('$' + pocketMax);
                    if (parseInt(spentAmount.replace(/,/g, '')) > 0) {
                        if (parseInt(spentAmount.replace(/,/g, '')) / parseInt(deductible.replace(/,/g, ''))) {
                            pctSpent = parseInt(spentAmount.replace(/,/g, '')) / parseInt(deductible.replace(/,/g, ''));
                            me.lookupReference('progressBar').setValue(pctSpent);
                            me.getViewModel().set('spentAmount', 'Spent: $' + spentAmount);
                            me.getViewModel().set('hasDeductible', true);
                            return;
                        }
                        pctSpent = (parseInt(spentAmount.replace(/,/g, '')) - parseInt(deductible.replace(/,/g, ''))) / parseInt(copay.replace(/,/g, ''));
                        me.lookupReference('progressBar').setValue(pctSpent);
                        me.getViewModel().set('spentAmount', 'Spent: $' + spentAmount);
                        me.getViewModel().set('hasDeductible', true);
                        return;
                    }
                    me.lookupReference('progressBar').setValue(pctSpent);
                    me.getViewModel().set('spentAmount', 'Spent: $' + spentAmount);
                    me.getViewModel().set('hasDeductible', true);
                    return;
                }
            }
        });
    },

    goToMyBenefits: function() {
        this.fireEvent('openView','rxmember','portals','rxmember_MyBenefitsAndCoverage', null);
    },

    goToClaims: function(button) {
        var record = button.up().getWidgetRecord();

        this.fireEvent('openView','rxmember','portals','rxmember_ClaimsSearch', {
            isClaimPassed: true,
            claimRecord: record
        });
    },

    goToMyClaims: function(grid, rowIndex) {
        var me = this,
            year = this.lookupReference('yearCombo').value,
            dateFrom = new Date(),
            dateTo = new Date();

        dateFrom.setFullYear(year, rowIndex, 1);
        dateTo.setFullYear(year, rowIndex + 1, 0);

        this.fireEvent('openView','rxmember','portals','rxmember_MyClaimsMember', {
            isRedirect: true,
            dateFrom: me.formatDate(dateFrom),
            dateTo: me.formatDate(dateTo),
            atlasId: me.formatDate(dateFrom)
        });
    },

    goToMyClaimsNoDate: function() {
        this.fireEvent('openView','rxmember','portals','rxmember_MyClaimsMember', null);
    },

    ackOverdueClaim: function(button) {
        var record = button.up().getWidgetRecord(),
            me = this,
            user = Ext.first('viewport').getViewModel().getData().user;

        Ext.Msg.show({
            title: 'Acknowledge',
            message: 'Are you sure you would like to acknowledge this task?',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn) {
                var acknowledgeModel = Ext.create('Atlas.common.model.shared.QManagementData', {}),
                    overduePrescriptions = me.getViewModel().getStore('overduePrescriptions');

                if (btn === 'yes') {
                    acknowledgeModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
                    acknowledgeModel.getProxy().setExtraParam('pSystemID', record.get('alertSystemID'));
                    acknowledgeModel.getProxy().setExtraParam('pFields', 'y' + '|' + me.formatDate(new Date()) + '|' + user.un);
                    acknowledgeModel.phantom = false;
                    acknowledgeModel.getProxy().url = 'shared/rx/qmanagementdata';
                    acknowledgeModel.save({
                        callback: function() {
                            overduePrescriptions.load();
                        }
                    });
                }
            }
        });
    },

    formatDate: function(date) {
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    }
});