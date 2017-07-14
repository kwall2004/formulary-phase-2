
Ext.define('Atlas.macprice.view.CustomPriceGeneralInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CustomPriceGeneralInfoController',
    priceInfoForm: null,
    customPriceListId: null,
    customPriceListVersion: null,
    customPriceName: null,

    init: function(){
        this.priceInfoForm = this.getView().down('#PriceInfo');
        this.EnableDisablePriceGeneral('A');
    },

    listen: {
        controller: {
            'CustomPriceHeaderController': {
                CustomPriceListChange: 'GetSelectedPriceList'
            }
        }
    },

    GetSelectedPriceList: function(record) {
        if(record == null || record == 'undefined')
        {
            this.customPriceListId = null;
            this.customPriceListVersion = null;
            this.customPriceName = null;
            this.SetControlValues(null);
        }
        else {
            this.customPriceListId = record.get("customPriceListId");
            this.customPriceListVersion = record.get("customPriceListVersion");
            this.customPriceName = record.get("customPriceName");
            this.EnableDisablePriceGeneral(record.get("priceStatus"));
            this.SetControlValues(record);
        }
    },

    EnableDisablePriceGeneral: function(ListStatus) {
        if (ListStatus == 'A')
        {
            this.priceInfoForm.down('#CustomPriceListName').setReadOnly(true);
            this.priceInfoForm.down('#ListStatus').setReadOnly(true);
            this.getView().down('#btnSave').disable(true);
        }
        else
        {
            this.priceInfoForm.down('#CustomPriceListName').setReadOnly(false);
            this.priceInfoForm.down('#ListStatus').setReadOnly(false);
            this.getView().down('#btnSave').enable(true);
        }
    },

    onNewCustomPrice: function (selection) {
        this.customPriceListId = null;
        this.getView().down('#btnSave').enable(true);
        this.EnableDisableFields();
    },

    onNewCustomPriceVersion: function (selection) {
        var me = this;

        if(this.customPriceListId == null)
        {
            Ext.Msg.alert('Custom Price Management', 'Please select a price list to create new version.');
            return;
        }

        Ext.MessageBox.confirm('Confirmation', 'Are you sure you want to create new version for price list - ' + me.customPriceName + '?', confirmFunction);

        function confirmFunction (btn)
        {
            if (btn == 'yes') {
                var saveData = '',
                    saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

                saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/newcustompricelistversion/update', null, [true], {
                        pCustomPriceListId: me.customPriceListId,
                        pCustomPriceListVerison: me.customPriceListVersion
                    },
                    saveAction, ['pNewCustomPriceListVerison']);

                if (saveData.pNewCustomPriceListVerison != "0") {
                    Ext.Msg.alert('Custom Price Management', 'New Custom Price Version Created.');
                    me.fireEvent('ReloadCustomPriceList', null);
                }
                else {
                    Ext.Msg.alert('Custom Price Management', saveData.message);
                }

            }
        }
    },

    onSavePriceList: function (selection) {

        var me = this,
            priceListName = this.priceInfoForm.down('#CustomPriceListName').getValue(),
            saveData = '',
            saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        if (priceListName == null || priceListName == '')
        {
            Ext.Msg.alert('Custom Price Management', 'Please enter price list name.');
            return;
        }

        if (this.customPriceListId == null)
        {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/newcustompricelist/update', null, [true], {
                    pCustomPriceName: priceListName
                },
                saveAction, ['pCustomPriceListId']);

            if (saveData.pCustomPriceListId != "0") {
                Ext.Msg.alert('Custom Price Management', 'New Custom Price List Created.');
                me.fireEvent('ReloadCustomPriceList', null);
            }
            else {
                Ext.Msg.alert('Custom Price Management', saveData.message);
            }
        }
        else
        {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/custompricelistname/update', null, [true], {
                    pCustomPriceListId: this.customPriceListId,
                    pCustomPriceListVerison: this.customPriceListVersion,
                    pCustomPriceName: priceListName
                },
                saveAction, null);

            if (saveData.code == "0") {
                Ext.Msg.alert('Custom Price Management', 'Custom Price List Name Updated.');
                me.fireEvent('ReloadCustomPriceList', null);
            }
            else {
                Ext.Msg.alert('Custom Price Management', saveData.message);
            }

        }
    },

    onStatusUpdate: function (selection) {

        var me=this,
            vm = me.getViewModel(),
            win;

        if (selection.value != 'A')
        {
            return;
        }

        win = Ext.create('Ext.window.Window', {
            title: 'Change Status',
            itemId: 'winChangeStatus',
            height: 130,
            width: 600,
            modal : true,
            listeners: {
                'close': 'onStatusWindowClose'
            },
            controller: {
                parent: me
            },
            viewModel: {
                parent: vm
            },
            dockedItems:[{
                xtype:'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        text:'OK',
                        handler: 'onStatusSave',
                        scope: me
                    },
                    {
                        text:'Reset',
                        handler: 'onStatusCancel',
                        scope: me
                    }
                ]
            }],
            layout: 'fit',
            bodyPadding: '10',
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    itemId: 'StatusForm',
                    items:[
                        {
                            xtype: 'datefield',
                            itemId:'EffDate',
                            name:'EffDate',
                            fieldLabel: 'Effective Date',
                            allowBlank: false,
                            emptyText: '[mm/dd/yyyy]',
                            format: 'm/d/Y',
                            listeners: {
                                select: {
                                    fn: 'validateDateRange',
                                    scope: me
                                },
                                focusleave: {
                                    fn: 'validateDateRange',
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            itemId:'TermDate',
                            name:'TermDate',
                            fieldLabel: 'Termination Date',
                            format: 'm/d/Y',
                            listeners: {
                                select: {
                                    fn: 'validateDateRange',
                                    scope: me
                                },
                                focusleave: {
                                    fn: 'validateDateRange',
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.getView().add(win);
        win.setTitle('Change Status - ' + this.customPriceName + ' - Version: ' + this.customPriceListVersion);
        win.show();
    },

    validateDateRange: function (datefield , isValid) {
        var view = this.getView(),
            winDtFrom = view.down('#EffDate'),
            winDtTo = view.down('#TermDate'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();

        if (datefield.itemId == 'EffDate') {
            if (winDtFromValue != '' && winDtFromValue != null) {
                winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
            }
        }
        else {
            if (winDtToValue != '' && winDtToValue != null) {
                winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
            }
        }
    },

    onStatusWindowClose: function () {
        this.priceInfoForm.down('#ListStatus').setValue('D');
    },

    onStatusSave: function () {

        var me        = this,
            winAction = this.getView().down('#winChangeStatus'),
            statusForm = winAction.down('#StatusForm'),
            effDate    = statusForm.down('#EffDate').getRawValue(),
            termDate   = statusForm.down('#TermDate').getRawValue();

        if (statusForm.isValid())
        {
            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

            var saveData = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/custompricestatus/update', null, [true], {
                    pCustomPriceListId: this.customPriceListId,
                    pCustomPriceListVerison: this.customPriceListVersion,
                    pEffectiveDate: effDate,
                    pTerminationDate: termDate,
                    pStatus: 'A'
                },
                saveAction, null);

            if (saveData.code == "0") {
                Ext.Msg.alert('Custom Price Management', this.customPriceName + ' Version ' + this.customPriceListVersion + ' is Active.');
                winAction.destroy();
                me.fireEvent('ReloadCustomPriceList', null);
            }
            else {
                Ext.Msg.alert('Custom Price Management', saveData.message);
            }
        }
        else {
            Ext.Msg.alert('Custom Price Management', 'Please correct form errors.');
        }

    },

    onStatusCancel: function () {
        var me        = this,
            winAction = this.getView().down('#winChangeStatus');

        winAction.down('#EffDate').setValue('');
        winAction.down('#TermDate').setValue('');
    },

    EnableDisableFields: function() {
        this.priceInfoForm.down('#CustomPriceListName').setReadOnly(false);
        this.priceInfoForm.down('#ListStatus').setReadOnly(true);

        this.SetControlValues(null);
    },

    SetControlValues: function(record) {
        if(record == null)
        {
            this.priceInfoForm.down('#CustomPriceListName').setValue('');
            this.priceInfoForm.down('#Version').setValue('');
            this.priceInfoForm.down('#ListStatus').setValue('');
            this.priceInfoForm.down('#EffectiveDate').setValue('');
            this.priceInfoForm.down('#TerminationDate').setValue('');
            this.priceInfoForm.down('#UpdatedDate').setValue('');
            this.priceInfoForm.down('#UpdateddBy').setValue('');
        }
        else
        {
            this.priceInfoForm.loadRecord(record);
        }
    }

});
