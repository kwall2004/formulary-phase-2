/*
 * Last Developer: Srujith Cheruku
 * Date: 10-10-2016
 * Previous Developers: []
 * Origin: RxPrescriber - Claims Search Prescriber controller
 * Description: Gives users a place to view their claims
 */
Ext.define('Atlas.portals.prescriber.controller.ClaimsSearchPrescriberController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsClaimsSearchPrescriberController',

    loadStatuses: function () {
        var combo = this.lookupReference('claimsStatusCombo'),
            statuses = [['All', 'All'], ['Paid', 'P'], ['Rejected', 'R']],
            statusesStore = {};

        statusesStore = new Ext.data.ArrayStore({
            fields: ['text', 'value'],
            data: statuses
        });

        combo.setStore(statusesStore);
        combo.setValue('All');
    },

    onSearchClick: function () {

        var status = this.lookupReference('claimsStatusCombo').getValue(),
            member = this.lookupReference('claimsMemberCombo').getValue(),
            dateFrom = this.lookupReference('dateFrom').getValue(),
            dateTo = this.lookupReference('dateTo').getValue(),
            claimsHistoryStore = this.getViewModel().getStore('claimsHistory'),
            claimsMasterCountStore = this.getViewModel().getStore('claimsMasterCount'),
            user = Ext.first('viewport').getViewModel().get('user'),
            whereClause = '',
            requiredInfo = false,
            status = status === 'All' ? '' : status;

        if (dateFrom != null && dateFrom != "") {
            whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.serviceDate >= ' + this.formatDate(dateFrom));
            if (dateTo != null && dateTo != "") {
                whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.serviceDate <= ' + this.formatDate(dateTo));
                requiredInfo = true;
            }
        }

        if (member != null && member != "") {
            whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.recipientId = \'' + member + '\'');
            requiredInfo = true;
        }
        if (status != null && status != "" && status != 'All') {
            if (status) {
                whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.respStatus = \'' + status + '\'');
            }
        }
        if (!requiredInfo) {
            Ext.Msg.alert('Warning', 'Please enter valid Service Date From & To or MemberId.');
        }

        claimsHistoryStore.removeAll();
        claimsMasterCountStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        claimsMasterCountStore.getProxy().setExtraParam('pKeyValue', user.un);
        claimsMasterCountStore.getProxy().setExtraParam('pKeyType', 'Prescriber');
        claimsMasterCountStore.getProxy().setExtraParam('pWhere', whereClause);
        claimsMasterCountStore.load({
            scope: this,
            failure: function (record, operation) {
                Ext.Msg.alert('Failure', 'record count error, Please contact admin.');

            },
            success: function (record, operation) {

            },
            callback: function (records, operation, success) {
                if (records != null && records.length > 0) {
                    //   var totalRecordCount = records[0].metaData.pCount;
                    var totalRecordCount = this.getViewModel().get('claimsMasterCount').getProxy().reader.metaData.pCount;
                    if (totalRecordCount > 500) {
                        Ext.Msg.confirm("Warning", "Search returns total " + totalRecordCount + " records. Bringing back all results might cause your browser to run slowly. Click Yes to see 25 records. Click No to refine your search  ?", function (e) {
                            if (e == 'yes') {
                                claimsHistoryStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
                                claimsHistoryStore.getProxy().setExtraParam('pKeyValue', user.un);
                                claimsHistoryStore.getProxy().setExtraParam('pKeyType', 'Prescriber');
                                claimsHistoryStore.getProxy().setExtraParam('pWhere', whereClause);
                                claimsHistoryStore.load();
                            }
                        });
                    } else {
                        claimsHistoryStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
                        claimsHistoryStore.getProxy().setExtraParam('pKeyValue', user.un);
                        claimsHistoryStore.getProxy().setExtraParam('pKeyType', 'Prescriber');
                        claimsHistoryStore.getProxy().setExtraParam('pWhere', whereClause);
                        claimsHistoryStore.load();
                    }
                }
            }
        });
    },

    buildWhereClause: function (fullString, extra) {
        return fullString = fullString.length > 0 ? fullString + ' AND ' + extra : extra;
    },

    formatDate: function (date) {
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    },

    onDrugSearchClick: function (component, eOpts) {
        var brandName = component.getWidgetRecord().data.brandname;
        var medication = component.getWidgetRecord().data.medication;
        var planGroupId = component.getWidgetRecord().data.planGroupId;
        var planGroupName = component.getWidgetRecord().data.planGroupName;
        this.fireEvent('openView', 'rxprescriber', 'portals', 'prescriber_FormularyDrugSearch', {
            brand: brandName,
            medication: medication,
            planGroupId: planGroupId,
            planGroupName: planGroupName,
            atlasId: brandName
        })
    },

   /* onCreatePAClick: function (component, eOpts) {
        var claimId = component.getWidgetRecord().data.claimID;

        this.fireEvent('openView','rxprescriber','portals','prescriber_CreatePriorAuth', {
            keyType: 'ClaimId',
            keyValue: claimId,
            atlasId: claimId
        });
    },*/

    onCreatePAClick: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);
        var claimId = record.get('claimID');
        this.fireEvent('openView','rxprescriber','portals','prescriber_CreatePriorAuth', {
            keyType: 'ClaimId',
            keyValue: claimId,
            atlasId: claimId
        });
    },

    beforeCreatePAShow: function (componenet, eOpts) {
        var claimStatus = component.getWidgetRecord().data.stat;
        if (claimStatus != 'Rejected') {
            component.setHidden(true);
        }
    },
    
    hedisAction: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex),
            id = record.get('recipientID') ? record.get('recipientID') : record.get('recipientid');

        Ext.create('Ext.window.Window', {
            title: 'HEDIS Details (' + record.get('memFullName') + ')',
            modal: true,
            items: {
                xtype: 'portalsprescriberhedisalertwindow',
                viewModel: {
                    stores: {
                        hedisAlerts: {
                            model: 'Atlas.member.model.MemberHedisSummary'
                        }
                    },

                    data: {
                        id: id
                    }
                }
            }
        }).show();
    },

    onExcelClick: function () {
        this.getView().items.map["claimSearchPrescriberGrid"].saveDocumentAs({
            type: 'xlsx',
            title: 'Prescriber Claim Search',
            fileName: 'PrescriberClaimSearch.xlsx'
        });

    }
});