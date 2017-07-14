/**
 * Created by s6627 on 11/26/2016.
 */
Ext.define('Atlas.common.view.sharedviews.DrugAllergiesController',
    {
        extend: 'Ext.app.ViewController',
        alias: 'controller.DrugAllergiesController',
        listen: {
            controller: {
                '*': {
                    LoadAllergiesData: 'LoadAllergiesData'
                }
            }
        },
        init: function () {
            var view = this.getView();
            var recpntId;
            if (view.up().down('#hdnRcpntId') != null)
            {
                recpntId = view.up().down('#hdnRcpntId').getValue();
                view.down('#hiddenKey').setValue(recpntId);
            }
            else if (view.up().down('#hiddenRecipientID') != null)
            {
                recpntId = view.up().down('#hiddenRecipientID').getValue();
                view.down('#hiddenKey').setValue(recpntId);
            }
            else
            {
                recpntId = view.up().down('#btnMRxId').getText();
                view.down('#hiddenKey').setValue(recpntId);
            }
            if (recpntId != '' )
            {
                view.down('#pnlAllergies').setDisabled(false);
                this.LoadAllergies();
            }
            else {
                view.down('#pnlAllergies').setDisabled(true);
                Ext.Msg.alert('PBM', 'No Recipient Found');
            }

        },
        onLeaveDateRange: function(myDatefield){
            Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
        },
        gridDrugAllergies_beforeedit: function (dv, grid) {
            if (dv.grid.plugins[0].editing) {
                Ext.Msg.alert('Message', 'Please complete edit current record before proceed.');
                return false;
            }
        },
        LoadAllergiesData:function()
        {
            var view = this.getView();
            var recpntId;
            if (view.up().down('#hdnRcpntId') != null)
            {
                recpntId = view.up().down('#hdnRcpntId').getValue();
                view.down('#hiddenKey').setValue(recpntId);
            }
            else if (view.up().down('#hiddenRecipientID') != null)
            {
                recpntId = view.up().down('#hiddenRecipientID').getValue();
                view.down('#hiddenKey').setValue(recpntId);
            }
            else
            {
                recpntId = view.up().down('#btnMRxId').getText();
                view.down('#hiddenKey').setValue(recpntId);
            }
            if (recpntId != '' )
            {
                view.down('#pnlAllergies').setDisabled(false);
                this.LoadAllergies();
            }
            else {
                view.down('#pnlAllergies').setDisabled(true);
                Ext.Msg.alert('PBM', 'No Recipient Found');
            }
        },
        LoadAllergies:function()
        {
            var view = this.getView();
            var vm = this.getViewModel();
            var pRecipientId = view.down('#hiddenKey').getValue();
            var store= vm.getStore('StoreAllergies');
            store.getProxy().setExtraParam('pRecipientId',pRecipientId);
            store.load();
        },
        cbxAllergen_Select: function (combo, record) {
            var view = this.getView();
            var grid = view.down('#gridDrugAllergies');
            var s = grid.getSelectionModel().getSelected().items;
            var gridrecord = grid.getSelectionModel().getSelected();
            for (var i = 0, r; r = s[i]; i++) {
                r.data.DAM_CONCEPT_ID = record.data.DAM_CONCEPT_ID;
                r.data.DAM_CONCEPT_ID_TYP = record.data.DAM_CONCEPT_ID_TYP;
                r.data.DAM_CONCEPT_ID_TYP_DESC = record.data.DAM_CONCEPT_ID_TYP_DESC;
            }
            gridrecord.items[0].set('DAM_CONCEPT_ID_TYP_DESC', record.data.DAM_CONCEPT_ID_TYP_DESC);
            var DAM_CONCEPT_ID_TYP_DESC =  grid.columns[2].getEditor(record.data);
            DAM_CONCEPT_ID_TYP_DESC.setValue(record.data.DAM_CONCEPT_ID_TYP_DESC);
            grid.getView().refresh();

        },
        btnSaveClick: function () {
            var viewModel = this.getViewModel();
            var view = this.getView();
            var grid = view.down('#gridDrugAllergies');
            var store = grid.getStore();
            var dirty = false;
            if (!grid.plugins[0].editing) {

                saveAction = [{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];
                var listDetail;
                var extraParameters = {
                    'pRecipientId': view.down('#hiddenKey').getValue()
                }
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([store], 'member/rx/memberallergies/update', 'ttMemberAllergies', [true], extraParameters,
                    saveAction, null);
                this.LoadAllergies();
                if(submitJobReturn.code==0) {
                    Ext.Msg.alert("Success", 'Allergen(s) saved successfully');
                }
                else if(submitJobReturn.code==1) {
                    Ext.Msg.alert("Success", 'Allergen(s) saved successfully. Duplicate Allergen(s) were ignored.');
                }
            }
            else {
                Ext.Msg.alert('Message', 'Please complete edit current record before proceed.')
            }
        },
        btnAddClick:function()
        {
            var view=this.getView();
            var viewModel=this.getViewModel();
            var grid =  view.down('#gridDrugAllergies');
            var store=grid.getStore();
            if(!grid.plugins[0].editing) {
                store.insert(0, {
                    DAM_CONCEPT_ID_TYP: '',
                    DAM_CONCEPT_ID_TYP_DESC: '',
                    systemID:'0'
                });
                grid.plugins[0].startEdit(0, 0)
                grid.getView().refresh();
            }
            else {
                Ext.Msg.alert('Message','Please complete edit current record before proceed.');
            }
        },
        btnRemoveClick:function()
        {
            var view=this.getView();
            var grid =  view.down('#gridDrugAllergies');
            if (grid.getSelectionModel().getSelected().items.length == 0) {
                Ext.Msg.alert("PBM", "Please select a row");

            }
            else {
                var store = grid.getStore();
                store.remove(grid.getSelectionModel().getSelection()[0]);
            }
        }
    })