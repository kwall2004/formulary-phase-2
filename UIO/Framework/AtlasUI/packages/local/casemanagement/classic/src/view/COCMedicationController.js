/**
 * Created by mkorivi on 11/9/2016.
 */
Ext.define('Atlas.casemanagement.view.COCMedicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cocmedicationController',
    listen: {
        controller: {
            'cocdetailscontroller': {
                GetCOCMedications: 'GetCOCMedications'
            }
        }
    },
    init: function () {
        this.GetCOCMedications();
    },
    btnAddMedicationClick: function () {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();

        vm.set('action', 'A');
        this.MedicationProfileWindow();
    },
    MedicationProfileWindow: function () {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel(),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Add Medication Profile',
            itemId:'popupAddMedication',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'

            },
            viewModel: {
                parent: me.getViewModel()
            },
            xtype: 'MedicationProfile',
            height: 400,
            width: 900,
//            controller: me,
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa fa-save',
                            handler: 'SaveCOCMedication',
                            scope: this
                        }
                        , {
                            xtype: 'button', text: 'Close', iconCls: 'fa fa-remove', handler: 'btn_AddMedCancel'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    autoScroll: true,
                    items: [{
                        xtype: 'container',
                        id: 'container1',
                        defaults: {
                            labelWidth: 195,
                            flex: 1
                        },
                        items: [
                            // leftpanel content ---------------------------------------------------- //
                            {
                                xtype: 'combobox',
                                name: 'cbxDataSource',
                                itemId: 'cbxDataSource',
                                fieldLabel: 'Data Source',
                                displayField: 'name',
                                valueField: 'value',
                                bind: {
                                    store: '{StoreDataSource}'
                                }
                            },
                            {xtype: 'combobox', name: 'cbxType', id: 'cbxType', fieldLabel: 'Type', displayField: 'name',
                                valueField: 'value', bind: {store: '{StoreType}'}},
                            {
                                xtype: 'drugtypeahead',
                                itemId: 'cbxMedication',
                                fieldLabel: 'NDC/LN',
                                displayField: 'LN',
                                valueField: 'LN',
                                typeAhead: false,
                                loadingText: 'Searching...',
                                emptyText: '[e.g. Nexium]',
                                allowBlank: false

                            },
                            {xtype: 'textfield', name: 'txtDosage', id: 'txtDosage', fieldLabel: 'Dosage'},
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Start Date',
                                itemId: 'dtStartDate',
                                emptyText: '[mm/dd/yyyy]',
                                format: 'm/d/Y'

                            },
                            {xtype: 'datefield', fieldLabel: 'End Date', itemId: 'dtEndDate', emptyText: '[mm/dd/yyyy]',format: 'm/d/Y'}

                        ]
                    },

                        { //start right panel -----------------------------------------------------------------------------------------------------
                            xtype: 'container',
                            id: 'container',

                            defaults: {
                                labelWidth: 195,
                                flex: 1
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    name: 'cbxFilled',
                                    id: 'cbxFilled',
                                    fieldLabel: 'Filled Medication',
                                    bind:{
                                        store: '{StoreLogical}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value'

                                },
                                {
                                    xtype: 'combobox',
                                    name: 'cbxSamples',
                                    id: 'cbxSamples',
                                    fieldLabel: 'Received Samples',
                                    bind:{
                                        store: '{StoreLogical}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value'


                                },
                                {
                                    xtype: 'combobox',
                                    name: 'cbxKnowDrugName',
                                    id: 'cbxKnowDrugName',
                                    fieldLabel: 'Knows Drug Name',
                                    bind:{
                                        store: '{StoreLogical}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'cbxKnowFrequency',
                                    id: 'cbxKnowFrequency',
                                    fieldLabel: 'Knows Frequency',
                                    bind:{
                                        store: '{StoreLogical}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'cbxKnowReasonToTake',
                                    id: 'cbxKnowReasonToTake',
                                    fieldLabel: 'Knows Reason To Take',
                                    bind:{
                                        store: '{StoreLogical}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'cbxContinueAtHome',
                                    id: 'cbxContinueAtHome',
                                    fieldLabel: 'Continue at Home/SNF',
                                    bind:{
                                        store: '{StoreLogical}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value'
                                }


                            ]

                        }]
                }


            ]
        });
        this.getView().add(win);
        this.getView().down('#cbxMedication').focus(true);
        win.show();

    },
    btnAddFromClaimHistoryClick: function () {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();


        win = Ext.create('Ext.window.Window', {
            title: 'Claims Search',
            itemId: 'winClaimsSearch',
            modal: true,
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            viewModel: {
                parent: me.getViewModel()
            },
            itemId: 'COCClaimsSearch',
            xtype: 'COCClaimsSearch',
            height: 500,
            width: 900,
            items: [
                {
                    region: 'north',
                    xtype: 'form',
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
                                    xtype: 'drugtypeahead',
                                    itemId: 'cbxMemberId',
                                    fieldLabel: 'Member Id',
                                    displayField: 'Membername',
                                    valueField: 'MemberID',
                                    typeAhead: false,
                                    loadingText: 'Searching...',
                                    emptyText: '0026165506',
                                    listWidth: '500',
                                    diabled: true
                                },
                                {
                                    xtype: 'drugtypeahead',
                                    itemId: 'cbxNDC',
                                    fieldLabel: 'NDC/LN',
                                    displayField: 'LN',
                                    valueField: 'NDC',
                                    typeAhead: false,
                                    loadingText: 'Searching...',
                                    emptyText: '[e.g. Nexium]',
                                    forceSelection: false,
                                    listWidth: '500'
                                },

                                {
                                    xtype: 'drugtypeahead',
                                    itemId: 'cbxGCN',
                                    fieldLabel: 'GCN',
                                    displayField: 'GCN_SEQNO',
                                    valueField: 'GCN_SEQNO',
                                    typeAhead: false,
                                    loadingText: 'Searching...',
                                    emptyText: '[e.g 4169]',
                                    forceSelection: false,
                                    listWidth: '500'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Start Date',
                                    itemId: 'dtStartDate',
                                    emptyText: '[mm/dd/yyyy]'
                                },
                                {

                                    xtype: 'datefield',
                                    fieldLabel: 'End Date',
                                    itemId: 'dtEndDate',
                                    emptyText: '[mm/dd/yyyy]'
                                }
                            ]
                        }
                    ],

                    buttons: [
                        {


                            text: 'Search',
                            reference: 'search',
                            handler: 'onSearchClick'
                        },
                        {

                            text: 'Reset',
                            handler: 'onReset'
                        }
                    ]

                },


                {
                    region: 'center',
                    xtype: 'grid',
                    itemId: 'claimsSearchgrid',
                    bind: '{StoreClaimsSearch}',

                    selModel: {
                        selType: 'checkboxmodel',
                        checkOnly: true
                    },
                    plugins: [
                        {
                            ptype: 'gridexporter'
                        }
                    ], flex: 2,
                    columns: {
                        items: [
                            {

                                text: 'Claim #',
                                dataIndex: 'claimID'
                            },
                            {
                                text: 'Member Name',
                                dataIndex: 'memberName'

                            },
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                items: [{
                                    // Use a URL in the icon config
                                    iconCls: 'x-fa fa-plus-square'
                                    // Use a URL in the icon config

                                    //  handler: 'btnDrugDetails_CLick'

                                }]

                            },


                            {
                                text: 'NDC',
                                dataIndex: 'ndc'

                            },
                            {
                                text: 'Medication',
                                dataIndex: 'medication'

                            },
                            {
                                text: 'ETC',
                                dataIndex: 'ETCName'

                            },
                            {
                                text: 'Service Date',
                                dataIndex: 'svcdate'

                            },
                            {
                                text: 'Status',
                                dataIndex: 'stat'

                            },
                            {
                                text: 'Rx Num',
                                dataIndex: 'rxnum'

                            },
                            {
                                text: 'Pharmacy Name',
                                dataIndex: 'rxname'

                            },
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                items: [{
                                    // Use a URL in the icon config
                                    iconCls: 'x-fa fa-plus-square'
                                    // Use a URL in the icon config

                                    //  handler: 'btnDrugDetails_CLick'

                                }]

                            },

                            {
                                text: 'Prescriber NPI',
                                dataIndex: 'npi'

                            },
                            {
                                text: 'Prescriber Name',
                                dataIndex: 'drname'
                            },
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                items: [{
                                    // Use a URL in the icon config
                                    iconCls: 'x-fa fa-plus-square'
                                    // Use a URL in the icon config

                                    //  handler: 'btnDrugDetails_CLick'

                                }]

                            }]
                    },
                    bbar: [
                        {

                            xtype: 'pagingtoolbar',
                            bind: '{StoreClaimsSearch}',
                            displayInfo: true,
                            hideRefresh: true


                        },


                        '->',
                        {


                            xtype: 'button',
                            text: 'Add to Medication Profile',
                            iconCls: 'fa fa-save',
                            handler: 'MedicationFromClaims',
                            scope: this
                        }
                        , {
                            xtype: 'button', text: 'Close', iconCls: 'fa fa-remove',handler: 'btn_AddMedCancel'
                        }
                    ]
                }
            ]

        });

        this.getView().add(win);
        this.getView().down('#cbxMemberId').setDisabled(true);
        win.show();

    },
    btn_AddMedCancel: function(bt)
    {
        bt.up('window').close();
    },
    MedicationFromClaims: function()
    {

        var  selectedRecord = [],
            me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            selectionModel = view.down('#claimsSearchgrid').getSelectionModel().getSelection();
        var storeGrid = view,
            store = vm.getStore('StoreMedications');
        Ext.each(selectionModel, function (item) {
            selectedRecord.push(item.data);
        });
        var itemp = 5000;
        for (var i = 0; i < selectedRecord.length; i++) {

            store.insert(0,{
                "seqNum": itemp,
                "dataSource": "PP",
                "medType": "Rx",
                "medFilled": "Yes",
                "samples": "No",
                "medName": selectedRecord[i].medication,
                "medDosage": "",
                "startDate": "",
                "endDate": "",
                "knowName": "Yes",
                "knowFrequency": "Yes",
                "knowReason": "Yes",
                "cont": "",
                "medArea": "06"

            });
            itemp = itemp + 10;
        }

        for (var i = 0; i < store.data.length; i++) {
            store.data.items[i].dirty = true;
        }

        var saveAction = [{
            "Create": {"key": 'Action', "value": 'Add'},

            "Update": {"key": 'Action', "value": 'Update'},
            "Delete": {"key": 'Action', "value": 'Delete'}
        }];

        var extraParameters = {
            "pMode": 'mrx',
            "pUsername": Atlas.user.un,
            "pTokenId": '',
            "pDeviceId": '',
            "pRecipientId": vm.get('MCSRecipientId'),
            "pCaseNumber": vm.get('seqNum'),
            'userState': vm.get('state')
        }

        var saveMedData = Atlas.common.utility.Utilities.saveData([store], 'vendor/hp/cmmedicationsapi/update', 'ttMedication', [true], extraParameters, saveAction
            , null);
        if (saveMedData.code == 0) {
            me.GetCOCMedications();
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }


        }


    },

    onSearchClick : function()
    {

        var view = this.getView();
        var vm = this.getViewModel(),
            searchFilter = "";
        if (vm.get('memberID') != null && vm.get('memberID')!= '') {

            searchFilter = searchFilter + " insuredID = '" + vm.get('memberID') + "'";

        }
        if (view.down('#cbxNDC').getValue() != '' && view.down('#cbxNDC').getValue() != null)
        {
            if (searchFilter == "")
                searchFilter = "NDC = '" + view.down('#cbxNDC').getValue()   ;
            else
                searchFilter = searchFilter + " And NDC = '" + view.down('#cbxNDC').getValue()   ;
        }

        if (view.down('#dtStartDate').getValue() != null && view.down('#dtStartDate').getValue() != '') {
            if (searchFilter == "")
                searchFilter = "serviceDate >= '" +  view.down('#dtStartDate').getValue() ;
            else
                searchFilter =  searchFilter + " And serviceDate >= '" +  view.down('#dtStartDate').getValue() ;
        }
        if (view.down('#dtEndDate').getValue() != null && view.down('#dtEndDate').getValue() != '') {
            if (searchFilter == "")
                searchFilter = "serviceDate <= '" +  view.down('#dtEndDate').getValue() ;
            else
                searchFilter =  searchFilter + " And serviceDate <= '" +  view.down('#dtEndDate').getValue() ;
        }
        if (view.down('#cbxGCN').getValue() != null && view.down('#cbxGCN').getValue() != '') {
            if (searchFilter == "")
                searchFilter = "GCNSEQ = '" +  view.down('#cbxGCN').getValue() ;
            else
                searchFilter =  searchFilter + " And GCNSEQ = '" +  view.down('#cbxGCN').getValue() ;
        }
        var StoreClaimsSearch = vm.getStore('StoreClaimsSearch');
        StoreClaimsSearch.getProxy().setExtraParam('pWhere', searchFilter);
        StoreClaimsSearch.load();

    },



    GetCOCMedications : function()
    {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();
        var RecipientId = vm.get('MCSRecipientId'),
            CaseNumber = vm.get('seqNum'),
            state = vm.get('state'),
            caseStatus=vm.get('caseStatus');

        if (vm.get('MCSRecipientId') != '' && vm.get('MCSRecipientId') != '0'
            && vm.get('seqNum') != '' &&vm.get('seqNum') != ' 0')
        {
            var StoreMedications = vm.getStore('StoreMedications');
            StoreMedications.getProxy().setExtraParam('pRecipientID', RecipientId);
            StoreMedications.getProxy().setExtraParam('pCaseNumber', CaseNumber);
            StoreMedications.getProxy().setExtraParam('userState', state);
            StoreMedications.load();

        }

        Ext.defer(function () {
            if( me.getViewModel().get('caseStatus').toLowerCase()=='closed'){
                theView.down('#btnAddMedication').setDisabled(true);
                theView.down('#AddFromClaimHistory').setDisabled(true);
            }
            else{
                theView.down('#btnAddMedication').setDisabled(false);
                theView.down('#AddFromClaimHistory').setDisabled(false);
            }

        }, 1000);


    },
    btnExportClick:function() {
        var view=this.getView();
        var grid =  view.down('#grdCOCMedication');
        var store=grid.getStore();
        if(store.data.items.length>0) {
            Atlas.common.utility.Utilities.exportToExcel(store);
        }

    },
    SaveCOCMedication : function ()
    {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            state = vm.get('state'),
            action = vm.get('action'),
            rec = vm.get('record');
        var storeGrid = view,
            store = vm.getStore('StoreMedications');
        if(view.down('#cbxMedication').getValue()!=null && view.down('#cbxMedication').getValue()!='' ) {
            if (action == 'A') {

                store.insert(0, {
                    "seqNum": "0",
                    "dataSource": view.down('#cbxDataSource').getValue(),
                    "medType": view.down('#cbxType').getValue(),
                    "medFilled": view.down('#cbxFilled').getValue(),
                    "samples": view.down('#cbxSamples').getValue(),
                    "medName": view.down('#cbxMedication').getValue(),
                    "medDosage": view.down('#txtDosage').getValue(),
                    "startDate": view.down('#dtStartDate').getValue(),
                    "endDate": view.down('#dtEndDate').getValue(),
                    "knowName": view.down('#cbxKnowDrugName').getValue(),
                    "knowFrequency": view.down('#cbxKnowFrequency').getValue(),
                    "knowReason": view.down('#cbxKnowReasonToTake').getValue(),
                    "cont": view.down('#cbxContinueAtHome').getValue(),
                    "medArea": "06"

                });

            }
            else {
                for (var i = 0; i < store.data.length; i++) {
                    if (store.data.items[i].data.seqNum == rec.data.seqNum) {
                        //rec.set('seqNum',0)
                        rec.set('dataSource', view.down('#cbxDataSource').getValue());
                        rec.set('medType', view.down('#cbxType').getValue());
                        rec.set('medFilled', view.down('#cbxFilled').getValue());
                        rec.set('samples', view.down('#cbxSamples').getValue());
                        rec.set('medName', view.down('#cbxMedication').getValue());
                        rec.set('medDosage', view.down('#txtDosage').getValue());
                        rec.set('startDate', view.down('#dtStartDate').getValue());
                        rec.set('endDate', view.down('#dtEndDate').getValue());
                        rec.set('knowName', view.down('#cbxKnowDrugName').getValue());
                        rec.set('knowFrequency', view.down('#cbxKnowFrequency').getValue());
                        rec.set('knowReason', view.down('#cbxKnowReasonToTake').getValue());
                        rec.set('cont', view.down('#cbxContinueAtHome').getValue());
                        rec.set('medArea', "06");


                    }

                }
            }
            for (var i = 0; i < store.data.length; i++) {
                store.data.items[i].dirty = true;
            }

            var saveAction = [{
                "Create": {"key": 'Action', "value": 'Add'},
                "Update": {"key": 'Action', "value": 'Update'},
                "Delete": {"key": 'Action', "value": 'Delete'}
            }];

            var extraParameters = {
                "pMode": 'mrx',
                "pUsername": Atlas.user.un,
                "pTokenId": '',
                "pDeviceId": '',
                "pRecipientId": vm.get('MCSRecipientId'),
                "pCaseNumber": vm.get('seqNum'),
                'userState': vm.get('state')
            }

            var saveMedData = Atlas.common.utility.Utilities.saveData([store], 'vendor/hp/cmmedicationsapi/update', 'ttMedication', [true], extraParameters, saveAction
                , null);
            if (saveMedData.code == 0) {
                view.down('#popupAddMedication').close();
                this.GetCOCMedications();

            }
        }
        else{
            view.down('#cbxMedication').focus(true);
        }


    },
    SetCtrlValues: function()
    {

        var view = this.getView(),
            vm = this.getViewModel();
        var rec =  vm.get('record');
        view.down('#cbxDataSource').setValue(rec.data.dataSource);
        view.down('#cbxType').setValue(rec.data.medType);
        view.down('#cbxFilled').setValue(rec.data.medFilled);
        view.down('#cbxSamples').setValue(rec.data.samples);
        view.down('#cbxMedication').setValue(rec.data.medName);
        view.down('#txtDosage').setValue(rec.data.medDosage);
        view.down('#dtStartDate').setValue(rec.data.startdate);
        view.down('#dtEndDate').setValue(rec.data.endDate);
        view.down('#cbxKnowDrugName').setValue(rec.data.knowName);
        view.down('#cbxKnowFrequency').setValue(rec.data.knowFrequency);
        view.down('#cbxKnowReasonToTake').setValue(rec.data.knowReason);
        view.down('#cbxContinueAtHome').setValue(rec.data.cont);


    },
    onRecordSelect: function (grid, rec) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel();

        vm.set('action' ,'U');
        vm.set('record', rec);

        this.MedicationProfileWindow();
        this.SetCtrlValues();
    }

});