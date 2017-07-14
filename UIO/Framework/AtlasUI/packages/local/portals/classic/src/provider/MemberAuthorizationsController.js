Ext.define('Atlas.portals.provider.MemberAuthorizationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MemberAuthorizationsController',


    listen: {
        controller: {
            '*': {
                memberDetailsSet: 'loadMemberAuthorizationsData'
            }
        }
    },



    loadStatus: function (apidata) {

    },


    loadMemberAuthorizationsData: function (memberdetails) {
        this.lookupReference('memberRep').setValue(memberdetails.recipientID);
        this.lookupReference('lobRep').setValue(memberdetails.primaryLOB);
        this.lookupReference('pcpRep').setValue(memberdetails.PCP);
        this.getView().getViewModel().set('benefitPlanCode', memberdetails.benefitPlanCode);
        this.runProcess(memberdetails.recipientID.toString());
        this.onSubmitClick();
    },

    runProcess: function (recipientID) {
        var me = this,
            view = this.getViewModel(),
            FStore = view.getStore('MemberAuthStore');


        //get Status api data
        FStore.getProxy().setExtraParam('pListName','AuthStatus');
        FStore.load({
            callback: function(record, operation) {
                var apidata = Ext.JSON.decode(operation._response.responseText).metadata.pListItems;

                var tempArray = [],
                    splitValues = [];
                splitValues = apidata.split("^");

                tempArray.push({
                    key: "ALL",
                    value: "ALL"
                });
                for (var i = 0; i < splitValues.length; i+=2)
                {
                    tempArray.push({
                        key: splitValues[i],
                        value: splitValues[i]
                    });
                }


                var tempStore = new Ext.data.ArrayStore({});
                tempStore.add(tempArray);
                me.lookupReference('StatusRef').setStore(tempStore);
                ////////////////////////////////////////////////////////////////////////////////////////////////////

                //get Type api data
                var GStore = view.getStore('MemberAuthStore');
                GStore.getProxy().setExtraParam('pListName','AuthReportGroups');
                GStore.load({
                    callback: function(record, operation) {
                        var apidata = Ext.JSON.decode(operation._response.responseText).metadata.pListItems;
                        var tempArray = [],
                            splitValues = [];
                        splitValues = apidata.split("^");

                        tempArray.push({
                            key: "ALL",
                            value: "ALL"
                        });
                        for (var i = 0; i < splitValues.length; i+=2)
                        {
                            tempArray.push({
                                key: splitValues[i],
                                value: splitValues[i]
                            });
                        }


                        var tempStore = new Ext.data.ArrayStore({});
                        tempStore.add(tempArray);
                        me.lookupReference('TypeRef').setStore(tempStore);

                    }
                });
                ////////////////////////////////////////////////////////////////////////////////////////////////////
            }
        });


//get PROVIDER api data
        var GStore = view.getStore('MemberAuthProviderStore');
        GStore.getProxy().setExtraParam('pRecipientID',recipientID);
        GStore.load({
            callback: function(record, operation) {
                var apidata = Ext.JSON.decode(operation._response.responseText).data;
                var tempArray = [];

                tempArray.push({
                    key: "ALL",
                    value: "ALL"
                });
                for (var i = 0; i < apidata.length; i++)
                {
                    if (apidata[i].providerType == "P")
                    tempArray.push({
                        key: apidata[i].provID + " - " + apidata[i].provName,
                        value: apidata[i].provID + " - " + apidata[i].provName
                    });
                }

                var tempStore = new Ext.data.ArrayStore({});
                tempStore.add(tempArray);
                me.lookupReference('ProviderRef').setStore(tempStore);

            }
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////



        var FacilityStore = view.getStore('MemberAuthFacilityStore');
        FacilityStore.getProxy().setExtraParam('pRecipientID',recipientID);
        FacilityStore.load({
            callback: function(record, operation) {
                var apidata = Ext.JSON.decode(operation._response.responseText).data;
                var tempArray = [];

                tempArray.push({
                    key: "ALL",
                    value: "ALL"
                });
                for (var i = 0; i < apidata.length; i++)
                {
                    if (apidata[i].providerType == "F")
                        tempArray.push({
                            key: apidata[i].provID + " - " + apidata[i].provName,
                            value: apidata[i].provID + " - " + apidata[i].provName
                        });
                }

                var tempStore = new Ext.data.ArrayStore({});
                tempStore.add(tempArray);
                me.lookupReference('FacilityRef').setStore(tempStore);

            }
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////
    },

    checkFilters: function(store) {
        var repID = this.lookupReference('memberRep').getValue(),
            form = this.lookupReference('filtersForm'),
            filters = form.getValues(),
            filter = '';

        if (!repID) {
            Ext.Msg.alert('Error', 'Invalid Member ID entered');
            return;
        }

        store.clearFilter();
        if (filters.Type) {
            filters.Type = filters.Type.toLowerCase() === 'all' ? '' : filters.Type;
        }
        if (filters.Status) {
            filters.Status = filters.Status.toLowerCase() === 'all' ? '' : filters.Status;
        }
        if (filters.Provider) {
            filters.Provider = filters.Provider.toLowerCase() === 'all' ? '' : filters.Provider;
        }
        if (filters.Status) {
            filters.Facility = filters.Facility.toLowerCase() === 'all' ? '' : filters.Facility;
        }

        store.filter([
            { property: 'levelOfServiceDesc', value: filters.Type ? filters.Type : '' },
            { property: 'requestStatus', value: filters.Status ? filters.Status : '' },
            { property: 'servicingProvider', value: filters.Provider ? filters.Provider : '' },
            { property: 'servicingFacility', value: filters.Facility ? filters.Facility : '' }
        ]);

        if (filters.dateFrom) {
            store.filterBy(function(record) {
                var date = new Date(record.get('startDate')).getTime(),
                    filterDate = new Date(filters.dateFrom).getTime();

                return date >= filterDate;
            });
        }
    },

    onSubmitClick: function () {
        this.lookupReference('errorMessageRef').setHidden(true);
        var repID = this.lookupReference('memberRep').getValue();
        var PCP = this.lookupReference('pcpRep').getValue();
        var user = Ext.first('viewport').getViewModel().get('user'),
            authMasterStore = this.getView().getViewModel().getStore('MemberAuthSearchStore'),
            me = this.getView().getViewModel(),
            that = this;
        var vResultWhereStmt = "( recipientID =\\\"" + repID + "\\\" )";
        var IOparamData = '{"ttParameters": [  ' +
            '{     "parameterName": "pSessionID",     "parameterValue": "' + user.sessionId + '"   },   ' +
            '{     "parameterName": "pActionType",     "parameterValue": "get"   },   ' +
            '{     "parameterName": "pScreenName",     "parameterValue": "portalSearch"   },   ' +
            '{     "parameterName": "pUserName",     "parameterValue": "'+Atlas.user.un+'"   },   ' +
            '{     "parameterName": "pRowid",     "parameterValue": null   },   ' +
            '{     "parameterName": "pRowNum",     "parameterValue": "0"   },   ' +
            '{     "parameterName": "pRows",     "parameterValue": "999"   },   ' +
            '{     "parameterName": "pWhere",     "parameterValue": "' + vResultWhereStmt + '"   },   ' +
            '{     "parameterName": "pResultWhereStmt",     "parameterValue": "\'\'"   },   ' +
            '{     "parameterName": "pSort",     "parameterValue": "startDate DESC"   },   ' +
            '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },   ' +
            '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },   ' +
            '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttmemberODCDMaster' + '\\": [\\n]}\\n"   } ' +
            ']}';

        this.lookupReference('memAuthGrid').getStore().removeAll();
        authMasterStore.getProxy().setExtraParam('pParamsIO', IOparamData);
        authMasterStore.getProxy().setExtraParam('pSort', 'AuthFromDate DESC');
        authMasterStore.load({
            callback: function(records) {
                if (!records) { return; }
                if (records.length === 0) {
                    that.lookupReference('errorMessageRef').setHidden(false);
                    that.lookupReference('errorMessageRef').setValue('<font color="red">No Record(s) Found for Authorizations.</font>');
                } else {
                    var apidata = records["0"].data.ttmemberODCDMaster;

                    var tempArray = [],
                        memauthArray = [];
                    for (var i = 0; i < apidata.length; i++) {
                        var tempArray = [];
                        tempArray.push(apidata[i].PlaceOfserviceDesc);
                        tempArray.push(apidata[i].RequestingProviderID);
                        tempArray.push(apidata[i].ServicingFacilityID);
                        tempArray.push(apidata[i].ServicingProviderID);
                        tempArray.push(apidata[i].benefitPlanCode);
                        tempArray.push(apidata[i].endDate);
                        tempArray.push(apidata[i].levelOfService);
                        tempArray.push(apidata[i].levelOfServiceDesc);
                        tempArray.push(apidata[i].memberID);
                        tempArray.push(apidata[i].memberName);
                        tempArray.push(apidata[i].placeOfServiceCode);
                        tempArray.push(apidata[i].procedureCategoryDesc);
                        tempArray.push(apidata[i].procedureCategoryID);
                        tempArray.push(apidata[i].recipientID);
                        tempArray.push(apidata[i].requestID);
                        tempArray.push(apidata[i].requestStatus);
                        tempArray.push(apidata[i].servicingFacility);
                        tempArray.push(apidata[i].servicingFacilityName);
                        tempArray.push(apidata[i].servicingProvider);
                        tempArray.push(apidata[i].servicingProviderName);
                        tempArray.push(apidata[i].startDate);
                        tempArray.push(apidata[i].dbRowID);
                        tempArray.push(PCP)
                        memauthArray.push(tempArray);
                    }

                    var tempStore = new Ext.data.ArrayStore({
                        fields: ['PlaceOfServiceDesc', 'RequestingProviderID', 'ServicingFacilityID', 'ServicingProviderID', 'benefitPlanCode', 'endDate',
                            'levelOfService', 'levelOfServiceDesc', 'memberID', 'memberName', 'placeOfServiceCode', 'procedureCategoryDesc',
                            'procedureCategoryID', 'recipientID', 'requestID', 'requestStatus', 'servicingFacility', 'servicingFacilityName',
                            'servicingProvider', 'servicingProviderName', 'startDate', 'dbRowID', 'PCP'],
                        data:  memauthArray,
                        pageSize: 15,
                        proxy: {
                            type: 'memory',
                            enablePaging: true
                        }
                    });

                    me.set('MemberAuthSearchStore', tempStore);
                    that.checkFilters(me.get('MemberAuthSearchStore'));
                }
            }
        });
    },

    onAuthAfterClick: function (record) {
        this.lookupReference('errorMessageRef').setHidden(true);
            this.fireEvent('openView', 'hpprovider', 'portals', 'provider_AuthorizationInquiry', {
        });
    },

    onAccumClick: function () {
        this.lookupReference('errorMessageRef').setHidden(true);
        var repID = this.lookupReference('memberRep').getValue();
        var me = this;
        if (!repID) {
            this.lookupReference('errorMessageRef').setHidden(false);
            this.lookupReference('errorMessageRef').setValue('<font color="red">Member ID is required</font>');
            return;
        }
        var visitsWindow = Ext.create('Ext.window.Window', {
            reference: 'viewVisitCountWindow',
            width: 800,
            title: 'Member Visit Counts',
            layout: 'fit',
            modal: true,
            viewModel: {
                data: {
                    recipientId: repID,
                    benefitPlanCode: me.getView().getViewModel().get('benefitPlanCode'),
                    displayDate: true
                }
            },
            session: {
                schema: 'atlas'
            },
            items: [{
                xtype: 'portalsProviderVisitCount'
            }]
        }).show();
    },

    onPrintAuthClick: function () {
        var gridStore = this.lookup('memAuthGrid');
        var selected = gridStore.getSelection()[0];
        var printModel = Ext.create('Atlas.portals.provider.model.PortalAuthPrint', {});

        if (!selected) {
            Ext.MessageBox.alert('Print Auth Error', 'Please select a record from the rows below');
        } else {
            var reqID = selected.data.requestID;
            this.lookupReference('errorMessageRef').setHidden(true);
            var repID = this.lookupReference('memberRep').getValue();
            if (!repID) {
                this.lookupReference('errorMessageRef').setHidden(false);
                this.lookupReference('errorMessageRef').setValue('<font color="red">Member ID is required</font>');
            } else {
                printModel.getProxy().setExtraParam('pRequestId', reqID);
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
            }
        }
    },

    onPrintReportClick: function () {
        this.lookupReference('errorMessageRef').setHidden(true);
        var repID =  this.lookupReference('memberRep').value;
        if (!repID) {
            this.lookupReference('errorMessageRef').setHidden(false);
            this.lookupReference('errorMessageRef').setValue('<font color="red">Member ID is required</font>');
        }
        else
        this.getReferences().memAuthGrid.saveDocumentAs({
            type: 'xlsx',
            title:      'Member Authorizations',
            fileName:   'MemberAuthReport_excelExport.xlsx'
        });
    }
});