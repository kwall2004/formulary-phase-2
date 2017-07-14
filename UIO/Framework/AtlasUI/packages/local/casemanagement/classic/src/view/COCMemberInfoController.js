/**
 * Created by s6393 on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.view.COCMemberInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cocMemberInfoController',
    listen: {
        controller: {
            'cocdetailscontroller': {
                loadGrids: 'loadGrids'
            }
        }
    },
    init: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            mcsRecipientId = vm.get('MCSRecipientId');

        if (mcsRecipientId != "")
            this.loadGrids();

    },
    authorizationsDetailSelect: function (view, record, e) {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();
        var datar = new Array();
        vm.set('authorizationsGridData', record);
        var AuthProceduresStore = vm.getStore('AuthProceduresStore');
        if (record.data.authStatus != 'O' && record.data.authStatus != 'C') {
            record.data.NumVisits = '0';
        }
        var StoreAuthNotes = vm.getStore('StoreAuthNotes');
        StoreAuthNotes.getProxy().setExtraParam('pWhere', "parentSystemId = " + record.data.systemID);
        StoreAuthNotes.load();


        var StoreAuthAttachment = vm.getStore('StoreAuthAttachment');
        StoreAuthAttachment.getProxy().setExtraParam('pWhere', "SystemID = " + record.data.systemID);
        StoreAuthAttachment.load();
        if (record.data.procCodes != "") {
            var code = record.data.procCodes.split('^');
            for (var i = 0; i < code.length; ++i) {
                var record = {'Code': code[i], 'Description': code[i + 1]};
                datar.push(record);
                i += 1;
            }
            AuthProceduresStore.loadData(datar);
            theView.down('#btnProcedures').setDisabled(false);
        }
        else {
            theView.down('#btnProcedures').setDisabled(true);
            AuthProceduresStore.loadData(datar);
        }
    },
    institutionalGridSelect: function (view, record, e) {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();
        var store = vm.getStore('StoreClaimDetails');
        store.getProxy().setExtraParam('pWhere', "ClaimNumber =" + record.data.claimNumber);
        store.load();
    },
    professionalGridSelect: function (view, record, e) {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();
        var store = vm.getStore('StoreProClaimDetails');
        store.getProxy().setExtraParam('pWhere', "ClaimNumber =" + record.data.claimNumber);
        store.load();
    },
    onViewClick: function (grid, rowIndex, colIndex) {
        var vm=this.getViewModel(),
         MCSRecipientId = vm.get('MCSRecipientId'),
         seqNum= grid.eventPosition.record.get('seqNum');
        var userState = vm.get('state');
        var RegenReport = "2";
        var OutputType = "pdf";
        var ReportProgram = "printmedicarehra.p";
        var  Parameters = MCSRecipientId.trim() + "|" + seqNum.trim() ;
        this.GenerateReport(ReportProgram,Parameters,RegenReport,OutputType);
    },
   GenerateReport:function(pReportName, pParameters, pRegenReport, pOutputType) {
       var pJobNum = 0;
       var state = "";
       var vm = this.getViewModel();
       try {
           var extraParameters = {
               'pMode': 'mrx',
               'pUserName': Atlas.user.un,
               'pDeviceId': "",
               'pTokenId': '',
               'pReportName': pReportName,
               'pParameters': pParameters,
               'pRegenReport': pRegenReport,
               'pOutputType': pOutputType,
               'userState': vm.get('state')
           };
           var saveAction = [
               {"Save": {"key": 'mode', "value": 'A'}}
           ];
           var returnFields = ['pJobNum', 'pData', 'pStatus', 'pResult', 'pMessage'];
           var runreport64api = Atlas.common.utility.Utilities.post('vendor/hp/runreport64api/update', extraParameters, returnFields);
           if (runreport64api.code == 0) {
               Atlas.common.utility.Utilities.displayDocument(pOutputType, runreport64api.pData)
           }
       }
       catch (ex) {

       }
   },
    loadGrids: function () {

        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        var recipientID = vm.get('PBMRecipientId'),
            MCSRecipientId = vm.get('MCSRecipientId')
        var userState = vm.get('state');

        /*Authorizations*/
        /*Grid 1: Member Authorization*/

        var storeMemberAuth = vm.getStore('StoreMemberAuth');
        storeMemberAuth.getProxy().setExtraParam('pWhere', "recipientID =" + MCSRecipientId);
        storeMemberAuth.getProxy().setExtraParam('userState', userState);
        storeMemberAuth.load();

        /*Eligibility History*/
        /*Grid 1: Eligibility History*/
        var storeEligibilityHistory = vm.getStore('StoreEligibilityHistory');
        storeEligibilityHistory.getProxy().setExtraParam('pRecipientId', MCSRecipientId);
        storeEligibilityHistory.getProxy().setExtraParam('userState', userState);
        storeEligibilityHistory.load();

        /*Grid 2: PCP Header*/
        var storePCPHistory = vm.getStore('StorePCPHistory');
        storePCPHistory.getProxy().setExtraParam('pRecipientID', MCSRecipientId);
        storePCPHistory.getProxy().setExtraParam('userState', userState);
        storePCPHistory.load();

        /*Institutional Claims */
        /*Grid 1: Claim Header*/
        var instClaimsStore = vm.getStore('StoreClaimHeader');
        instClaimsStore.getProxy().setExtraParam('pWhere', "recipientID = " + MCSRecipientId + " and formType = 'UB92'");
        instClaimsStore.getProxy().setExtraParam('userState', userState);
        instClaimsStore.load();

        /*Grid 2: Claim Details*/
        /* Loaded on based on Grid 1 select listeners function*/

        /*Professional Claims */
        /*Grid 1: Claim Header*/
        var proClaimsStore = vm.getStore('StoreProClaimHeader');
        proClaimsStore.getProxy().setExtraParam('pWhere', "recipientID = " + MCSRecipientId + " and formType = 'HCFA'");
        proClaimsStore.getProxy().setExtraParam('userState', userState);
        proClaimsStore.load();

        /*Grid 2: Claim Details*/
        /* Loaded on based on Grid 1 select listeners function*/
        vm.getStore('storeYear').removeAll();
        var year = Atlas.common.utility.Utilities.getLocalDateTime().getFullYear();
        var arrYear = [];
        for (var i = 0; i < 10; i++) {
            var obj = {
                'name': year - i,
                'value': year - i
            };
            arrYear.push(obj);
            vm.getStore('storeYear').insert(i, obj)
        }
        me.lookup('cbxYears').setValue(year);

        /*HEDIS Summary*/
        /*Grid 1: List*/
        // var StoreHedisSummary = vm.getStore('StoreHedisSummary');
        // StoreHedisSummary.getProxy().setExtraParam('pWhere', "reportYear = '" + me.lookup('cbxYears').getValue() +"' and recipientID = " + MCSRecipientId);
        // StoreHedisSummary.getProxy().setExtraParam('pUserName', Atlas.user.un);
        // StoreHedisSummary.getProxy().setExtraParam('userState', userState);
        // StoreHedisSummary.load();
        me.btnApply_Click();

        /*Grid 2: Notes*/
        var StoreHedisNotes = vm.getStore('StoreHedisNotes');
        StoreHedisNotes.getProxy().setExtraParam('pRecipientId', MCSRecipientId);
        StoreHedisNotes.getProxy().setExtraParam('pUserName', Atlas.user.un);
        StoreHedisNotes.getProxy().setExtraParam('userState', userState);
        StoreHedisNotes.load({


            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation) {
                scope: me;
                var data = ''
                for (var i = 0; i < record.length; i++) {
                    data = data + record[i].data.lineText;
                }
                view.down('#HEDISGridNotes').setValue(data);


            }
        });

        /*Medicare HRA PDF */
        /*Grid 1 Member HRA*/
        var storeMedicareHRAPDF = vm.getStore('StoreMedicareHRAPDF');
        storeMedicareHRAPDF.getProxy().setExtraParam('pWhere', "recipientID = " + MCSRecipientId);
        storeMedicareHRAPDF.getProxy().setExtraParam('pMode', 'mrx');
        storeMedicareHRAPDF.getProxy().setExtraParam('pUserName', Atlas.user.un);
        storeMedicareHRAPDF.getProxy().setExtraParam('pDeviceId', '');
        storeMedicareHRAPDF.getProxy().setExtraParam('pTokenId', '');
        storeMedicareHRAPDF.getProxy().setExtraParam('pSort', '');
        storeMedicareHRAPDF.load();


    },

    btnApply_Click: function () {
        var me = this,
            vm = this.getViewModel(),
            selectedYear = me.lookup('cbxYears').getValue(),
            isAllChecked  = me.lookup('rdAllRef').getValue(),
            userState = vm.get('state'),
            pHedisPopulation = me.lookup('hedisPopulationRef').getValue(),
            MCSRecipientId = vm.get('MCSRecipientId'),
            StoreHedisSummary = vm.getStore('StoreHedisSummary');

        if(parseInt(MCSRecipientId) > 0){
            var pWhere = '';
            if(selectedYear != 0){
                pWhere = pWhere + " reportYear = " + selectedYear;
            }
            else{
                pWhere = pWhere + " reportYear = " + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
            }

            pWhere = pWhere + " and recipientID = " + MCSRecipientId;
            if (!isAllChecked){
                pWhere = pWhere + " and complete = no";
            }

            if (pHedisPopulation != null){
                var vPopulation = pHedisPopulation;
                var pYear = parseInt(selectedYear);
                if (vPopulation == 1 && selectedYear != "2011")
                {
                    pWhere = pWhere + "  and (population1 = 1 or population6 = 1) ";
                }
                else if (vPopulation == 1 && pYear < (Atlas.common.utility.Utilities.getLocalDateTime()).getFullYear())
                {
                    pWhere = pWhere + "  and population4 = 1 ";
                }
                else if (vPopulation == 1)
                {
                    pWhere = pWhere + "  and (population2 = 1 or population5 = 1) ";
                }
                else if (vPopulation == 4)
                {
                    pWhere = pWhere + "  and population4 = 1 ";
                }
            }
            else
            {
                return;
            }
            StoreHedisSummary.getProxy().setExtraParam('pWhere', pWhere);
            StoreHedisSummary.getProxy().setExtraParam('pUserName', Atlas.user.un);
            StoreHedisSummary.getProxy().setExtraParam('userState', userState);
            StoreHedisSummary.load();
        }

    },
    btnProceduresClick: function () {
        var me=this,
            view=me.getView();
        var win = Ext.create('Ext.window.Window', {
            title: 'Procedures',
            itemId: 'winProcedures',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            height: 300,
            width: 500,
            items: [
                {
                    xtype: 'grid',
                    flex: 1,
                    viewModel: {
                        parent: me.getViewModel()
                    },
                    bind: {
                        store: '{AuthProceduresStore}'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                '->',
                                {
                                    xtype: 'button',
                                    itemId: 'btnClose',
                                    text: 'Close',
                                    handler: 'btnProceduresCloseClick'
                                }
                            ]
                        }],

                    columns: [

                        {text: 'Proc Code', dataIndex: 'Code', flex: 1},
                        {text: 'Description', dataIndex: 'Description', flex: 1}

                    ]
                }]
        });
        view.add(win);
        win.show();
    },
    btnProceduresCloseClick:function()
    {
      this.getView().down('#winProcedures').close();
    },
    btnAttachmentsClick: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();


        win = Ext.create('Ext.window.Window', {
            title: 'Attachments',
            itemId: 'winAuthAttachments',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            height: 300,
            width: 900,
            items: [
                {
                    xtype: 'grid',
                    flex: 1,
                    viewModel: {
                        parent: me.getViewModel()
                    },
                    bind: {
                        store: '{StoreAuthAttachment}'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnClose',
                                    text: 'Close',
                                    handler: 'btnCloseClick'
                                }
                            ]
                        }],

                    columns: [

                        {text: 'Job#', dataIndex: 'jobNum', flex: 1},
                        {text: 'Type', dataIndex: 'jobType', flex: 1},
                        {text: 'Description', dataIndex: 'DESCRIPTION', flex: 1},
                        {text: 'Date', dataIndex: 'sysDate', format: 'm/d/Y', xtype: 'datecolumn', flex: 1}

                    ]
                }]
        });
        view.add(win);
        win.show();

    },


    btnAuthNotesClick: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();

        win = Ext.create('Ext.window.Window', {
            title: 'Notes',
            itemId: 'winAuthNotes',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            height: 300,
            width: 900,
            items: [
                {
                    xtype: 'grid',
                    flex: 1,
                    viewModel: {
                        parent: me.getViewModel()
                    },
                    bind: {
                        store: '{StoreAuthNotes}'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                '->',
                                {
                                    xtype: 'button',
                                    itemId: 'btnClose',
                                    text: 'Close',
                                    handler: 'btnCloseClick'
                                }
                            ]
                        }],

                    columns: [

                        {
                            text: 'Create Date', dataIndex: 'CreateDate', renderer: function (value, field) {
                            return Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                        }, xtype: 'datecolumn'
                        },
                        {
                            text: 'Time', dataIndex: 'CreateDateTime', renderer: function (value, field) {
                            return Atlas.common.Util.setTimeformatWithAMPM(value);
                        }, xtype: 'datecolumn'
                        },
                        {
                            xtype: 'templatecolumn',
                            text: 'Subject',
                            shrinkWrap: true,
                            width: 550,
                            cellWrap: true,
                            variablerowHeight: true,
                            tpl: '<tpl for="."> {Subject} <br />{Note}</tpl>'
                        },


                        {text: 'Created by', dataIndex: 'CreateUser', flex: 1}

                    ]
                }]
        });
        view.add(win);
        win.show();

    },
    btnCloseClick: function () {
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    }

});
