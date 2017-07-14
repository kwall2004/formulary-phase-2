Ext.define('Atlas.portals.prescriber.controller.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsPrescriberMainController',

    listen: {
        controller: {
            '*': {
                userSet: 'onAuthValid'
            }
        }
    },

    onAuthValid: function() {
        this.loadStatuses();
        this.loadAuthStatuses();
        this.loadHedisAlerts();
        this.loadPrescriberLetters();
        this.refreshPriorAuth();
        this.refreshPrescriberClaimHistory();
    },

    loadStatuses: function() {
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

    loadAuthStatuses: function() {
        var priorAuthListStore = this.getViewModel().getStore('priorAuthList'),
            user = Ext.first('viewport').getViewModel().get('user'),
            listModel = Ext.create('Atlas.portals.model.SearchPriorAuth', {
                ListDescription: 'All',
                charString: ''
            });

        priorAuthListStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        priorAuthListStore.getProxy().setExtraParam('pListName', 'PriorAuthStatusPortal');
        priorAuthListStore.load({
            callback: function() {
                this.insert(0, listModel);
            }
        });

    },

    loadHedisAlerts: function() {
        var hedisAlertsStore = this.getViewModel().getStore('hedisAlerts'),
            user = Ext.first('viewport').getViewModel().get('user');

        hedisAlertsStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        hedisAlertsStore.getProxy().setExtraParam('pKeyValue', user.un);
        hedisAlertsStore.load();
    },

    loadPrescriberLetters: function() {
        var prescriberLettersStore = this.getViewModel().getStore('prescriberLetters'),
            user = Ext.first('viewport').getViewModel().get('user');

        prescriberLettersStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        prescriberLettersStore.getProxy().setExtraParam('pNPI', user.retNPI);
        prescriberLettersStore.load();
    },

    refreshPrescriberClaimHistory: function() {
        var status = this.lookupReference('claimsStatusCombo').getValue(),
            member = this.lookupReference('claimsMemberCombo').getValue(),
            claimsHistoryStore = this.getViewModel().getStore('claimsHistory'),
            user = Ext.first('viewport').getViewModel().get('user'),
            whereClause = '',
            serviceDate = new Date();

        status = status === 'All' ? '' : status;
        serviceDate.setDate(serviceDate.getDate() - 30);

        whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.serviceDate >= \'' + this.formatDate(serviceDate)) + '\'';
        whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.serviceDate <= \'' + this.formatDate(new Date())) + '\'';
        if (member) { whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.recipientId = \'' + member + '\''); }
        if (status) { whereClause = this.buildWhereClause(whereClause, 'ClaimMaster.respStatus = \'' + status + '\''); }

        claimsHistoryStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        claimsHistoryStore.getProxy().setExtraParam('pKeyValue', user.un);
        claimsHistoryStore.getProxy().setExtraParam('pKeyType', 'Prescriber');
        claimsHistoryStore.getProxy().setExtraParam('pWhere', whereClause);
        claimsHistoryStore.load();
    },

    refreshDrugSearch: function() {
        var me = this,
            bn = this.lookupReference('drugSearch').getValue(),
            planGroup = this.lookupReference('plan').getValue(),
            drugSearchResults = this.getViewModel().getStore('formularyDrugSearchResults'),
            user = Ext.first('viewport').getViewModel().get('user');

        if (!bn || !planGroup) { return; }
        drugSearchResults.getProxy().setExtraParam('pSessionID', user.retSessionID);
        drugSearchResults.getProxy().setExtraParam('pBN', bn);
        drugSearchResults.getProxy().setExtraParam('pCovered', false);
        drugSearchResults.getProxy().setExtraParam('pPA', false);
        drugSearchResults.getProxy().setExtraParam('pOTC', "0");
        drugSearchResults.getProxy().setExtraParam('pPlanGroupID', planGroup);
        drugSearchResults.getProxy().setExtraParam('pGeneric', "");
        drugSearchResults.getProxy().setExtraParam('pPreferred', false);
        drugSearchResults.getProxy().setExtraParam('pFormularyTier', "");
        drugSearchResults.load();
    },

    refreshPriorAuth: function() {
        var me = this,
            status = this.lookupReference('authStatus').getValue(),
            user = Ext.first('viewport').getViewModel().get('user'),
            priorAuthHistoryStore = this.getViewModel().getStore('priorAuthHistory'),
            whereClause = '',
            serviceDate = new Date();

        serviceDate.setDate(serviceDate.getDate() - 30);
        whereClause = this.buildWhereClause(whereClause, 'am1.createDateTime >= \'' + this.formatDate(serviceDate)) + '\'';
        whereClause = this.buildWhereClause(whereClause, 'am1.createDateTime <= \'' + this.formatDate(new Date())) + '\'';
        if (status) {
            whereClause = this.buildWhereClause(whereClause, '(LOOKUP(authStatus,\'' + status + '\') > 0)');
        }

        priorAuthHistoryStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        priorAuthHistoryStore.getProxy().setExtraParam('pKeyValue', user.un);
        priorAuthHistoryStore.getProxy().setExtraParam('pcWhere', whereClause);
        priorAuthHistoryStore.load();
    },

    buildWhereClause: function(fullString, extra) {
        return fullString = fullString.length > 0 ? fullString + ' AND ' + extra : extra;
    },

    formatDate: function(date) {
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    },

    hedisAction: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex),
            id = record.get('recipientID') ? record.get('recipientID') : record.get('recipientid'),
            name = record.get('memFullName') ? record.get('memFullName') : record.get('memberName');

        Ext.create('Ext.window.Window', {
            title: 'HEDIS Details (' + name + ')',
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

    createPA: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        if (record.get('recipientID') && record.get('memberID') && record.get('carrierID') && record.get('npi')
            && record.get('gcnseq') && record.get('ncpdpid')) {
            this.fireEvent('openView','rxprescriber','portals','prescriber_CreatePriorAuth', {
                keyType: 'ClaimId',
                keyValue: record.get('claimID'),
                atlasId: record.get('claimID')
            });
            return;
        }

        Ext.Msg.alert(
            'Auto Generate Prior Authorization - Error',
            'Request failed. MeridianRx ID, MemberID, Carrier ID, Prescriber NPI, Provider NCPDP and GCN SEQ # are minimum required data to auto generate a PA.'
        );
    },

    exportClaimsToExcel: function() {
        var grid = this.lookupReference('claimsGrid');

        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Claims History',
            fileName: 'ClaimsHistory.xlsx'
        });
    },

    exportToExcel: function() {
        var grid = this.lookupReference('paGrid');

        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Prior Authorizations',
            fileName: 'PriorAuthorizations.xlsx'
        });
    },

    showContact: function(grid, rowIndex) {
        var planId = grid.getStore().getAt(rowIndex).get('PlanGroupID');

        Ext.create('Ext.window.Window', {
            title: 'Contact Details',
            closable: true,
            modal: true,
            height: 170,
            width: 350,
            items: {
                xtype: 'portalprescribercontactdetailswindow',

                viewModel: {
                    data: {
                        id: planId
                    }
                }
            }
        }).show();
    },

    getDocument: function(grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex).get('DocumentID'),
            user = Ext.first('viewport').getViewModel().get('user'),
            documentModel = Ext.create('Atlas.common.model.shared.Document', {});

        documentModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        documentModel.getProxy().setExtraParam('pDocumentID', rec);
        documentModel.load({
            callback: function(document) {
                var data = this.getProxy().getReader().metaData.pData,
                    type = this.getProxy().getReader().metaData.pDocumentType;

                if (data) {
                    Atlas.common.utility.Utilities.displayDocument(type, data);
                    return;
                }

                Ext.MessageBox.alert('Error', 'Document data not found.', function(){});
            }
        });
    },

    goToPriorAuthPage: function() {
        this.fireEvent('openView','rxprescriber','portals','prescriber_SearchPriorAuth', null);
    },

    goToClaims: function() {
        this.fireEvent('openView','rxprescriber','portals','prescriber_ClaimsSearchPrescriber', null);
    },

    goToDrugSearch: function() {
        this.fireEvent('openView', 'rxprescriber', 'portals', 'prescriber_FormularyDrugSearch', {
            brand: this.lookupReference('drugSearch').value,
            planGroupId: this.lookupReference('plan').value,
            planGroupName: this.lookupReference('plan').rawValue,
            atlasId: this.lookupReference('drugSearch').value
        })
    }
});