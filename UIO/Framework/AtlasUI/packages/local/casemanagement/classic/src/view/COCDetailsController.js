/**
 * Created by mkorivi on 11/9/2016.
 */

Ext.define('Atlas.casemanagement.view.COCDetailsController', {
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.cocdetailscontroller',

    init: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        if (view.menuId != null) {
            var menuStore = vm.getStore('menu'),
                proxy = menuStore.getProxy();

            proxy.setExtraParam('pRootMenu', view.menuId);
            proxy.setExtraParam('pLevels', 1);

            menuStore.on({
                load: 'onMenuLoad',
                scope: me,
                single: true // Remove listener after Load
            });

            menuStore.load();
        }
    },
    onMenuLoad: function (store, records, success) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            menu = view.lookup('menu'),
            items = [],
            i = 0,
            iLen = records.length,
            defaultMenu = -1,
            route;


        for (; i < iLen; i++) {
            items.push({
                text: records[i].get('menuTitle'),
                route: records[i].get('route')
            });

            if (records[i].get('defaultMenu')) {
                defaultMenu = i;
            }
        }

        menu.getMenu().add(items);

        if (defaultMenu > -1) {
            route = items[defaultMenu].route;
            view.add({
                xclass: Atlas.common.Util.classFromRoute(route),
                title: items[defaultMenu].text,
                route: route,
                closable: false
            });
            view.setActiveTab(0);
        }
        if (vm.get('viewready')) {
            view.unmask();
        }

        vm.set('initialized', true);

    },
    boxReady: function (view, width, height) {
        //Starting with mask and defer any user interations until component is fully loaded, e.g. menus
        var vm = view.lookupViewModel();

        if (!vm.get('initialized')) {
            view.mask('Loading...');
        }

        vm.set('viewready', true);
    },
    btAdvancedSearchClick: function () {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            win;
        if (!me.getView().down('#COCAdvanceSearch')) {
            win = Ext.create('Ext.window.Window', {
                title: 'Advanced Search',
                iconCls: 'x-fa fa-search',
                // closeAction: 'hide', // Keep window around and don't destroy
                width: 900,
                height: 550,
                modal: true,
                layout: 'border',
                scrollable: true,
                closeAction: 'hide',
                viewModel: {
                    parent: me.getViewModel()
                },
                itemId: 'COCAdvanceSearch',
                xtype: 'COCAdvanceSearch',
                items: [
                    {
                        region: 'north',
                        xtype: 'form',
                        itemId: 'formCOCAdvanceSearch',
                        layout: 'column',
                        defaultButton: 'search',
                        defaults: {
                            xtype: 'container',
                            layout: 'anchor',
                            columnWidth: 0.5,
                            margin: 5,
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%',
                                labelWidth: 110
                            }
                        },
                        items: [
                            {
                                items: [
                                    {

                                        xtype: 'combobox',
                                        itemId: 'cbxPlanServStates',
                                        fieldLabel: 'State',
                                        displayField: 'name',
                                        valueField: 'value',
                                        value: 'MI',
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StorePlanServStates}'
                                        }

                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cbxUsers',
                                        fieldLabel: 'Managed By:',
                                        displayField: 'fullName',
                                        valueField: 'userName',
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreUsers}'
                                        }

                                    }, {
                                        xtype: 'combobox',
                                        itemId: 'cbxStatus',
                                        fieldLabel: 'Status',
                                        displayField: 'listDescription',
                                        valueField: 'listItem',
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreStatus}'
                                        }
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cbxRefType',
                                        fieldLabel: 'Ref Type',
                                        displayField: 'name',
                                        valueField: 'value',
                                        queryMode: 'local',
                                        bind: {
                                            store: '{StoreRefType}'
                                        }
                                    },
                                    {
                                        xtype: 'membertypeahead',
                                        itemId: 'cbxMemberSearch',
                                        fieldLabel: 'Member',
                                        displayField: 'MemberName',
                                        valueField: 'memberID'


                                    }
                                ]
                            }
                        ],
                        buttons: [
                            {
                                text: 'Search',
                                iconCls: 'x-fa fa-search',
                                handler: 'btnSearchClick',
                                scope: this
                            },
                            {
                                text: 'Reset',
                                iconCls: 'x-fa fa-rotate-left',
                                handler: 'onReset'
                            }
                        ]
                    },
                    {
                        region: 'center',
                        xtype: 'grid',
                        itemId: 'coccasesgrid',
                        bind: '{StoreCOCCases}',
                        listeners: {
                            rowdblclick: 'onRecordSelect'
                            // select: 'onRecordSelect'
                        },
                        columns: [
                            {

                                text: 'Member ID',
                                dataIndex: 'memberID',
                                flex: 1
                            },
                            {
                                text: 'Seq Num',
                                dataIndex: 'seqNum',
                                flex: 1

                            },

                            {
                                text: 'Member Name',
                                dataIndex: 'memberName',
                                flex: 1

                            },
                            {
                                text: 'Eff Date',
                                dataIndex: 'effDate', format: 'm/d/Y', xtype: 'datecolumn',
                                flex: 1
                            },

                            {
                                text: 'F/U Date',
                                dataIndex: 'followUpDate',
                                format: 'm/d/Y', xtype: 'datecolumn',
                                flex: 1

                            },
                            {
                                text: 'Desc',
                                dataIndex: 'cmDescription',
                                flex: 1

                            },
                            {
                                text: 'Referral Type',
                                dataIndex: 'referralType',
                                flex: 1

                            },
                            {
                                text: 'Alerts',
                                dataIndex: 'Alerts',
                                flex: 1

                            },
                            {
                                text: 'Goal For Next Contact',
                                dataIndex: 'goalForNextContact',
                                flex: 1

                            },

                            {
                                text: 'Managed By',
                                dataIndex: 'managedBy',
                                flex: 1

                            },
                            {
                                text: 'Case Status',
                                dataIndex: 'caseStatus',
                                flex: 1
                            },
                            {
                                text: 'System Id',
                                dataIndex: 'systemId',
                                hidden: true,
                                flex: 1
                            },
                            {
                                text: 'Recipient Id',
                                dataIndex: 'recipientId',
                                hidden: true,
                                flex: 1
                            },
                            {
                                text: 'State',
                                dataIndex: 'state',
                                hidden: true,
                                flex: 1
                            }
                        ],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            bind: '{StoreCOCCases}',
                            itemId: 'gridPagingToolbar',
                            displayInfo: true,
                            hideRefresh: true,
                            doRefresh: function () {
                                //this.store.loadPage(0);
                            }
                        }
                    }
                ]

            });
            view.add(win);
            me.getView().down('#COCAdvanceSearch').show();
        }
        else {
            me.getView().down('#COCAdvanceSearch').show();
        }

        //var StoreCOCCases = vm.getStore('StoreCOCCases');
        //StoreCOCCases.getProxy().setExtraParam('pWhere', 'null');
        //StoreCOCCases.getProxy().setExtraParam('pUserName', Atlas.user.un);
        //StoreCOCCases.getProxy().setExtraParam('userState', 'MI');
        //StoreCOCCases.load();
        //win.show();
    },
    btnSearchClick: function () {
        var me = this;
        var view = this.getView();
        var vm = this.getViewModel();

        var memberid = "",
            MCSRecipientId = "",
            managedBy = view.down('#cbxUsers').getValue(),
            state = view.down('#cbxPlanServStates').getValue(),
            status = view.down('#cbxStatus').getValue(),
            refType = view.down('#cbxRefType').getValue(),

        // lblDefaultViewName.Text = "";
            memberid = view.down('#cbxMemberSearch').getValue();

        if ((view.down('#cbxStatus').getValue() == null || view.down('#cbxStatus').getValue() == '') && (view.down('#cbxRefType').getValue() == null || view.down('#cbxRefType').getValue() == '')
            && (view.down('#cbxMemberSearch').getValue() == null || view.down('#cbxMemberSearch').getValue() == '') && (view.down('#cbxUsers').getValue() == null || view.down('#cbxUsers').getValue() == '')) {
            Ext.Msg.alert('PBM', 'At least one search criteria is required.');
            return false;
        }
        else {
            if (memberid != null) {

                var StoreMCSRecipientIdAPI = vm.getStore('StoreMCSRecipientIdAPI');
                StoreMCSRecipientIdAPI.getProxy().setExtraParam('pMemberId', memberid);
                StoreMCSRecipientIdAPI.getProxy().setExtraParam('userState', state);
                StoreMCSRecipientIdAPI.load(
                    {


                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation) {

                            scope: me;
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code == 0) {

                                if (objResp.metadata.pMCSRecipientId == '0' || objResp.metadata.pMCSRecipientId == '' || objResp.metadata.pMCSRecipientId == null) {
                                    Ext.Msg.alert('PBM', "Member not available in external system.");
                                }
                                else {
                                    MCSRecipientId = objResp.metadata.pMCSRecipientId;
                                    me.LoadCOCMaster(MCSRecipientId, managedBy, status, refType, state);
                                }

                            }
                            else {

                                // Ext.Msg.alert('PBM', objResp.message[0].message);
                            }

                        }
                    });
            }
            else {
                this.LoadCOCMaster(MCSRecipientId, managedBy, status, refType, state);
            }
        }
    },
    LoadCOCMaster: function (MCSRecipientId, managedBy, status, refType, state) {
        var searchFilter = "";
        var view = this.getView(),
            vm = this.getViewModel();
        if (managedBy != '' && managedBy != null) {

            if (searchFilter == "")
                searchFilter = "managedBy = '" + managedBy + "'";
            else
                searchFilter = searchFilter + " And managedBy = '" + managedBy + "'";
        }
        else {
            var Store = vm.getStore('StoreUsers');
            for (var i = 0; i < Store.data.items.length; i++) {
                if (searchFilter == "")
                    searchFilter = " (managedBy = '" + Store.data.items[i].data.userName + "'  ";
                else
                    searchFilter = searchFilter + " OR " + " managedBy = '" + Store.data.items[i].data.userName + "' ";
            }
            searchFilter = searchFilter + ") ";
        }
        if (MCSRecipientId != '' && MCSRecipientId != null) {
            if (searchFilter == "")
                searchFilter = "recipientID = " + MCSRecipientId;
            else

                searchFilter = searchFilter + " And recipientID = " + MCSRecipientId;
        }
        if (status != '' && status != null) {
            if (searchFilter == "")
                searchFilter = "caseStatus = '" + status + "'";
            else
                searchFilter = searchFilter + " And caseStatus = '" + status + "'";

        }
        if (refType != '' && refType != null) {
            if (searchFilter == "")
                searchFilter = "investigationType = '" + refType + "'";
            else
                searchFilter = searchFilter + " And investigationType = '" + refType + "'";

        }
        var StoreCOCCases = vm.getStore('StoreCOCCases');
        StoreCOCCases.getProxy().setExtraParam('pWhere', searchFilter);
        StoreCOCCases.getProxy().setExtraParam('pUserName', Atlas.user.un);
        StoreCOCCases.getProxy().setExtraParam('userState', state);
        StoreCOCCases.load();
    },
    onRecordSelect: function (grid, rec) {
        var view = this.getView(),
            vm = this.getViewModel();
        vm.data.memberID = rec.data.memberID;
        vm.data.systemId = rec.data.systemId;

        var MCSRecipientId = rec.data.recipientId,
            PBMRecipientId = rec.data.PBMRecipientId,
            seqNum = rec.data.seqNum,
            casesystemId = rec.data.systemId,

            state = '';

        vm.set('state', view.down('#cbxPlanServStates').getValue());
        vm.set('MCSRecipientId', MCSRecipientId);
        vm.set('seqNum', seqNum);
        vm.set('casesystemId', casesystemId);
        state = vm.get('state');
        if (state == null) {
            state = 'MI';
        }
        this.GetCOCCaseInfo(MCSRecipientId, seqNum, state);

        this.displayMemberInfo(vm.data.memberID, state);

        view.down('#COCAdvanceSearch').close();
    },
    displayMemberInfo: function (memberID, state) {
        var me = this, vm = me.getViewModel(), pbmRecipientId = '';
        var storePBMrecipientIdData = this.getViewModel().getStore('StorePBMRecipientIdData');
        storePBMrecipientIdData.getProxy().setExtraParam('pMemberId', memberID);
        storePBMrecipientIdData.load(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation) {

                    var status = operation.getResultSet().message[0];
                    if (status.code === 0) {
                        if (record.length > 0) {
                            var data = record[0].data;
                            pbmRecipientId = data.pbmRecipientId;
                            vm.set('PBMRecipientId', pbmRecipientId);
                            vm.set('MemberId', data.memberId);
                            if (pbmRecipientId != "" && pbmRecipientId != "0") {
                                var storeMemberCoverageHistory = vm.getStore('StoreMemberCoverageHistory');
                                storeMemberCoverageHistory.getProxy().setExtraParam('pKeyValue', pbmRecipientId);
                                storeMemberCoverageHistory.load(
                                    {
                                        failure: function (record, operation) {
                                        },
                                        success: function (record, operation) {
                                        },
                                        callback: function (record1, operation) {
                                            var status = operation.getResultSet().message[0];
                                            if (status.code === 0) {
                                                if (record1.length > 0) {
                                                    var data = null;
                                                    for (var i = 0; i < record1.length; i++) {
                                                        data = record1[i].data;
                                                    }

                                                    vm.set('memberCoverageHistoryData', data);
                                                    var storePrescriberData = vm.getStore('StorePrescriberData');
                                                    storePrescriberData.getProxy().setExtraParam('pKeyValue', data.tPCPID); //1861492423
                                                    storePrescriberData.load(
                                                        {
                                                            scope: me,
                                                            callback: function (record2, operation) {
                                                                var status = operation.getResultSet().message[0];
                                                                if (status.code === 0) {
                                                                    if (record2.length > 0) {
                                                                        var data = record2[0].data;
                                                                        vm.set('memberPCPData', data);
                                                                    }
                                                                }
                                                            }
                                                        });
                                                }

                                            }
                                            else {
                                                Ext.Msg.alert('Error', status.message);
                                            }

                                        }
                                    }, me);
                                if (vm.data.PBMRecipientId) {
                                    var storeMemberMasterData = vm.getStore('StoreMemberInfoData');
                                    storeMemberMasterData.getProxy().setExtraParam('pKeyValue', vm.data.PBMRecipientId);
                                    storeMemberMasterData.load(
                                        {
                                            failure: function (record, operation) {
                                            },
                                            success: function (record, operation) {
                                            },
                                            callback: function (record, operation) {
                                                var status = operation.getResultSet().message[0];
                                                if (status.code === 0) {
                                                    var data = record[0].data;
                                                    vm.set('memberInfoMasterData', data);
                                                }
                                                else {
                                                    Ext.Msg.alert('Error', status.message);
                                                }

                                            }
                                        }, me);
                                }
                            }
                        }
                    }
                    else {
                        Ext.Msg.alert('Error', status.message);
                    }
                    me.fireEvent('LoadProblemAGoals');
                    me.fireEvent('GetCOCMedications');
                    me.fireEvent('LoadAttachmentssetPermission');
                    me.fireEvent('loadGrids');
                }
            }, me);

    },
    GetCOCCaseInfo: function (MCSRecipientId, SeqNum, state) {

        var view = this.getView(),
            me = this,
            vm = this.getViewModel(),
            pwhere = "RecipientId = " + MCSRecipientId + " and seqNum = " + SeqNum + " ";

        var StoreCOCCasesDetails = vm.getStore('StoreCOCCasesDetails');
        StoreCOCCasesDetails.getProxy().setExtraParam('pWhere', pwhere);
        StoreCOCCasesDetails.getProxy().setExtraParam('pUserName', Atlas.user.un);
        StoreCOCCasesDetails.getProxy().setExtraParam('pUserName', state);
        StoreCOCCasesDetails.load(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation) {

                    if (record.length <= 0) {
                        Ext.Msg.alert("PBM", "Record not found.");
                        view.down('#lblSeqNo').setValue('');
                        // view.down('#lblStateCaption').setValue('');
                        view.down('#lblState').setValue('');
                        view.down('#btnMrxId').setText('');
                        view.down('#lblCaseManager').setValue('');
                        view.down('#lblCaseStatus').setValue('');
                        view.down('#lblStartDate').setValue('');
                        view.down('#lblEffDate').setValue('');
                        view.down('#lblTermDate').setValue('');
                        view.down('#lblStrat1').setValue('');
                        view.down('#lblAcuityLevel1').setValue('');
                        view.down('#lblClosedReason').setValue('');
                        view.down('#lblDescription').setValue('');
                        view.down('#lblReferralType').setValue('');
                        view.down('#lblReferralSource').setValue('');
                        view.down('#lblReferralReason').setValue('');

                        view.down('#btnCloseCase').setDisabled(true);
                        view.down('#btnReassign').setDisabled(true);


                        var StoreCOCMaster = vm.getStore('StoreCOCMaster');
                        StoreCOCMaster.getProxy().setExtraParam('pWhere', '');
                        StoreCOCMaster.getProxy().setExtraParam('pUserName', '');
                        StoreCOCMaster.load();

                        var StoreCOCAlerts = vm.getStore('StoreCOCMaster');
                        StoreCOCAlerts.getProxy().setExtraParam('pWhere', '');
                        StoreCOCAlerts.getProxy().setExtraParam('pUserName', '');
                        StoreCOCAlerts.load();

                    }

                    else {
                        vm.set('record', record[0]);
                        view.down('#lblSeqNo').setValue(record[0].data.seqNum);
                        // view.down('#lblStateCaption').setText(record[0].data.caseStatus);
                        for (var i = 0; i < vm.getStore('StorePlanServStates').data.items.length; i++) {
                            if (vm.getStore('StorePlanServStates').data.items[i].data.value.toUpperCase() == state) {
                                view.down('#lblState').setValue(vm.getStore('StorePlanServStates').data.items[i].data.name);
                                break;
                            }
                        }
                        view.down('#btnMrxId').setText("Member Id: " + record[0].data.memberID);
                        view.down('#lblCaseManager').setValue(record[0].data.managedBy);
                        view.down('#lblCaseStatus').setValue(record[0].data.caseStatus);
                        view.down('#lblStartDate').setValue(record[0].data.startDate);
                        view.down('#lblEffDate').setValue(record[0].data.effDate);
                        view.down('#lblTermDate').setValue(record[0].data.termDate);
                        view.down('#lblStrat1').setValue(record[0].data.stratDesc);
                        view.down('#lblAcuityLevel1').setValue(record[0].data.AcuityLevelDesc);
                        view.down('#lblClosedReason').setValue(record[0].data.closedReasonDesc);
                        view.down('#lblDescription').setValue(record[0].data.cmDescription);
                        view.down('#lblReferralType').setValue(record[0].data.referralType);
                        view.down('#lblReferralSource').setValue(record[0].data.referralSource);
                        view.down('#lblReferralReason').setValue(record[0].data.referralReason);


                        if ((record[0].data.managedBy != Atlas.user.un) ||
                            record[0].data.caseStatus.toLowerCase() == 'closed') {
                            view.down('#btnCloseCase').setDisabled(true);
                        }
                        else {
                            view.down('#btnCloseCase').setDisabled(false);
                        }

                        if (record[0].data.caseStatus.toLowerCase() != 'closed')
                            view.down('#btnReassign').setDisabled(false);
                        else
                            view.down('#btnReassign').setDisabled(true);
                        // btnContactSummary.Disabled = false;
                        view.down('#btnCaseNotes').setDisabled(false);
                        //view.down('#btnReassign').setDisabled(false);
                        vm.set('casesystemId', record[0].data.systemId);
                        vm.set('managedByUserName', record[0].data.managedBy);
                        vm.set('caseStatus', record[0].data.caseStatus);

                        me.getCOCMasterInfo(MCSRecipientId, state);
                        me.getCOCAlerts(record[0].data.systemId, state);


                    }

                }
            }
        );
    },
    ViewDocument: function (pcFileName) {
      this.LoadNotes(pcFileName);
    },
    LoadNotes: function (pcFileName) {

        var url = null;
        var vm = this.getViewModel();
        vm.get('seqNum')
        var _stateInfo = vm.get('state');
        var model = Ext.create('Atlas.casemanagement.model.Options');
        var saveProxy = model.getProxy();
        saveProxy.setExtraParam('ipcKeyName', 'MCSDBServerURL');
        model.phantom = false;
        model.load({
            failure: function (record, operation) {
            },
            callback: function (recorddata, operation, success) {
                var obj = Ext.decode(operation.getResponse().responseText);
                switch (_stateInfo) {
                    case "IL":
                        url = obj.metadata.opcKeyValue+"mhpildoc/prognote/pn";
                        break;
                    case "IA":
                        url = obj.metadata.opcKeyValue+"mhpiadoc/prognote/pn";
                        break;
                    case "NH":
                        url = obj.metadata.opcKeyValue+"mhpnhdoc/prognote/pn";
                        break;
                    case "OH":
                        url = obj.metadata.opcKeyValue+"mhpohdoc/prognote/pn";
                        break;
                    default:
                        url = obj.metadata.opcKeyValue+"hpmdocs/prognote/pn";
                        break;
                }
                var ProgramName = "printCOCCaseNotes.p";
                var parameters = url +pcFileName;
                var reportName = "COCNotes";
                var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc(reportName, ProgramName, parameters, "1", "", "no", "");
                if (documentInfo.code == 0) Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data);
            }
        });
    },
    Notes_Click: function () {
        var me = this;
        var view = this.getView();
        var vm = this.getViewModel();
        var _stateInfo = vm.get('state');
        var RecipientId = vm.get("MCSRecipientId");
        var model = Ext.create('Atlas.casemanagement.model.ProgressNotesAPI');
        var saveProxy = model.getProxy();
        saveProxy.setExtraParam('ipiRecipientID', RecipientId);
        saveProxy.setExtraParam('pUserName', Atlas.user.un);
        saveProxy.setExtraParam('userState', _stateInfo);
        me.getView().mask('Loading......');
        model.load({
            failure: function (record, operation) {
            },
            success: function (recorddata, operation) {

            },
            callback: function (record, operation, success) {
                var objRespListDetail = Ext.decode(operation.getResponse().responseText);
                if(objRespListDetail.metadata)
                    me.ViewDocument(objRespListDetail.metadata.opcFileName);
                me.getView().unmask();
            }
        });

    },
    btnGoToMember: function () {
        var me = this, vm = me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'), id = me.getView().down('#lblRID').getValue();
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        if(id!="") {
            this.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
                atlasId: id,
                RID: id,
                menuId: menuId
            });
        }
    },
    btnGoToPrescriber: function () {
        var me = this, vm = me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar'), id = vm.get('memberPCPData').npi;
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        this.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
            atlasId: vm.get('memberPCPData').npi,
            NPI: vm.get('memberPCPData').npi,
            menuId: menuId
        });
    },
    GetMedicationAlert: function (grid, rowIndex) {

        var me = this,
            win;
        var view = me.getView();
        var vm = me.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        vm.set('alertSystemId', rec.data.systemID);
        var StoreMedreconalert = vm.getStore('StoreMedreconalert');
        StoreMedreconalert.getProxy().setExtraParam('pSystemID', rec.data.systemID);
        StoreMedreconalert.getProxy().setExtraParam('userState', vm.get('state'));
        StoreMedreconalert.load(
            {
                failure: function (recordMed, operation) {
                },
                success: function (recordMed, operation) {
                },
                callback: function (recordMed, operation) {


                    win = Ext.create('Ext.window.Window', {
                        title: 'Medication Alert',
                        modal: true,
                        scrollable: true,
                        viewModel: {
                            parent: me.getViewModel()
                        },
                        itemId: 'MedCaseAlert',
                        xtype: 'MedCaseAlert',
                        height: 500,
                        width: 500,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        dockedItems: [

                            {
                                xtype: 'toolbar',
                                dock: 'bottom',
                                style: {borderColor: 'black', borderStyle: 'solid'},
                                items: [
                                    '->'
                                    , {
                                        xtype: 'button',
                                        text: 'Acknowledge',
                                        iconCls: 'fa fa-save',
                                        handler: 'btnAckAlertClick',
                                        scope: me
                                    }
                                    , {
                                        xtype: 'button',
                                        text: 'cancel',
                                        iconCls: 'fa fa-remove',
                                        handler: 'btn_MedCancel'
                                    }
                                ]


                            }
                        ],
                        items: [


                            {xtype: 'textarea', name: 'MedAlerts', itemId: 'MedAlerts', height: 300}

                        ]
                    });
                    view.add(win);
                    win.show();
                    view.down('#MedAlerts').setValue(recordMed[0].data.value);

                }


            }
        );


    },
    btn_MedCancel:function()
    {
        this.getView().down('#MedCaseAlert').close();
    },
    btnAckAlertClick: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            pFieldList = '',
            pFields = '',
            state = vm.get('state'),
            alertSystemId = vm.get('alertSystemId');

        var extraParameters = {

            'pMode': 'mrx',
            'pUserName': Atlas.user.un,
            'pSystemID': alertSystemId,
            'pDeviceId': '',
            'pTokenId': '',
            'userState': vm.get('state')


        };
        var saveAction = [
            {"Save": {"key": 'mode', "value": 'A'}}
        ];
        var returnFields = '';
        var saveCaseAckData = Atlas.common.utility.Utilities.post('vendor/hp/cmalertreadapi/update', extraParameters, '');

        if (saveCaseAckData.code == 0) {
            me.getCOCAlerts(vm.get('casesystemId'), vm.get('state'));
            // view.down('#MedCaseAlert').close();
        }

    },
    getCOCMasterInfo: function (MCSRecipientId, state) {
        var view = this.getView(),
            vm = this.getViewModel(),
            pwhere = '';

        var pWhere = " RecipientId = " + MCSRecipientId + " ";

        var StoreCOCMaster = vm.getStore('StoreCOCMaster');
        StoreCOCMaster.getProxy().setExtraParam('pWhere', pWhere);
        StoreCOCMaster.getProxy().setExtraParam('pUserName', Atlas.user.un);
        StoreCOCMaster.getProxy().setExtraParam('userState', state);
        StoreCOCMaster.load(
            {
                failure: function (recordCOCMaster, operation) {
                },
                success: function (recordCOCMaster, operation) {
                },
                callback: function (recordCOCMaster, operation) {

                    if (recordCOCMaster.length > 0) {

                        view.down('#lblEffDate2').setValue(recordCOCMaster[0].data.effDate);
                        view.down('#lblCoordinator').setValue(recordCOCMaster[0].data.assignedCoordinator);
                        view.down('#lblStrat2').setValue(recordCOCMaster[0].data.StratLevel);
                        view.down('#lblAcuityLevel2').setValue(recordCOCMaster[0].data.AcuityLevelDesc);


                    }

                }
            }
        );

    },
    getCOCAlerts: function (casesystemId, state) {
        var view = this.getView(),
            vm = this.getViewModel(),
            pwhere = '';

        if (casesystemId == "0" || casesystemId == "") {
            return;
        }
        var pWhere = " ownerSystemID = " + casesystemId;

        var StoreCOCAlerts = vm.getStore('StoreCOCAlerts');
        StoreCOCAlerts.getProxy().setExtraParam('pWhere', pWhere);
        StoreCOCAlerts.getProxy().setExtraParam('pUserName', Atlas.user.un);
        StoreCOCAlerts.getProxy().setExtraParam('userState', state);
        StoreCOCAlerts.load();
        //var win = Ext.WindowManager.getActive();
        //if (win) {
        //    win.close();
        //}
    },
    CloseCaseClick: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Close Case',
            modal: true,
            scrollable: true,
            viewModel: {
                parent: me.getViewModel()
            },
            itemId: 'closeCase',
            xtype: 'closeCase',
            height: 500,
            width: 500,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler: 'SaveCloseCase', scope: this}
                        , {xtype: 'button', text: 'cancel', iconCls: 'fa fa-remove', handler: 'btn_Cancel'}
                    ]


                }
            ],
            items: [


                {xtype: 'displayfield', name: 'lblStatus', itemId: 'lblStatus', fieldLabel: 'Status', value: 'Closed'},
                {
                    xtype: 'datefield',
                    name: 'dtTermDate',
                    itemId: 'dtTermDate',
                    fieldLabel: 'Term. Date',
                    alowBlank: false,
                    emptyText: 'Term. Date',
                    format: 'm/d/Y'
                },
                {
                    xtype: 'combobox',
                    name: 'cbxClosedReason',
                    itemId: 'cbxClosedReason',
                    fieldLabel: 'Closed Reason',
                    alowBlank: false,
                    bind: {store: '{StoreClosedReason}'},
                    displayField: 'listDescription',
                    valueField: 'listItem'
                },
                {xtype: 'textarea', name: 'txtNote', itemId: 'txtNote', fieldLabel: 'Notes', alowBlank: false}

            ]
        });
        view.add(win);
        win.show()
    },
    SaveCloseCase: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            pFieldList = '',
            pFields = '',
            state = vm.get('state'),
            termDate = new Date(view.down('#dtTermDate').getValue());

        pFieldList = 'termDate,caseStatus,closedReason';
        pFields = Ext.Date.format(termDate, 'm/d/Y') + '|' + view.down('#lblStatus').getValue() + '|' + view.down('#cbxClosedReason').getValue();

        var extraParameters = {
            'pRecipientID': vm.get('MCSRecipientId'),
            'pMode': 'mrx',
            'pUserName': Atlas.user.un,
            'pFieldList': pFieldList,
            'pFields': pFields,
            'pDeviceId': '',
            'pTokenId': '',
            'pInvestigationType': '',
            'pSeqNum': vm.get('seqNum'),
            'userState': vm.get('state')


        };
        var saveAction = [
            {"Save": {"key": 'mode', "value": 'A'}}
        ];
        var returnFields = '';
        var saveCloseData = Atlas.common.utility.Utilities.post('vendor/hp/casemanageddataapi/update', extraParameters, ['pResult2']);

        if (saveCloseData.pResult2 == 0) {
            []
            var extraParameters = {
                "pMode": 'mrx',
                "pUsername": Atlas.user.un,
                "pTokenId": '',
                "pAction": 'A',
                "pSystemId": '0',
                'userState': vm.get('state')

            }

            var saveNotesData = Atlas.common.utility.Utilities.saveData([theStore], 'vendor/hp/notesapi/update', 'ttNotes', [false], extraParameters,
                [
                    {
                        "Create": {key: 'Action', value: 'A'},
                        "Update": {key: 'Action', value: 'U'},
                        "Delete": {key: 'Action', value: 'D'}
                    }
                ], ['pResult2']);
            if (saveNotesData.pResult2 == 0) {
                Ext.MessageBox.alert("PBM", "PH Consult Case Successfully Closed.", this.showResult, this);

            }
        }

        me.GetCOCCaseInfo(vm.get('MCSRecipientId'), vm.get('seqNum'), vm.get('state'));
        view.down('#closeCase').close();


    },
    ReassignClick: function () {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Close Case',
            modal: true,
            scrollable: true,
            viewModel: {
                parent: me.getViewModel()
            },
            itemId: 'winReassignCase',
            xtype: 'ReassignCase',
            height: 200,
            width: 350,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'btnSaveReassignClick',
                            scope: this
                        }
                        , {xtype: 'button', text: 'cancel', iconCls: 'fa fa-remove', handler: 'btn_Cancel'}
                    ]


                }
            ],
            items: [
                {
                    xtype: 'form', itemId: 'formReassign', items: [{
                    xtype: 'combobox',
                    name: 'username',
                    itemId: 'cbxUsers',
                    fieldLabel: 'Reassign To',
                    allowBlank: false,
                    displayField: 'fullName',
                    valueField: 'userName',
                    bind: {
                        store: '{StoreUsers}'
                    }
                },
                    {xtype: 'textarea', name: 'txtNotes2', itemId: 'txtNotes2', fieldLabel: 'Notes', allowBlank: false}]
                }

            ]
        });
        view.add(win);
        win.show()
    },
    btn_Cancel: function () {
        this.getView().down('#winReassignCase').close();
    },
    btnSaveReassignClick: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            pFieldList = '',
            pFields = '',
            state = vm.get('state');
        if (view.down('#formReassign').isValid()) {
            pFieldList = 'managedBy';
            pFields = view.down('#cbxUsers').getValue();
            var saveAction = [
                {"Save": {"key": 'mode', "value": 'A'}}
            ];
            var extraParameters = {
                'pRecipientID': vm.get('MCSRecipientId'),
                'pMode': 'mrx',
                'pUserName': Atlas.user.un,
                'pFieldList': pFieldList,
                'pFields': pFields,
                'pDeviceId': '',
                'pTokenId': '',
                'pInvestigationType': '',
                'pSeqNum': vm.get('seqNum'),
                'userState': vm.get('state')
            };
            var saveCaseData = Atlas.common.utility.Utilities.post('vendor/hp/casemanageddataapi/update', extraParameters, ['pResult2']);
            if (saveCaseData.pResult2 == 0) {
                var theStore = Ext.create('Ext.data.Store', {
                    fields: ["ParentSystemID", "SystemID", "Subject", "Note", "Access", "CreateUser"],
                    data: [
                        {
                            "ParentSystemID": vm.get('casesystemId'),
                            "SystemID": 0,
                            "Subject": "PH Consult Case Reassigned",
                            "Note": "PH Consult Case Reassigned to:" + Atlas.user.un + ". " + view.down('#txtNotes2').getValue(),
                            "Access": "HPM",
                            "CreateUser": Atlas.user.un
                        }
                    ]
                });
                var extraParameters = {
                    "pMode": 'mrx',
                    "pUsername": Atlas.user.un,
                    "pTokenId": '',
                    "pAction": 'A',
                    "pSystemId": '0',
                    'userState': vm.get('state')
                }
                var saveNotesData = Atlas.common.utility.Utilities.saveData([theStore], 'vendor/hp/notesapi/update', 'ttNotes', [false], extraParameters,
                    [
                        {
                            "Create": {key: 'Action', value: 'A'},
                            "Update": {key: 'Action', value: 'U'},
                            "Delete": {key: 'Action', value: 'D'}
                        }
                    ], ['pResult2']);
                if (saveNotesData.pResult2 == 0) {
                    Ext.MessageBox.alert("PBM", "PH Consult Case Successfully Reassigned.", this.showResult, this);
                }
            }
            view.down('#winReassignCase').close();
            me.GetCOCCaseInfo(vm.get('MCSRecipientId'), vm.get('seqNum'), vm.get('state'));
        }
    },
    onReset: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#coccasesgrid').getStore().removeAll();
        view.down('#formCOCAdvanceSearch').reset();
        var gridPagingToolbar = this.getView().down('#gridPagingToolbar');
        //var StoreCOCCases = vm.getStore('StoreCOCCases');
        //StoreCOCCases.removeAll();
        gridPagingToolbar.onLoad();
        //StoreCOCCases.getProxy().setExtraParam('pWhere', 'null');
        //StoreCOCCases.getProxy().setExtraParam('pUserName', Atlas.user.un);
        //StoreCOCCases.getProxy().setExtraParam('userState', 'MI');
        //StoreCOCCases.load();

    }

});

