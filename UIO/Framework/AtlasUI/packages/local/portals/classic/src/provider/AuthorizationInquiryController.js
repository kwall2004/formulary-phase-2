/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Inquiry
 * Description: Controller for Authorization Inquiry
 */
Ext.define('Atlas.portals.provider.AuthorizationInquiryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderAuthorizationInquiryController',

    listen: {
        controller: {
            '*': {
                authInquiryMemberSelected: 'loadMemberData',
                servicingFacilitySelected:'loadServicingFacility',
                servicingProviderSelected:'loadServicingProvider'
            }
        }
    },

    init: function (){
        this.onProviderListData();
        this.loadLevelOfServiceStore();
        this.loadStatusStore();
        this.loadReviewTypeStore();
        this.loadMeasureStore();
    },

    loadServicingProvider: function (params) {
        this.lookupReference('servicingProvRef').setValue(params.providerName);
    },

    loadServicingFacility: function (params) {
        this.lookupReference('servicingfacRef').setValue(params.facilityName);
    },

    onProviderListData: function(){
        var providerListStore = Ext.create('Atlas.portals.provider.model.ProviderList', {}),
            me = this;
        providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        providerListStore.load({
            scope: this,
            callback: function(record, operation) {
                var providerMap = [];
                var results = Ext.JSON.decode(operation._response.responseText).data;
                if (results.length > 0) {

                    for (var i = 0; i < results.length; i++) {
                        providerMap.push({
                            key: results[i].lastName + ', '+ results[i].firstName,
                            value: results[i].provID
                        });
                    }

                    var providerStore = new Ext.data.ArrayStore({});
                    providerStore.add(providerMap);
                    me.lookupReference('providerComboRef').setStore(providerStore);
                }
            }
        });
    },

    loadLevelOfServiceStore: function() {
        var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            serviceStore = {},
            serviceCombo = this.lookupReference('LOSComboRef');

        listItemsModel.getProxy().setExtraParam('pListName', 'ODAGLevelOfService');
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    servicesMap = [],
                    splitValues = [];

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 0; i < splitValues.length; i++) {
                    if (splitValues[i + 1] === '00') { i++; continue; }
                    servicesMap.push({
                        key: splitValues[i],
                        value: splitValues[i + 1]
                    });
                    i++;
                }

                serviceStore = new Ext.data.ArrayStore({});
                serviceStore.add(servicesMap);
                serviceStore.sort('value', 'ASC');
                serviceCombo.setStore(serviceStore);
            }
        });
    },

    loadStatusStore: function() {
        var listItemsModel = Ext.create('Atlas.portals.provider.model.ListItems', {}),
            statusStore = {},
            statusCombo = this.lookupReference('statusComboRef');

        listItemsModel.getProxy().setExtraParam('pListName', 'authStatus');
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).metadata.pListItems,
                    statusMap = [],
                    splitValues = [];

                if (!results) { return; }

                splitValues = results.split('^');

                for (var i = 0; i < splitValues.length; i++) {
                    if (splitValues[i + 1] === 'Default') { i++; continue; }
                    statusMap.push({
                        key: splitValues[i],
                        value: splitValues[i + 1]
                    });
                    i++;
                }

                statusStore = new Ext.data.ArrayStore({});
                statusStore.add(statusMap);
                statusStore.sort('key', 'ASC');
                statusCombo.setStore(statusStore);
            }
        });
    },

    loadReviewTypeStore: function() {
        var vm = this.getView().getViewModel();

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'shared/hp/listitemdata6/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pListName: 'AuthPriorityWeb',
                userState: Atlas.user.providerStateSelected
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                var reviewTypeStore = new Ext.data.ArrayStore({});
                reviewTypeStore.add(obj.data);
                vm.set('reviewTypeStore', reviewTypeStore);
            }
        });
    },

    loadMeasureStore: function() {
        var vm = this.getView().getViewModel();

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'shared/hp/listitemdata6/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pListName: 'UnitsOfMeasure',
                userState: Atlas.user.providerStateSelected
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                var measureStore = new Ext.data.ArrayStore({});
                measureStore.add(obj.data);
                vm.set('measureStore', measureStore);
            }
        });
    },
    
    onEnterClick: function(){
      this.onMemberIDBlur();  
    },

    loadMemberData: function(params) {
        this.lookupReference('memberIdRef').setValue(params.memberId);
        this.onMemberIDBlur();
    },
    
    onMemberIDBlur: function(){
        var plan = '',
            memberIdStore = Ext.create('Atlas.portals.provider.model.PortalMemberFuncs', {}),
            me = this;
        
        memberIdStore.getProxy().setExtraParam('pFunction', 'fGetRecipientID');
        memberIdStore.getProxy().setExtraParam('pPlanId', '');
        memberIdStore.getProxy().setExtraParam('pLobID', '');
        memberIdStore.getProxy().setExtraParam('pMemberID', this.lookupReference('memberIdRef').getValue());
        memberIdStore.getProxy().setExtraParam('pRecipientID', '');
        memberIdStore.getProxy().setExtraParam('pMemberDOB', '');
        memberIdStore.getProxy().setExtraParam('pPortalPlan', '');
        memberIdStore.getProxy().setExtraParam('pPortalType', 'Provider');
        memberIdStore.load({
            callback: function(records) {
                var response = '';
                if (!records && !records.length) {
                    Ext.Msg.alert('Error', 'There was an error searching for this member.');
                    return;
                }

                response = records.data.value;
                if (response.indexOf('Duplicate') > 0) {
                    Ext.Msg.alert('Error', 'There was an error searching for this member.');
                    return;
                }

                if (response.indexOf('ERROR') < 0) {
                    me.getView().getViewModel().set('recipientId', records.get('value'));
                    me.getMemberData(records.get('value'));
                    me.fireEvent('loadVisitCount', records.get('value'));
                    return;
                }

                me.getView().getViewModel().set('memberTermDate', '');
                me.getView().getViewModel().set('recipientId', '');
                Ext.Msg.alert('Error', 'Invalid Member ID entered');
            }
        });
    },

    getMemberData: function(recipientId) {
        var me = this,
            memberDataModel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {}),
            fields = "recipientID,lastName,firstName,"+
                "birthDate,@enrollmentStatus,@PCP,gender,"+
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


        memberDataModel.getProxy().setExtraParam('pRecipientID', recipientId);
        memberDataModel.getProxy().setExtraParam('pAppServerID', '');
        memberDataModel.getProxy().setExtraParam('portalPlan', '');
        memberDataModel.getProxy().setExtraParam('pFieldList', fields);
        memberDataModel.load({
            callback: function(record) {
                if (!record) {
                    Ext.Msg.alert('Error', 'There was an error searching for this member.');
                    return;
                }

                if (!record.get('lastName')) {
                    me.lookupReference('memberNameRef').setValue('Member not found');
                    me.getView().getViewModel().set('memberTermDate', '');
                    return;
                }

                me.lookupReference('memberNameRef').setValue(record.get('lastName') + ', ' + record.get('firstName'));
                me.lookupReference('pcpRef').setValue(record.get('@PCP'));
                me.getView().getViewModel().set('lobId', record.get('@primaryLOB'));
                me.getView().getViewModel().set('benefitPlanCode', record.get('@benefitPlanCode'));
                me.getView().getViewModel().set('memberTermDate',
                    record.get('@contCoverageTerm') ? record.get('@contCoverageTerm') : ''
                );
            }
        });
    },

    onLevelOfServiceSelect: function(combo, records, eOpts) {
        this.lookupReference('PCComboRef').setDisabled(false);
        var vLevelOfServiceCriteria = ' AND levelOfService=\\"'+this.lookupReference('LOSComboRef').getRawValue()+'\\" ';
        var IOparamData = '{"ttParameters": [   '+
            '{     "parameterName": "pSessionID",     "parameterValue": "'+Atlas.user.sessionId+'"   },    '+
            '{     "parameterName": "pActionType",     "parameterValue": "get"   },     '+
            '{     "parameterName": "pScreenName",     "parameterValue": "portalProcedureCategory"   },    '+
            '{     "parameterName": "pUserName",     "parameterValue": "'+Atlas.user.un+'"   },     '+
            '{     "parameterName": "pRowid",     "parameterValue": null   },    '+
            '{     "parameterName": "pRowNum",     "parameterValue": "0"   },    '+
            '{     "parameterName": "pRows",     "parameterValue": "999"   },     '+
            '{     "parameterName": "pWhere",     "parameterValue": "active=yes AND TermDate=? AND LOOKUP(' + '\\"Medicare' + '\\", lobID) > 0 '+vLevelOfServiceCriteria+'"   },     '+
            '{     "parameterName": "pResultWhereStmt",     "parameterValue": ""   },     '+
            '{     "parameterName": "pSort",     "parameterValue": ""   },    '+
            '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },     '+
            '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },    '+
            '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttoDCDProcedureCategory' + '\\": [\\n]}\\n"   } ' +
            ']}';


        var listItemsModel = Ext.create('Atlas.portals.provider.model.OdcdProcedureCategoryApi', {}),
            statusStore = {},
            statusCombo = this.lookupReference('PCComboRef');

        listItemsModel.getProxy().setExtraParam('pParamsIO', IOparamData);
        listItemsModel.load({
            callback: function(record, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).data.ttODCDProcedureCategory;
                if (!results) { return; }
                statusStore = new Ext.data.ArrayStore({});
                statusStore.add(results);
                statusStore.sort('procedureCategory', 'ASC');
                statusCombo.setStore(statusStore);
                statusCombo.setValue('');
            }
        });
    },

    onPrintAuth: function(view, rowIndex, colIndex, item, e, record) {
        var requestId = record.get('requestID'),
            printModel = Ext.create('Atlas.portals.provider.model.PortalAuthPrint', {});

        printModel.getProxy().setExtraParam('pRequestId', requestId);
        printModel.load({
            callback: function(record) {
                var metadata = this.getProxy().getReader().metaData;

                if (metadata && metadata.pBase64Doc) {
                    Atlas.common.utility.Utilities.displayDocument('pdf', metadata.pBase64Doc);
                    return;
                }

                Ext.MessageBox.alert('Error', 'Document data not found.', function(){});
            }
        });
    },

    onVisitCountClick : function(){
        var authSearchGrid = this.lookupReference('authInquiryGridRef'),
            recipientId = this.getViewModel().get('recipientId'),
            benefitPlanCode = this.getViewModel().get('benefitPlanCode'),
            window = Ext.ComponentQuery.query('window[itemId=viewVisitCountWindow]')[0];

        if (!window) {
            window = Ext.create('Ext.window.Window', {
                reference: 'viewVisitCountWindow',
                width: 800,
                title: 'Member Visit Counts',
                layout: 'fit',
                modal: true,
                viewModel: {},
                session: {
                    schema: 'atlas'
                },
                items: [{
                    xtype: 'portalsProviderVisitCount'
                }]
            });
        }

        if (recipientId) {
            if (benefitPlanCode) {
                window.setViewModel({
                    data: {
                        recipientId: recipientId,
                        benefitPlanCode: benefitPlanCode,
                        displayDate: false
                    }
                });
                window.show();
            } else {
                Ext.Msg.alert('Visit Count Error', 'Member Benefit Plan Code for input member is not available.');
            }
        } else if (authSearchGrid.getSelectionModel().hasSelection()) {
            var selectedRecord = authSearchGrid.getSelectionModel().getSelection()[0];

            if (selectedRecord.get('benefitPlanCode')) {
                window.setViewModel({
                    data: {
                        recipientId: selectedRecord.get('recipientID'),
                        benefitPlanCode: selectedRecord.get('benefitPlanCode'),
                        displayDate: false
                    }
                });
                window.show();
            } else {
                Ext.Msg.alert('Visit Count Error', 'Member Benefit Plan Code for input member is not available.');
            }
        } else {
            Ext.Msg.alert('Selection Error','Please select a request from the search result.');
        }
    },

    onNewButtonClick: function(){
        var authSearchGrid = this.lookupReference('authInquiryGridRef'),
            recipientId = this.getViewModel().get('recipientId'),
            benefitPlanCode = this.getViewModel().get('benefitPlanCode'),
            memberId = '';

        if (authSearchGrid.getSelectionModel().hasSelection()) {
            var selectedRecord = authSearchGrid.getSelectionModel().getSelection()[0];
            memberId = selectedRecord.get('memberID');
            recipientId = selectedRecord.get('recipientID');
        } else if (recipientId) {
            memberId = this.lookupReference('memberIdRef');
        }

        this.fireEvent('openView', 'hpprovider', 'portals', 'provider_CreateAuthRequest', {
            keyType: 'MemberId',
            keyValue: memberId,
            atlasId: memberId
        });
    },
    
    onProviderLookupClick: function () {
        var me = this;
        var window = Ext.ComponentQuery.query('window[itemId=viewProviderSearchWindow]')[0];
        if(!window){
            var window = Ext.create('Ext.window.Window', {
                reference: 'viewProviderSearchWindow',
                width: 800,
                title: 'Provider Search',
                viewModel: {
                    data: {
                        searchFrom: 'ServicingProvider'
                    }
                },
                layout: 'fit',
                session:{
                    schema:'atlas'
                },
                items:[{
                    xtype:'portalsProviderFacilityLookup'
                }]
            }).show();
        }else{
            window.show();
        }
    },
    
    onFacilityLookupClick: function () {
        var me = this;
        var window = Ext.ComponentQuery.query('window[itemId=viewFacilitySearchWindow]')[0];
        if(!window){
            var window = Ext.create('Ext.window.Window', {
                reference: 'viewFacilitySearchWindow',
                width: 800,
                title: 'Provider Search',
                viewModel: {
                    data: {
                        searchFrom: 'ServicingFacility'
                    }
                },
                layout: 'fit',
                session:{
                    schema:'atlas'
                },
                items:[{
                    xtype:'portalsProviderFacilityLookup'
                }]
            }).show();
        }else{
            window.show();
        }
    },

    onMemberLookupClick: function(){
        var me = this;
        var window = Ext.ComponentQuery.query('window[itemId=viewMemberSearchWindow]')[0];
        if(!window){
            var window = Ext.create('Ext.window.Window', {
                reference: 'viewMemberSearchWindow',
                width: 800,
                title: 'Member Search',
                scrollable:true,
                modal: true,
                layout: 'fit',
                session:{
                    schema:'atlas'
                },
                items:[{
                    xtype:'portalsProviderAuthInquiryMemberSearch'
                }]
            }).show();
        }else{
            window.show();
        }
    },
    
    onSearchButtonClick: function(){
        var vWhere = "";
        var vResultWhereStmt = "",
            me = this;

        this.lookupReference('authInquiryGridRef').getStore().removeAll();
        this.lookupReference('requestDetailGridRef').getStore().removeAll();

        if (!this.lookupReference('startDateRef').isValid() || !this.lookupReference('endDateRef').isValid()) {
            Ext.Msg.alert('Search Error','Date fields are mandatory.');
            return false;
        }

        if (this.lookupReference('requestIdRef').getValue() !== null && this.lookupReference('requestIdRef').getValue() !== "") {
            vWhere = vWhere + ' requestID=' + this.lookupReference('requestIdRef').getValue() + ' AND ';
        }
        if (this.getView().getViewModel().get('recipientId') !== null && this.getView().getViewModel().get('recipientId') !== "") {
            vWhere = vWhere + ' recipientID=' + this.getView().getViewModel().get('recipientId') + ' AND ';
        }
        if (this.lookupReference('startDateRef').getValue() !== null ) {
            vWhere = vWhere + ' startDate >= ' + this.lookupReference('startDateRef').getRawValue() + ' AND ';
        }
        if (this.lookupReference('endDateRef').getValue() !== null ) {
            vWhere = vWhere + ' endDate <= ' + this.lookupReference('endDateRef').getRawValue() + ' AND ';
        }
        if (this.lookupReference('LOSComboRef').getValue() !== null && this.lookupReference('LOSComboRef').getValue() !== "") {
            vWhere = vWhere + ' levelOfService = \\"' + this.lookupReference('LOSComboRef').getValue()+ '\\" AND ';
        }
        if (this.lookupReference('PCComboRef').getValue() !== null && this.lookupReference('PCComboRef').getValue() !== "") {
            vWhere = vWhere + ' procedureCategoryID = \\"' + this.lookupReference('PCComboRef').getValue() + '\\" AND ';
        }
        if (this.lookupReference('statusComboRef').getValue() !== null && this.lookupReference('statusComboRef').getValue() !== "") {
            vWhere = vWhere + ' requestStatus = \\"' + this.lookupReference('statusComboRef').getValue() + '\\"';
        }
        if (this.lookupReference('providerComboRef').getValue() !== null && this.lookupReference('providerComboRef').getValue() !== "") {
            vResultWhereStmt = vResultWhereStmt + ' RequestingProviderID =\\"' + this.lookupReference('providerComboRef').getValue() + '\\" OR ';
        } 
        if (this.lookupReference('servicingProvRef').getValue() !== null && this.lookupReference('servicingProvRef').getValue() !== "") {
            vResultWhereStmt = vResultWhereStmt + ' ServicingProviderID = \\"' + this.lookupReference('servicingProvRef').getValue() + '\\" OR ';
        } 
        if (this.lookupReference('servicingfacRef').getValue() !== null && this.lookupReference('servicingfacRef').getValue() !== "") {
            vResultWhereStmt = vResultWhereStmt + ' ServicingFacilityID = \\"' + this.lookupReference('servicingfacRef').getValue() + '\\"';
        } 
        if (vWhere.length > 3 && vWhere.substr(vWhere.length - 4) === "AND "){
            vWhere = vWhere.substring(0, vWhere.lastIndexOf('AND')) ;
        }
        if (vResultWhereStmt !== "") {
            if (vResultWhereStmt.length > 2 && vResultWhereStmt.substr(vResultWhereStmt.length - 3) === "OR ") {
                vResultWhereStmt = vResultWhereStmt.substring(0, vResultWhereStmt.lastIndexOf('OR')) + '' + vResultWhereStmt.substring(vResultWhereStmt.lastIndexOf('OR') + vResultWhereStmt.length);
            }

            vResultWhereStmt = '(' + vResultWhereStmt + ')';
        }

        if ((vWhere !== "") || (vResultWhereStmt !== "")) {
            var IOparamData = '{"ttParameters": [  ' +
                '{     "parameterName": "pSessionID",     "parameterValue": "'+Atlas.user.sessionId+'"   },   ' +
                '{     "parameterName": "pActionType",     "parameterValue": "get"   },   ' +
                '{     "parameterName": "pScreenName",     "parameterValue": "portalSearch"   },   ' +
                '{     "parameterName": "pUserName",     "parameterValue": "'+Atlas.user.un+'"   },   ' +
                '{     "parameterName": "pRowid",     "parameterValue": null   },   ' +
                '{     "parameterName": "pRowNum",     "parameterValue": "0"   },   ' +
                '{     "parameterName": "pRows",     "parameterValue": "999"   },   ' +
                '{     "parameterName": "pWhere",     "parameterValue": "' + vWhere + '"   },   ' +
                '{     "parameterName": "pResultWhereStmt",     "parameterValue": "' + vResultWhereStmt + '"   },   ' +
                '{     "parameterName": "pSort",     "parameterValue": "startDate DESC"   },   ' +
                '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },   ' +
                '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },   ' +
                '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttmemberODCDMaster' + '\\": [\\n]}\\n"   } ' +
                ']}';
            
            var memberODCDStore = this.getView().getViewModel().getStore('memberODCDStore');

            memberODCDStore.getProxy().setExtraParam('pParamsIO', IOparamData);
            memberODCDStore.load({
                callback: function(record, operation) {
                    me.getAuthInquiryStore(me, record);
                }
            });
        } else {
            Ext.Msg.alert('Search Error','Please search again with minimum required criteria.');
        }
    },

    getAuthInquiryStore: function (me, record) {
        var authInquiryRecord = {},
            authInquiryArray = [];

        if (0 === record.length) {
          Ext.Msg.alert('Auth Search', 'No matching requests found.');
          return;
        }

        authInquiryRecord = record["0"].data.ttmemberODCDMaster;

        for (var i = 0; i < authInquiryRecord.length; i++) {
            var individualArray = [];
            individualArray.push(authInquiryRecord[i].PlaceOfserviceDesc);
            individualArray.push(authInquiryRecord[i].RequestingProviderID);
            individualArray.push(authInquiryRecord[i].ServicingFacilityID);
            individualArray.push(authInquiryRecord[i].ServicingProviderID);
            individualArray.push(authInquiryRecord[i].benefitPlanCode);
            individualArray.push(authInquiryRecord[i].endDate);
            individualArray.push(authInquiryRecord[i].levelOfService);
            individualArray.push(authInquiryRecord[i].levelOfServiceDesc);
            individualArray.push(authInquiryRecord[i].memberID);
            individualArray.push(authInquiryRecord[i].memberName);
            individualArray.push(authInquiryRecord[i].placeOfServiceCode);
            individualArray.push(authInquiryRecord[i].procedureCategoryDesc);
            individualArray.push(authInquiryRecord[i].procedureCategoryID);
            individualArray.push(authInquiryRecord[i].recipientID);
            individualArray.push(authInquiryRecord[i].requestID);
            individualArray.push(authInquiryRecord[i].requestStatus);
            individualArray.push(authInquiryRecord[i].servicingFacility);
            individualArray.push(authInquiryRecord[i].servicingFacilityName);
            individualArray.push(authInquiryRecord[i].servicingProvider);
            individualArray.push(authInquiryRecord[i].servicingProviderName);
            individualArray.push(authInquiryRecord[i].startDate);
            individualArray.push(authInquiryRecord[i].dbRowID);
            individualArray.push(authInquiryRecord[i].systemID)
            authInquiryArray.push(individualArray);
        }

        var authInquiryStore = new Ext.data.ArrayStore({
            fields: ['PlaceOfServiceDesc', 'RequestingProviderID', 'ServicingFacilityID', 'ServicingProviderID', 'benefitPlanCode', 'endDate',
                     'levelOfService', 'levelOfServiceDesc', 'memberID', 'memberName', 'placeOfServiceCode', 'procedureCategoryDesc',
                     'procedureCategoryID', 'recipientID', 'requestID', 'requestStatus', 'servicingFacility', 'servicingFacilityName',
                     'servicingProvider', 'servicingProviderName', 'startDate', 'dbRowID', 'systemID'],
            data: authInquiryArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('authInquiryStore', authInquiryStore);
        me.lookupReference('newAuthButton').enable();
    },

    onAuthGridClick: function (rowNode, record) {
        this.lookupReference('newAuthButton').enable();
        this.getView().getViewModel().set('selectedAuth', record.data);
        this.loadDetails();
    },

    loadDetails: function() {
        var memberODCDServiceStore = this.getView().getViewModel().getStore('memberODCDServiceStore'),
            me = this,
            record = me.getView().getViewModel().get('selectedAuth');
        var IOparamData = '{"ttParameters": [   '+
            '{     "parameterName": "pSessionID",     "parameterValue": "'+Atlas.user.sessionId+'"   },    '+
            '{     "parameterName": "pActionType",     "parameterValue": "get"   },     '+
            '{     "parameterName": "pScreenName",     "parameterValue": "portalAuthServices"   },    '+
            '{     "parameterName": "pUserName",     "parameterValue": "'+Atlas.user.un+'"   },     '+
            '{     "parameterName": "pRowid",     "parameterValue": null   },    '+
            '{     "parameterName": "pRowNum",     "parameterValue": "0"   },    '+
            '{     "parameterName": "pRows",     "parameterValue": "999"   },     '+
            '{     "parameterName": "pWhere",     "parameterValue": "requestID=' + record.requestID + '"   },     '+
            '{     "parameterName": "pResultWhereStmt",     "parameterValue": ""   },     '+
            '{     "parameterName": "pSort",     "parameterValue": ""   },    '+
            '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },     '+
            '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },    '+
            '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttmemberODCDServices' +
            '\\": [\\n]}\\n"   } ' + ']}';
        memberODCDServiceStore.getProxy().setExtraParam("pParamsIO", IOparamData);
        memberODCDServiceStore.load({
            callback: function(record, operation) {
                me.getRequestDetailStore(me, record);
            }
        });
    },

    getRequestDetailStore: function (me, record) {
        var RequestDetailRecord = record["0"].data.ttmemberODCDServices,
            requestDetailArray = [];

        for (var i = 0; i < RequestDetailRecord.length; i++) {
            var individualArray = [];
            individualArray.push(RequestDetailRecord[i].rownum);
            individualArray.push(RequestDetailRecord[i].serviceCode);
            individualArray.push(RequestDetailRecord[i].serviceDescription);
            individualArray.push(RequestDetailRecord[i].startDate);
            individualArray.push(RequestDetailRecord[i].endDate);
            individualArray.push(RequestDetailRecord[i].serviceReqUnits);
            individualArray.push(RequestDetailRecord[i].requestedBy);
            individualArray.push(RequestDetailRecord[i].serviceApprovedUnits);
            individualArray.push(RequestDetailRecord[i].procedureCategoryDesc);
            individualArray.push(RequestDetailRecord[i].measureDesc);
            individualArray.push(RequestDetailRecord[i].serviceStatus);
            individualArray.push(RequestDetailRecord[i].reviewTypeDesc);
            individualArray.push(RequestDetailRecord[i].systemID);
            individualArray.push(RequestDetailRecord[i].serviceLineNumber);
            individualArray.push(RequestDetailRecord[i].serviceType);
            individualArray.push(RequestDetailRecord[i].dbRowID);
            individualArray.push(RequestDetailRecord[i].requestID);
            requestDetailArray.push(individualArray);
        }

        var requestDetailStore = new Ext.data.ArrayStore({
            fields: ['rownum','serviceCode', 'serviceDescription', 'startDate', 'endDate', 'serviceReqUnits', 'requestedBy',
                'serviceApprovedUnits', 'procedureCategoryDesc', 'measureDesc', 'serviceStatus', 'reviewTypeDesc', 'systemID',
                'serviceLineNumber', 'serviceType', 'dbRowID', 'requestID'],
            data: requestDetailArray,
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        me.getViewModel().set('RequestDetailStore', requestDetailStore);
    },

    onClearButtonClick: function() {
        this.getView().getViewModel().set('recipientId', '');
        this.getView().getViewModel().set('benefitPlanCode', '');
        this.lookupReference('authorizationForm').reset();
        this.lookupReference('authInquiryGridRef').getStore().removeAll();
        this.lookupReference('requestDetailGridRef').getStore().removeAll();
    },

    notesAction: function(grid, rowIndex, colIndex, button, event, record) {
        var systemId = record.get('systemID');

        Ext.create('Ext.window.Window', {
            reference: 'viewNotesWindow',
            width: 750,
            title: 'Auth Services Notes',
            layout: 'fit',
            modal: true,
            session: {
                schema: 'atlas'
            },
            items: [{
                xtype: 'portalsProviderAuthNotesWindow',
                viewModel: {
                    stores: {
                        'notes': {
                            model: 'Atlas.portals.provider.model.NotesMasterApi'
                        },
                        'contacts': {
                            model: 'Atlas.portals.provider.model.ListItemData6'
                        }
                    },
                    data: {
                        systemId: systemId
                    }
                }
            }]
        }).show();
    },

    addExtension: function(grid, rowIndex) {
        var row = grid.getStore().getAt(rowIndex);
        var authDetailModel = Ext.create('Atlas.portals.provider.model.MemberOdcdServicesApi', {
            serviceLineNumber: 0,
            startDate: Ext.Date.clearTime(new Date()),
            endDate: Ext.Date.clearTime(new Date()),
            serviceCode: row.get('serviceCode'),
            serviceType: row.get('serviceType'),
            dbRowID: row.get('dbRowID')
        });

        this.getView().getViewModel().set('odagAuthExtension', true);
        this.getView().getViewModel().set('odagAuthExtensionMinDate', row.get('endDate'));
        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, authDetailModel);
        grid.editingPlugin.startEdit(0, 0);
    },

    onExtensionEdit: function(context, row) {
        var grid = this.lookupReference('requestDetailGridRef');
        var selectedRecord = this.getView().getViewModel().get('selectedAuth');
        var newExtensionModel = Ext.create('Atlas.portals.provider.model.MemberOdcdWorkflowApi', {});
        var me = this;
        var vm = me.getViewModel();
        var recipientId = vm.get('recipientId');
        var record = row.record;

        if (record.get('serviceReqUnits') <= 0) {
            Ext.Msg.alert('Auth Service Extension - Validation Error', 'Requested units is a required data.');
            grid.editingPlugin.startEdit(0, 0);
            return false;
        }

        var sel = grid.getSelectionModel().getSelection();
        var model = sel[0];
        var maxId = 0;
        if (grid.getStore().count() > 0) {
            maxId = grid.getStore().getAt(0).get('serviceLineNumber');
            grid.getStore().each(function(rec) {
               maxId = Math.max(maxId, rec.get('serviceLineNumber'));
            });
        }
        var vServiceLineNumber = maxId + 1;
        var vWorkQueue = 'BH';
        var vWorkFlowID = 1;

        var servicesRecAll = [],
            workflowRecAll = [],
            servicediagRecAll = [],
            servicesRecTemp = {},
            workflowRecTemp = {},
            servicediagRecTemp = {};

        servicesRecTemp = {
            dbaction: 'create',
            recipientID: selectedRecord.recipientID,
            benefitPlanCode: selectedRecord.benefitPlanCode,
            requestID: selectedRecord.requestID,
            serviceType: model.get('serviceType'),
            serviceCode: model.get('serviceCode'),
            serviceDescription: model.get('serviceDescription'),
            serviceReqUnits: model.get('serviceReqUnits'),
            serviceStatus: 'Hold',
            serviceLineNumber:  vServiceLineNumber,
            createUser: Atlas.user.un,
            endDate: Ext.Date.format(new Date(model.get('endDate')), 'Y-m-d'),
            reviewType: model.get('reviewTypeDesc'),
            requestedBy: vm.get('AuthServiceRequestedBy'),
            startDate:  Ext.Date.format(new Date(model.get('startDate')), 'Y-m-d'),
            serviceMeasure: model.get('measureDesc'),
            rownum: 0,
            dbRowID: ''
        };
        servicesRecAll.push(servicesRecTemp);
        workflowRecTemp = {
            dbaction: 'create',
            workQueue: model.get('serviceType'),
            createUser: Atlas.user.un,
            assignedToUser: 'Default User',
            assignedToUserType: 'NR',
            requestID: selectedRecord.requestID,
            serviceLineNumber:  vServiceLineNumber
        };
        workflowRecAll.push(workflowRecTemp);

        var workflowRecAllFinal = workflowRecAll,
            servicesRecAllFinal = servicesRecAll;


        var setODCDAuthRequestStore = Ext.create('Atlas.portals.provider.model.ODCDAuthExtension', {});

        setODCDAuthRequestStore.phantom = false;
        setODCDAuthRequestStore.getProxy().setExtraParam('pSessionID', Atlas.user.sessionId);
        setODCDAuthRequestStore.getProxy().setExtraParam('pUserName', Atlas.user.un);

        setODCDAuthRequestStore.getProxy().setExtraParam('ttmemberODCDWorkflow', {
            ttmemberODCDWorkflow: workflowRecAllFinal
        });
        setODCDAuthRequestStore.getProxy().setExtraParam('ttmemberODCDServices', {
            ttmemberODCDServices: servicesRecAllFinal
        });


        setODCDAuthRequestStore.save({
            success: function (response, operation, record) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    requestID = obj.metadata.pRequestID;
            },
            callback: function (records, operation) {
                var memberODCDServiceStore = vm.getStore('memberODCDServiceStore');

                var IOparamData = '{"ttParameters": [   ' +
                    '{     "parameterName": "pSessionID",     "parameterValue": "' + Atlas.user.sessionId + '"   },    ' +
                    '{     "parameterName": "pActionType",     "parameterValue": "get"   },     ' +
                    '{     "parameterName": "pScreenName",     "parameterValue": "portalAuthServices"   },    ' +
                    '{     "parameterName": "pUserName",     "parameterValue": "' + Atlas.user.un + '"   },     ' +
                    '{     "parameterName": "pRowid",     "parameterValue": null   },    ' +
                    '{     "parameterName": "pRowNum",     "parameterValue": "0"   },    ' +
                    '{     "parameterName": "pRows",     "parameterValue": "999"   },     ' +
                    '{     "parameterName": "pWhere",     "parameterValue": "requestID=' + selectedRecord.requestID + '"   },     ' +
                    '{     "parameterName": "pResultWhereStmt",     "parameterValue": ""   },     ' +
                    '{     "parameterName": "pSort",     "parameterValue": ""   },    ' +
                    '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },     ' +
                    '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },    ' +
                    '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttmemberODCDServices' +
                    '\\": [\\n]}\\n"   } ' + ']}';
                memberODCDServiceStore.getProxy().setExtraParam("pParamsIO", IOparamData);
                memberODCDServiceStore.load({
                    callback: function (record, operation) {
                        me.getRequestDetailStore(me, record);
                    }
                });
            },
            failure: function (response, opts) {
                Ext.Msg.alert('Error', 'An error occurred while saving the record.\nError Code:' + response.get('pMessage'));
            }
        });
    },

    onExtensionCancelEdit: function(context, row) {
        if (row.record.get('systemID')) { return; }
        var grid = this.lookupReference('requestDetailGridRef'),
            authDetailsStore = grid.getStore(),
            selections = grid.getSelectionModel().getSelected().items;

        grid.editingPlugin.cancelEdit();
        for (var i = 0, r; r = selections[i]; i++) {
            authDetailsStore.remove(r);
        }
    },

    onExtensionBeforeEdit: function() {
        return this.getView().getViewModel().get('odagAuthExtension');
    },

    attachAction: function(grid, rowIndex, colIndex, button, event, record) {
        var systemId = record.get('systemID'),
            requestId = record.get('requestID');

        Ext.create('Ext.window.Window', {
            reference: 'addAttachmentWindow',
            width: 455,
            title: 'Document Master',
            layout: 'fit',
            modal: true,
            session: {
                schema: 'atlas'
            },
            items: [{
                xtype: 'portalsProviderAuthAttachmentWindow',
                viewModel: {
                    stores: {
                        documents: {
                            model: 'Atlas.portals.provider.model.CMAttachments'
                        }
                    },
                    data: {
                        systemId: systemId,
                        requestId: requestId
                    }
                }
            }]
        }).show();
    },

    formatDate: function(date) {
        var formattedDate = new Date(date);

        return formattedDate.getFullYear().toString() +
            '-' + (formattedDate.getMonth() + 1).toString() + '-' + formattedDate.getDate().toString();
    }
});