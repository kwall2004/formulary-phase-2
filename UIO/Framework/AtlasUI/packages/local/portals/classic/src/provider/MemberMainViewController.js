/**
 * Created by c4539 on 11/9/2016.
 */
Ext.define('Atlas.portals.provider.MemberMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsprovidermembermain',

    listen: {
        controller: {
            '*': {
                providerMemberSelected: 'onProviderMemberSelected'
            }
        }
    },

    init: function() {
        this.loadPageFromRedirect();
        this.maybeLoadMember();
        this.loadMemberPlans();
    },

    onTabChange: function() {
        var tabName = this.lookupReference('memberTabs').getActiveTab().title;
        var memberId = this.lookupReference('memberCardID').getValue();

        if(tabName !== 'Claim Status') {
            return;
        }

        var today = new Date();
        var lastYear = today.setFullYear(today.getFullYear() - 1);
        lastYear = new Date(lastYear);

        if(memberId) {
            this.fireEvent('openView', 'hpprovider', 'portals', 'provider_ProviderMain', {
                memberId: memberId,
                fromDate: lastYear,
                atlasId: memberId + '-Claim Status',
                activeTab: 'claimstatus'
            });
            return;
        }
        Ext.Msg.alert('Invalid Member ID', 'Member ID is required to view Claim Status tab.');
    },

    loadPageFromRedirect: function() {
        var recipientIDInput = this.getView().recipientIDInput,
            memberTabs = this.lookup('memberTabs'),
            memberId = '';

        if (recipientIDInput !== undefined) {
            this.getMemberData(recipientIDInput,'Demographics');
            memberTabs.setActiveTab(6);
        } else {
            return false;
        }

        this.getView().getViewModel().set('isMemberTabVisited', true);
        if (!memberId) { this.resetPage(); return; }
        this.onMemberIdBlur(memberId);
    },

    maybeLoadMember: function() {
        var id = this.getView().memberId,
            tab = this.getView().activeTab,
            memberInput = this.lookupReference('memberCardID');

        if (!id) { return; }
        if (!tab) { tab = 'Demographics'; }
        memberInput.setValue(id);
        this.lookupReference('memberTabs').setActiveTab(this.lookupReference(tab));
        this.onMemberIdBlur(this.lookupReference('memberCardID'));
    },

    loadMemberPlans: function() {
        var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            plansStore = {},
            plansCombo = this.lookupReference('memberPlan');

        listItemsModel.getProxy().setExtraParam('pListName', 'ProvPortalPlanLOB');
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    plansMap = [],
                    splitValues = [];

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 1; i < splitValues.length; i++) {
                    plansMap.push({
                        key: splitValues[i],
                        value: splitValues[i + 1]
                    });
                }

                plansStore = new Ext.data.ArrayStore({});
                plansStore.add(plansMap);
                plansCombo.setStore(plansStore);
            }
        });
    },

    onMemberPlanSelected: function() {
        this.onMemberIdBlur(this.lookupReference('memberCardID'));
    },

    onProviderMemberSelected: function(params) {
        this.lookupReference('memberCardID').setValue(params.memberId);

        if (!params.action) { return; }
        this.onMemberIdBlur(this.lookupReference('memberCardID'));
    },

    onMemberIdBlur: function(input) {
        var memberId = input.value.trim();

        if (!memberId) { return; }
        this.getView().getViewModel().set('isDocumentsTabVisited', false);
        this.doProcess(memberId);
    },

    onMemberKeyPress: function(field, event) {
        if (event.getKey() === event.ENTER) {
            this.onMemberIdBlur(this.lookupReference('memberCardID'));
        }
    },

    openMemberSearch: function() {
        var memberText = this.lookupReference('memberCardID').value;

        Ext.create('Ext.window.Window', {
            title: 'Member Search',
            modal: true,
            reference: 'memberSearchWindow',
            items: {
                xtype: 'portalsprovidermembersearchwindow',
                viewModel: {
                    stores: {
                        memberSearch: {
                            model: 'Atlas.portals.provider.model.MemberMasterExt'
                        }
                    },
                    data: {
                        memberText: memberText,
                        errorMessage: ''
                    }
                }
            }
        }).show();
    },

    onHraSelect: function() {
        var tabName = 'HMS Assessment';

        // TODO: Route to HMS page
    },

    onIcSelect: function() {
        var optionsRecordModel = Ext.create('Atlas.common.model.HoldPayment', {}),
            me = this;

        optionsRecordModel.getProxy().setExtraParam('pKeyName', 'MeridianPortalURL');
        optionsRecordModel.load({
            callback: function(record, operation) {
                var result = Ext.JSON.decode(operation._response.responseText).metadata.pKeyValue;
                if (!result) { return; }
                // TODO: Open integratedCareForm
            }
        });
    },

    doProcess: function(memberId) {
        var form = this.lookupReference('memberForm'),
            tabName = this.lookupReference('memberTabs').getActiveTab().title,
            vm = this.getView().getViewModel(),
            recipientId = vm.get('recipientId');

        if (!memberId) {
            this.resetPage();
            return;
        }

        switch(tabName) {
            case 'Demographics':
                this.getDetails(memberId, tabName);
                break;
            case 'HEDIS':
                this.getDetails(memberId, tabName);
                break;
            case 'Authorizations':
                this.getDetails(memberId, tabName);
                break;
            case 'Immunizations':
                this.getDetails(memberId, tabName);
                break;
            case 'COB':
                this.getDetails(memberId, tabName);
                break;
            case 'Claim Status':

                var today = new Date();
                var lastYear = today.setFullYear(today.getFullYear() - 1);
                lastYear = new Date(lastYear);

                if (memberId) {
                    this.getDetails(memberId, tabName);
                    this.fireEvent('openView', 'hpprovider', 'portals', 'provider_ProviderMain', {
                        memberId: memberId,
                        fromDate: lastYear,
                        atlasId: memberId + '-Claim Status',
                        activeTab: 'claimstatus'
                    });
                    break;
                }
                Ext.Msg.alert('User Prompt', 'Member ID is required to view Claim Status tab.');
                break;
            case 'Messages':
                this.getDetails(memberId, tabName);
                // TODO: make call to retrieve latest messages
                break;
            case 'Documents':
                this.getDetails(memberId, tabName);
                break;
            case 'ICD':
                this.getDetails(memberId, tabName);
                break;
            case 'Care Team':
                this.getDetails(memberId, tabName);
                break;
        }
    },

    getDetails: function(memberId, tabName) {
        var user = Ext.first('viewport').getViewModel().get('user'),
            planCombo = this.lookupReference('memberPlan'),
            plan = '',
            memberRecipientModel = Ext.create('Atlas.portals.provider.model.PortalMemberFuncs', {}),
            me = this;

        if (!planCombo.disabled) {
            plan = planCombo.getValue();
            planCombo.disable();
            planCombo.setValue('');
        }

        memberRecipientModel.getProxy().setExtraParam('pSessionID', user.sessionId);
        memberRecipientModel.getProxy().setExtraParam('pFunction', 'fGetRecipientID');
        memberRecipientModel.getProxy().setExtraParam('pPlanId', '');
        memberRecipientModel.getProxy().setExtraParam('pLobID', plan);
        memberRecipientModel.getProxy().setExtraParam('pMemberID', memberId);
        memberRecipientModel.getProxy().setExtraParam('pRecipientID', '');
        memberRecipientModel.getProxy().setExtraParam('pMemberDOB', '');
        memberRecipientModel.getProxy().setExtraParam('pPortalPlan', '');
        memberRecipientModel.getProxy().setExtraParam('pPortalType', 'Provider');
        memberRecipientModel.getProxy().setExtraParam('userState', user.homeState);
        memberRecipientModel.load({
            callback: function(record) {
                var response = '';

                if (!record && !record.data && !record.data.value) {
                    Ext.Msg.alert('Error', 'There was an error searching for this member.');
                    return;
                }

                response = record.data.value;
                if (response.indexOf('Duplicate') > 0) {
                    planCombo.enable();
                    return;
                }
                if (response.indexOf('ERROR') < 0) {
                    if (me.getView().getViewModel().get('recipientId') === response) { return; }
                    me.getView().getViewModel().set('recipientId', response);
                    me.getMemberData(response, tabName);
                    return;
                }

                me.getView().getViewModel().set('errorMessage', 'Member ID - ' + memberId + ' not found');
                Ext.Msg.alert(
                    'Error',
                    response.substring(0, response.indexOf('Not')) + memberId + ' ' + response.substring(response.indexOf('Not')),
                    function() {
                        me.resetPage();
                    }
                );
            }
        });
    },

    resetPage: function() {
        // TODO: Need to reset tab pages and error messages as well
        this.getView().getViewModel().set('errorMessage', '');
        this.getView().getViewModel().set('isHealthyMI', false);
        this.getView().getViewModel().set('isMIHealthLink', false);
        this.getView().getViewModel().set('memberCap', '');
        this.lookupReference('memberForm').reset();
    },

    getMemberData: function(recipientId, tabName) {
        var user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            memberIdTextbox = this.lookupReference('memberCardID'),
            memberDataModel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {}),
            fields = "recipientID,lastName,firstName,"+
                    "@birthDate,@enrollmentStatus,@PCP,gender,"+
                    "@familyList,@contCoverageSince,@contCoverageTerm,"+
                    "homePhone.contactInfo,@PCPPhone,SystemID,"+
                    "@alerts,@PCPauthfax,@hedis,home.countyCode,"+
                    "@memberLanguage,caseNumber,socSecNum,home.Address1,"+
                    "home.Address2,home.City,home.State,home.Zip,"+
                    "workPhone.contactInfo,Cell.contactInfo,eMail.contactinfo,"+
                    "resp.Address1,resp.Address2,resp.City,resp.State,resp.Zip,"+
                    "respHomePhone.contactInfo,respWorkPhone.contactInfo,@lastPcpVisit,@age,@memberCap,@phoName,"+
                    "@primaryLOB,mcirID,@memberCardID,respFirstName,respMiddleName,respLastName,@COCSystemID,@enableHealthPassport,"+
                    "@policySummary,@benefitPlanCode,@isMIHealthLink,@isHealthyMI,@commercialStatusScreen,@commercialDelinquencyDays,@commercialAPTCMember";

        memberDataModel.getProxy().setExtraParam('pSessionID', user.sessionId);
        memberDataModel.getProxy().setExtraParam('pRecipientID', recipientId);
        memberDataModel.getProxy().setExtraParam('pAppServerID', '');
        memberDataModel.getProxy().setExtraParam('portalPlan', '');
        memberDataModel.getProxy().setExtraParam('pFieldList', fields);
        memberDataModel.getProxy().setExtraParam('userState', user.homeState);
        memberDataModel.load({
            callback: function(record) {
                var vm = me.getView().getViewModel(),
                  benefitPlanField = me.lookup('memberForm').items.items[2].items.items[2];

                if (!record) {
                    Ext.Msg.alert('Error', 'There was an error searching for this member.');
                    return;
                }

                var str = JSON.stringify(record.data);
                var email = record.get('eMail.contactinfo');
                str = str.replace(/@|\./g, '');

                var converted = JSON.parse(str);

                converted.eMailcontactinfo = email;
                converted = me.mapMember(converted);
                record.data = {};
                record.data = converted;

                memberIdTextbox.setValue(record.data.memberCardID);

                me.lookupReference('memberForm').loadRecord(record);

                if (record.get('policySummary') === '') {
                    benefitPlanField.setValue(record.get('primaryLOB'));
                } else {
                    benefitPlanField.setValue(record.get('policySummary'));
                }

                vm.set('memberDetails', converted);

                if (user.homeState === 'IL' && record.get('enableHealthPassport').toLowerCase() === 'yes') {
                    // TODO: Enable health passport button
                } else {
                    // TODO: Disable health passport button
                }

                if (record.get('isHealthyMI').toLowerCase() === 'yes') {
                    vm.set('isHealthyMI', true);
                } else {
                    vm.set('isHealthyMI', false);
                }

                if (record.get('isMIHealthLink').toLowerCase() === 'yes') {
                    vm.set('integratedCareBtn', true);
                } else {
                    vm.set('integratedCareBtn', false);
                }

                switch(tabName) {
                    case 'Demographics':
                        var memberdetails = vm.get('memberDetails');
                        me.fireEvent('memberDetailsSet', memberdetails);
                        vm.set('tempDemographicsId', record.get('recipientID'));
                        break;
                    case 'HEDIS':
                        if (recipientId){
                            me.fireEvent('memberDetailsSet',  vm.get('memberDetails'));
                            vm.set('tempHedisId', record.get('recipientID'));
                        } else {
                            Ext.Msg.alert('Error', 'Invalid Member ID entered.');
                        }
                        break;
                    case 'Authorizations':
                        if (recipientId){
                            me.fireEvent('memberDetailsSet',  vm.get('memberDetails'));
                            vm.set('tempAuthId', record.get('recipientID'));
                        } else {
                            Ext.Msg.alert('Error', 'Invalid Member ID entered.');
                        }
                        break;
                    case 'Immunizations':
                        me.fireEvent('memberDetailsSet',  vm.get('memberDetails'));
                        vm.set('tempImmunizationId', record.get('recipientID'));
                        break;
                    case 'COB':
                        if (recipientId){
                            me.fireEvent('memberDetailsSet',  vm.get('memberDetails'));
                            vm.set('tempCobId', record.get('recipientID'));
                        } else {
                            Ext.Msg.alert('Error', 'Invalid Member ID entered.');
                        }
                        break;
                    case 'Documents':
                        me.lookupReference('family').setValue(recipientId);
                        me.fireEvent('memberDetailsSet',  vm.get('memberDetails'));
                        break;
                    case 'ICD':
                        var memberdetails = vm.get('memberDetails');
                        me.fireEvent('memberDetailsSet', memberdetails);
                        vm.set('tempICDId', record.get('recipientID'));
                        break;
                    case 'Care Team':
                        var memberdetails = vm.get('memberDetails');
                        me.fireEvent('memberDetailsSet', memberdetails);
                        vm.set('tempCareTeamId', record.get('recipientID'));
                        break;
                }
            }
        });
    },

    mapMember: function(memberObj) {
        var mappedMember = memberObj;

        if (!mappedMember.lastName) { return; }
        mappedMember.name = mappedMember.firstName + ' ' + mappedMember.lastName;
        mappedMember.PCPPhone = this.formatPhone(mappedMember.PCPPhone);

        if (mappedMember.birthDate){
            mappedMember.birthDate = Atlas.common.utility.Utilities.formatDate(new Date(mappedMember.birthDate), 'm/d/Y');
        }

        if (mappedMember.commercialAPTCMember === true) {
            if (mappedMember.commercialDelinquencyDays === 0) {
                mappedMember.delinquencyStatus = 'None';
                return;
            }
            if (mappedMember.commercialDelinquencyDays > 0 && member.commercialDelinquencyDays < 31) {
                mappedMember.delinquencyStatus = 'Month 1';
                return;
            }
            if (mappedMember.commercialDelinquencyDays > 30 && member.commercialDelinquencyDays < 61) {
                mappedMember.delinquencyStatus = 'Month 2';
                return;
            }
            mappedMember.delinquencyStatus = 'Month 3';
        } else if (mappedMember.commercialAPTCMember === false) {
            if (mappedMember.commercialDelinquencyDays === 0) {
                mappedMember.delinquencyStatus = 'None';
                return;
            }
            mappedMember.delinquencyStatus = 'Month 1';
        } else {
            mappedMember.delinquencyStatus = '';
        }

        this.setMemberAlerts(mappedMember.alerts);
        this.setLobList(mappedMember.recipientID);

        if (this.getView().getViewModel().get('familySelected')) {
            this.getView().getViewModel().set('familySelected', false);
        } else {
            this.setFamilyList(mappedMember.familyList);
            this.lookupReference('family').setValue(
                mappedMember.memberCardID + ' ' + mappedMember.lastName.trim() + ', ' + mappedMember.firstName.trim()
            );
        }

        if (mappedMember.memberCap.toLowerCase() === 'yes') {
            this.setMemberCap();
        }

        return mappedMember;
    },

    setMemberAlerts: function(alerts) {
        var detailedAlerts = '',
            trimmedAlerts = alerts.trim().replace(' ', ''),
            user = Ext.first('viewport').getViewModel().get('user'),
            listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            me = this;

        listItemsModel.getProxy().setExtraParam('pListName', 'memberAlerts');
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    alertsMap = [],
                    splitValues = [],
                    currentAlert = '';

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 1; i < splitValues.length; i++) {
                    alertsMap.push({
                        key: splitValues[i],
                        value: splitValues[i + 1]
                    });
                }

                for (var i = 0; i < alertsMap.length; i++) {
                    currentAlert = alertsMap[i].key;
                    if (trimmedAlerts.indexOf(alertsMap[i].key) !== -1) {
                        if (currentAlert === 'H' || currentAlert === 'C' || currentAlert === 'N') {
                            currentAlert = '<font color="red">' + currentAlert + '</font>';
                        }
                        detailedAlerts += '<span title="' + alertsMap[i].key + ' - ' + alertsMap[i].value + '">' + currentAlert + '</span>';
                    }
                }
                me.lookupReference('detailedAlerts').setValue(detailedAlerts);
            }
        });
    },

    setLobList: function(recipientId) {
        var lobModel = Ext.create('Atlas.portals.hpmember.model.MemberLobList', {}),
            me = this;

        lobModel.getProxy().setExtraParam('pRecipientID', recipientId);
        lobModel.load({
            callback: function(){
                var lobObject = this.getProxy().getReader().metaData,
                    storeData = [],
                    tempArray = [],
                    store = {},
                    names = {},
                    values = {};

                if (!lobObject) { return; }

                names = me.parseDelimitedString(lobObject.pLOBList, ',');
                values = me.parseDelimitedString(lobObject.pMemberIDList, ',');

                for (var i = 0; i < names.length; i++) {
                    tempArray = [];
                    if (i > values.length - 1) { return; }
                    tempArray.push(names[i]);
                    tempArray.push(values[i]);
                    storeData.push(tempArray);
                }

                store = new Ext.data.ArrayStore({
                    fields: ['name', 'value'],
                    data: storeData
                });

                me.lookupReference('lob').setStore(store);
                if (storeData && storeData.length === 1) {
                    me.lookupReference('lob').select(storeData[0]);
                }

                if (storeData && storeData.length > 1) {
                    me.lookupReference('lob').enable();
                } else {
                    me.lookupReference('lob').disable();
                }
            }
        });
    },

    setFamilyList: function(familyList) {
        var String = familyList,
            me = this;
        if(String != null || String != undefined) {
            var parts = String.split('^');

            var answer = [];

            for (var i=0; i<parts.length; i++) {
                if (i < 1) continue;
                if (i % 2 == 1) {
                    answer.push(parts[i-1] + '^' + parts[i]);
                }
            }

            var familyArray = [];

            for(var i = 0; i < answer.length; i++) {
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

            var familyCombo = me.lookupReference('family');
            familyCombo.setStore(familyStore);
            if (familyArray.length > 0) {
                familyCombo.setValue(familyArray[0][1]);
            }

            if (familyArray.length > 1) {
                me.lookupReference('family').enable();
            } else {
                me.lookupReference('family').disable();
            }
        }
    },

    setMemberCap: function() {
        var optionsRecordModel = Ext.create('Atlas.common.model.HoldPayment', {}),
            me = this;

        optionsRecordModel.getProxy().setExtraParam('pKeyName', 'StJPHOMemberNotice');
        optionsRecordModel.load({
            callback: function(record, operation) {
                var result = Ext.JSON.decode(operation._response.responseText).metadata.pKeyValue;
                if (!result) { return; }
                me.getView().getViewModel().set('memberCap', result);
                // TODO: This is some label on the screen
            }
        });
    },

    onFamilySelected: function(combo, record) {
        var memberInput = this.lookupReference('memberCardID');

        this.getView().getViewModel().set('familySelected', true);
        memberInput.setValue(record.get('name').substring(0, record.get('name').indexOf(' ')).trim());
        this.onMemberIdBlur(memberInput);
    },

    parseDelimitedString: function(value, delimiter) {
        var array = [],
            splitValue = value.split(delimiter);

        for (var i = 0; i < splitValue.length; i++) {
            array.push(splitValue[i]);
        }

        return array;
    },

    formatDate: function(date) {
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    },

    formatPhone: function(input) {
        var value = input,
            filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'',
            i = 0,
            returnString = '';

        for (i = 0; i < value.length; i++) {
            var c = value.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += ' ';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }

        return returnString;
    },

    launchHRA: function(){
        var user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            vm = me.getViewModel(),
            recipientId = vm.get('recipientId'),
            memberDetails = vm.get('memberDetails');

        this.fireEvent('openView', 'hpprovider', 'common', 'hra_HMSAssessmentWelcome', {
            portalType: user.start,
            recipientId: recipientId,
            memberDetails: memberDetails
        });

        // this.fireEvent('openView', 'prescriber', 'portals', 'prescriber_FormularyDrugSearch', {
        //     brand: this.lookupReference('drugSearch').value,
        //     planGroupId: this.lookupReference('plan').value,
        //     planGroupName: this.lookupReference('plan').rawValue,
        //     atlasId: this.lookupReference('drugSearch').value
        // })

        /*var user = Ext.first('viewport').getViewModel().getData().user,
            tabPanel = this.lookup('workspaceTabs'),
            newView,
            newApp,
            referenceName = 'hpmember-hra',
            existingItem = me.lookupReference(referenceName);

        if (existingItem) {
            tabPanel.setActiveItem(existingItem);
            // TODO: Probably need to do something if this is a different member
        }
        else {
            debugger;
                newView = Ext.create('Atlas.portals.view.hpmember.HMSAssessmentWelcome', {
                    title: 'Health Risk Assessment',
                    reference: referenceName,
                    portalType: user.start
                });

            newApp = tabPanel.add(newView);
            tabPanel.setActiveItem(newApp);
        }*/
    }
});