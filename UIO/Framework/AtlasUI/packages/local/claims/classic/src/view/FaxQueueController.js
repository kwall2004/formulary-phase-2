/**
 * Created by T4317 on 1/23/2017.
 */
Ext.define('Atlas.claims.view.FaxQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FaxQueueController',
    PAFaxQDistributionList: [],

    boxReady: function (view, width, height) {
        var view = this.getView(),
            vm = this.getViewModel();

        view.down('#CDAGFAXQueueList').setValue('1');
        this.onSearch();
    },

    faxQueueUpdate: function (selection) {
        var view = this.getView();

        if (selection.value == '1'){
            view.down('#StartDate').setValue('');
            view.down('#StartDate').setDisabled(true);
            view.down('#EndDate').setValue('');
            view.down('#EndDate').setDisabled(true);
        }
        else if (selection.value == '2') {
            view.down('#StartDate').setValue('');
            view.down('#StartDate').setDisabled(false);
            view.down('#EndDate').setValue('');
            view.down('#EndDate').setDisabled(false);
        }
    },

    onSearch: function () {

        var view = this.getView(),
            vm = this.getViewModel(),
            FaxType = view.down('#CDAGFAXQueueList').getValue(),
            FaxQueueName = '',
            Acknowledged = ((FaxType == '2' || FaxType == '4' || FaxType == '11' || FaxType == '12') ? 'Y' : ''),
            StartDate = view.down('#StartDate').getRawValue(),
            EndDate = view.down('#EndDate').getRawValue(),
            faxQueueDocuments = vm.getStore('faxQueueDocuments');

        var LastFaxSearchCriteria = [];

        LastFaxSearchCriteria.push({
            'FaxType': (FaxType == null ? '' : FaxType),
            'StartDate': (StartDate == null ? '' : StartDate),
            'EndDate': (EndDate == null ? '' : EndDate)
        });

        vm.set('LastFaxSearchCriteria', LastFaxSearchCriteria);

        if (Acknowledged == 'Y' && (StartDate == '' || EndDate == '')) {
            Ext.Msg.alert('PBM', 'Date range is mandatory for acknowledged faxes.');
            return;
        }

        switch (FaxType) {

            case '1':
                FaxQueueName = 'New Faxes';
                break;
            case '2':
                FaxQueueName = 'Acknowledged Faxes';
                break;
        }

        faxQueueDocuments.getProxy().setExtraParam('pPlanID', 'HPM');
        faxQueueDocuments.getProxy().setExtraParam('pQDescription', 'UCF');
        faxQueueDocuments.getProxy().setExtraParam('pRecieptDateFrom', StartDate);
        faxQueueDocuments.getProxy().setExtraParam('pRecieptDateTo', EndDate);
        faxQueueDocuments.getProxy().setExtraParam('pAcknowledged', Acknowledged);
        faxQueueDocuments.load( {
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });
    },

    onReset: function () {
        var view = this.getView(),
            faxTypeSelection = view.down('#CDAGFAXQueueList').getSelection().data;

        this.faxQueueUpdate(faxTypeSelection);
    },

    onInitiatePA: function (btn) {

        var view = this.getView(),
            selectedRecord = btn.up().getWidgetRecord(),
            determinationType = ((view.down('#CDAGFAXQueueList').getValue() == '10' || view.down('#CDAGFAXQueueList').getValue() == '12') ? 'DMR' : 'CD'),
            docID = selectedRecord.data.DocumentID,
            systemID = selectedRecord.data.SystemID;

        this.CheckStatus(docID, systemID, determinationType);
    },

    CheckStatus: function (docID, systemID, determinationType) {

        var me = this,
            vm = this.getViewModel(),
            QManagementData = vm.getStore('QManagementData');

        QManagementData.getProxy().setExtraParam('pSystemID', systemID);
        QManagementData.getProxy().setExtraParam('pFieldList', 'AcknowledgedUserName');
        QManagementData.load(
            {
                callback: function (record, operation, success) {
                    if (success) {

                        var ackUser = Ext.decode(operation.getResponse().responseText).data[0].AcknowledgedUserName;

                        if (ackUser != ''){
                            Ext.Msg.confirm('Create PA', 'This fax has already been processed by ' + ackUser + '. Are you sure you would like to create another PA?', function (btn) {
                                if (btn == 'yes') {
                                    me.initiatePA(docID, 'Y', determinationType, 'Fax');
                                }
                            });
                        }
                        else {
                            me.initiatePA(docID, '', determinationType, 'Fax');
                        }
                    }
                }
            }
        );
    },

    initiatePA: function (docID, ack, determinationType, intakeMethod) {
        var me = this;

        var CoverageDeterminationModel = Ext.create('Atlas.authorization.model.cdag.SetCoverageDeterminationModel');

        var root = {
            CoverageDeterminationBean: {
                DocumentId: docID,
                DeterminationType: determinationType,
                InTake: intakeMethod
            }
        };

        var initiatePAData = root.CoverageDeterminationBean;

        CoverageDeterminationModel.getProxy().setExtraParam('piAuthID', '0');
        CoverageDeterminationModel.getProxy().setExtraParam('pcSource', 'InitiateCD');
        CoverageDeterminationModel.getProxy().setExtraParam('plSkipWarning', false);
        CoverageDeterminationModel.getProxy().setExtraParam('ttPriorAuthData', initiatePAData);
        CoverageDeterminationModel.phantom = false;

        CoverageDeterminationModel.save(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        var newAuthId = objResp.metadata.piRetAuthID;
                        me.fireEvent('parentEventGetNewPA', newAuthId);
                    }
                    else {
                        Ext.Msg.alert('PBM', objResp.message[0].message);
                    }
                }
            }
        );

    },

    onAcknowledge: function (btn) {

        var selectedRecord = btn.up().getWidgetRecord(),
            pFieldList = 'Acknowledge,AcknowledgedDate,AcknowledgedUserName',
            pFields = 'Y|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + '|' + Atlas.user.un;

        this.setQManagementData(selectedRecord.data.SystemID, pFieldList, pFields);
    },

    onForward: function (btn) {

        var view = this.getView(),
            selectedRecord = btn.up().getWidgetRecord(),
            systemID = selectedRecord.data.SystemID,
            FaxQueue = view.down('#CDAGFAXQueueList').getValue();

        if (FaxQueue == '8'){
            this.forwardFax(systemID, 'APPEAL');
        }
        else {
            this.winForwardFaxShow(FaxQueue, systemID);
        }

    },

    winForwardFaxShow: function (faxQueueID, systemID) {

        var me = this,
            vm = this.getViewModel(),
            defaultValue = '2',
            winTitle = 'Forward',
            ForwardFaxList = vm.getStore('ForwardFaxList'),
            win;

        ForwardFaxList.removeAll();
        ForwardFaxList.add(
            {
                value: '1',
                text: 'New Faxes'
            },
            {
                value: '2',
                text: 'Authorization Fax'
            }
        );

        switch (faxQueueID)
        {
            case '7':
                winTitle = 'Forward WebPA';
                break;
            case '9':
                winTitle = 'Forward Appeal Fax';
                ForwardFaxList.add(
                    {
                        value: '11',
                        text: 'DMR New Faxes'
                    }
                );
                break;
            case '10':
                winTitle = 'Forward DMR Fax';
                ForwardFaxList.add(
                    {
                        value: '9',
                        text: 'Redetermination New Faxes'
                    }
                );
                break;
            default:
                defaultValue = '3';
                ForwardFaxList.removeAll();
                ForwardFaxList.add(
                    {
                        value: '8',
                        text: 'Discharge New Faxes'
                    },
                    {
                        value: '3',
                        text: 'Redetermination New Faxes'
                    }
                );
        }

        win = Ext.create('Ext.window.Window', {
            title: winTitle,
            itemId: 'winForwardPA',
            height: 120,
            width: 400,
            modal: true,
            layout: 'vbox',
            viewModel: {
                parent: vm
            },
            items: [
                {
                    xtype: 'combo',
                    itemId: 'cbForwardFaxList',
                    bind: {
                        store: '{ForwardFaxList}'
                    },
                    name: 'CDAGFAXQueueList',
                    width: 380,
                    labelWidth: 80,
                    forceSelection: true,
                    fieldLabel: 'Forward To',
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    value: defaultValue
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'btnWinPAForward',
                            text: 'Forward',
                            iconCls: 'fa fa-forward',
                            handler: 'onWinPAForward',
                            value: systemID,
                            scope: me
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnWinPACancel',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-times',
                            handler: 'onWinPACancel',
                            scope: me
                        }
                    ]
                }
            ]
        });

        win.setTitle(winTitle);
        me.getView().add(win);
        win.show();

    },

    onWinPAForward: function (btn) {
        var winForwardPA = this.getView().down('#winForwardPA'),
            systemID = btn.value,
            forwardTo = winForwardPA.down('#cbForwardFaxList').getDisplayValue();

        this.forwardFax(systemID, forwardTo);
        this.onWinPACancel();
    },

    onWinPACancel: function () {
        var winForwardPA = this.getView().down('#winForwardPA');

        winForwardPA.destroy();
    },

    forwardFax: function (systemID, forwardTo) {
        var pFieldList = '',
            pFields = '';

        if (forwardTo.toUpperCase() == 'APPEAL' || forwardTo == '9') {
            pFieldList = 'QueID';
            pFields = '5';

            this.setQManagementData(systemID, pFieldList, pFields);
        }
        else {
            pFieldList = 'QueID';

            for (var item in this.PAFaxQDistributionList){

                if (forwardTo == this.PAFaxQDistributionList[item].ListItem){
                    pFields = this.PAFaxQDistributionList[item].ListDesc.split(',')[0];
                    break;
                }
            }

            if (pFields != '') {
                this.setQManagementData(systemID, pFieldList, pFields);
            }
        }
    },

    setQManagementData: function (systemID, fieldList, fieldValue) {

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [true], {
                pSystemID: systemID,
                pFieldList: fieldList,
                pFields: fieldValue
            },
            saveAction, null);

        this.onSearch();

    },

    onViewDoc: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            DocumentID = rec.get('DocumentID');

        if (DocumentID != '') {
            Atlas.common.utility.Utilities.viewDocument(DocumentID);
        }
    }

});