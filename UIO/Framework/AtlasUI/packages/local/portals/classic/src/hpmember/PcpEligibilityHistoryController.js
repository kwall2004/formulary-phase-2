/**
 * Created by b6636 on 11/7/2016.
 */
Ext.define('Atlas.portals.hpmember.PcpEligibilityHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pcpEligibilityHistoryController',

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            familyCombo = this.lookupReference('familyListCombo'),
            lobCombo = this.lookupReference('lobCombo'),
            user = Ext.first('viewport').getViewModel().get('user');

        familyCombo.setValue(user.recipientId);

        this.loadAlertCodes();
    },

    loadAlertCodes: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user');

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'portal/hp/listitems/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pListName: 'memberAlerts',
                userState: user.portalStateSelected
            }),
            success: function (response) {
                var obj = Ext.decode(response.responseText),
                    items = obj.metadata.pListItems,
                    data = [],
                    i = 0,
                    pairs, len;

                // Prepare the data
                pairs = items.split('^');
                len = pairs.length;

                for (; i < len; i += 2) {
                    data.push({
                        name: pairs[i],
                        value: pairs[i + 1]
                    });
                }

                vm.set('alertCodes', data);
            },
            failure: function (response) {
                console.log('getMemberAlerts failed');
            }
        });
    },

    initializeFamilyList: function () {
        var familyListStore = {},
            combo = this.lookupReference('familyListCombo'),
            user = Ext.first('viewport').getViewModel().get('user');

        familyListStore = new Ext.data.Store({
            fields: [
                'familyList'
            ]
        });

        familyListStore.loadData(user.familyList);
        combo.setStore(familyListStore);
    },

    onFamilyListChange: function (sender, newValue, oldValue) {
        // Get the selected members primary LOB and set the lobCombo value
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            store = vm.getStore('memberDataStore'),
            proxy = store.getProxy(),
            lobStore = vm.getStore('memberLobStore'),
            lobProxy = lobStore.getProxy(),
            recipientId = newValue;

        vm.set('familyRecipientId', newValue);
        //vm.set('primaryLob', null);

        proxy.setExtraParam('pSessionID', user.sessionId);
        proxy.setExtraParam('pRecipientID', recipientId);
        proxy.setExtraParam('pFieldList', 'lastName,firstName,birthDate,gender,homePhone.contactInfo,@primaryLOB,@contCoverageSince,@contCoverageTerm,@enrollmentStatus,@PCP,@PCPPhone,@familyList,@alerts');
        proxy.setExtraParam('portalPlan', '');
        store.load({
            callback: function (records) {
                //parse familyList
                var record = records[0],
                    memberAlertCodes,
                    alertCodes = vm.get('alertCodes'),
                    alerts = [];

                vm.set('lastName', record.get('lastName'));
                vm.set('firstName', record.get('firstName'));
                vm.set('birthDate', Ext.Date.format(record.get('birthDate'), 'm/d/Y'));
                vm.set('gender', record.get('gender'));
                vm.set('homePhone', me.formatPhone(record.get('homePhone.contactInfo')));
                vm.set('contCoverageSince', record.get('@contCoverageSince'));
                vm.set('contCoverageTerm', record.get('@contCoverageTerm'));
                vm.set('enrollmentStatus', record.get('@enrollmentStatus'));
                vm.set('PCP', record.get('@PCP'));
                vm.set('PCPPhone', me.formatPhone(record.get('@PCPPhone')));
                vm.set('primaryLob', record.get('@primaryLOB')); // setting this value should fire a change event

                // parse the alerts
                memberAlertCodes = record.get('@alerts');
                for (var i = 0; i < alertCodes.length; i++) {
                    if (memberAlertCodes.indexOf(alertCodes[i].value) != -1) {
                        alerts.push(alertCodes[i].name);
                    }
                }

                if (alerts.length > 0) {
                    vm.set('alerts', alerts.join(', '));
                    vm.set('hideAlerts', false);
                }
                else {
                    vm.set('alerts', '');
                    vm.set('hideAlerts', true);
                }

                // load the LOB list for this member
                lobStore.removeAll(true);
                lobStore.reload({
                    params: {
                        pRecipientID: recipientId
                    }
                });

                // decode any alert value
            }
        });
    },

    onLobChange: function (sender, newValue, oldValue) {
        var me = this,
            vm = me.getViewModel();

        vm.set('primaryLob', newValue);
        this.loadValues();
    },

    loadValues: function () {
        console.log('loadValues()');

        var me = this,
            vm = me.getViewModel(),
            eligibilityStore = vm.getStore('eligibilityStore'),
            eligibilityProxy = eligibilityStore.getProxy(),
            pcpStore = vm.getStore('pcpStore'),
            pcpProxy = pcpStore.getProxy(),
            lobStore = vm.getStore('memberLobStore'),
            lobProxy = lobStore.getProxy(),
            lobCombo = this.lookupReference('lobCombo'),
            user = Ext.first('viewport').getViewModel().get('user'),
            recipientId = vm.get('familyRecipientId'),
            lobId = vm.get('primaryLob');

        eligibilityProxy.setExtraParam('pRecipientID', recipientId);
        eligibilityProxy.setExtraParam('pLOBID', lobId);
        eligibilityStore.load();

        pcpProxy.setExtraParam('pRecipientID', recipientId);
        pcpProxy.setExtraParam('pLOBID', lobId);
        pcpStore.load();
    },

    printReport: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {}),
            proxy = requestModel.getProxy(),
            familyCombo = me.lookupReference('familyListCombo'),
            familyMemberRecipientId = familyCombo.getValue(),
            strFamilyChk = 'No',
            strEligChk =  'Yes',
            strHedisChk =  'No',
            strPCPChk = 'No',
            parameters = familyMemberRecipientId + '|' + strEligChk + '|' + strPCPChk + '|' + strFamilyChk + '|' + strHedisChk;

        requestModel.phantom = false;
        proxy.url = 'eligibility/hp/runreport64'; // do we need this?
        proxy.setExtraParam('pSessionID', user.sessionId);
        proxy.setExtraParam('pReportName', 'memberrpt.p');
        proxy.setExtraParam('pParameters', parameters);
        proxy.setExtraParam('pRegenReport', 2);
        proxy.setExtraParam('pOutputType', 'pdf');
        proxy.setExtraParam('pJobNum', '0');
        proxy.setExtraParam('userState', user.portalStateSelected);

        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;

                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    Ext.MessageBox.alert('Error', 'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.', function () {
                    });
                } else {
                    window.open("data:application/pdf;base64," + escape(base64EncodedPDF), "mywindow", "menubar=1,resizable=1,width=1300,height=1050");
                }
            },
            failure: function (response) {
                console.log('Print report failed.', response);
            }
        });
    },

    formatPhone: function (value) {
        return Atlas.common.Util.formatPhone(value);
    }
});