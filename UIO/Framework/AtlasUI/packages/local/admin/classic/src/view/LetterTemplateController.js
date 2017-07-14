/**
 * Created by d4662 on 11/30/2016.
 */
Ext.define('Atlas.admin.view.LetterTemplateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-lettertemplateController',

    /**
     * Called when the view is created
     */
    init: function() {
        var vm = this.getViewModel();
        var view = this.getView();
        view.recordFunction = '';
        var grid = view.lookupReference('mainGrid');
        //var grid=this.getView();
        var planGroupHierarchyExt = vm.getStore('planGroupHierarchyExt');
        planGroupHierarchyExt.getProxy().setExtraParam('pWhere','');
        planGroupHierarchyExt.getProxy().setExtraParam('pBatchSize',0);
        planGroupHierarchyExt.load({
            scope:this,
            callback: function (recordInfo, operation, success) {

                var lettertemplate = vm.getStore('lettertemplate');
                lettertemplate.load();
            }

        });
        /*planGroupHierarchyExt.on('load', function(){
            var record = grid.getSelection()[0];
            if (record)
            {
                console.log(record.get('PlanGroupAccess'));
                view.lookupReference('pghtagfield').setValue(record.get('PlanGroupAccess'));
            }
        })*/
        grid.on("itemclick", 'gridItemSelected', this);

    },
    getPlanGroupHierarchText:function(value,meta,record){

        if (value=='')
            return '';
        var vm= this.getViewModel();
        var planGroupHierarchyExt = vm.getStore('planGroupHierarchyExt');
        var listArray = new Array();
        var listArray = value.split(',');
        var pgh = '';
        if (listArray.length==0){
            listArray[0]=value;
        }
        for (var i=0;i<listArray.length;i++)
        {
            var r = planGroupHierarchyExt.findRecord('SystemID',listArray[i]);
            pgh += r.get('PGH');
            if (i<listArray.length-1){
                pgh+=',';
            }
        }
        return pgh;


    },
    gridItemSelected: function (grid, record,item,e,eopts) {
       this.updateTemplateDetails(record);
        this.setSelectedState();
        //this.getView().lookupReference('editButton').setDisabled(false);
    },
    updateTemplateDetails: function (record) {
        var view = this.getView();
        view.lookupReference('ReasonText').setValue(record.get('Reason'));
        view.lookupReference('pghtagfield').setValue(record.get('PlanGroupAccess').split(','));
        view.lookupReference('LanguageText').setValue(record.get('LANGUAGE'));
        //this.setInitalDetailsState();
        //LanguageText

    },
    onSelectPGHTagField:function(tagfield, record){
        //debugger;
        //console.log(tagfield.getValue());
    },
    onEdit:function(btn){
        this.setEditState();
    },
    setInitalDetailsState:function()
    {
        var view = this.getView();
        view.lookupReference('createButton').setDisabled(false);
        view.lookupReference('editButton').setDisabled(true);
        view.lookupReference('saveButton').setDisabled(true);
        view.lookupReference('cancelButton').setDisabled(true);
        view.lookupReference('deleteButton').setDisabled(true);
        view.lookupReference('pghtagfield').setDisabled(true);
        view.lookupReference('ReasonText').setDisabled(true);
        view.lookupReference('LanguageText').setDisabled(true);
    },
    setEditState:function()
    {
        var view = this.getView();
        view.lookupReference('createButton').setDisabled(true);
        view.lookupReference('editButton').setDisabled(true);
        view.lookupReference('saveButton').setDisabled(false);
        view.lookupReference('cancelButton').setDisabled(false);
        view.lookupReference('deleteButton').setDisabled(true);
        view.lookupReference('pghtagfield').setDisabled(false);
        view.lookupReference('ReasonText').setDisabled(false);
        view.lookupReference('LanguageText').setDisabled(false);
        this.getView().recordFunction = 'U';
    },
    setSelectedState:function(){
        var view = this.getView();
        view.lookupReference('createButton').setDisabled(false);
        view.lookupReference('editButton').setDisabled(false);
        view.lookupReference('saveButton').setDisabled(true);
        view.lookupReference('cancelButton').setDisabled(true);
        view.lookupReference('deleteButton').setDisabled(false);
        view.lookupReference('pghtagfield').setDisabled(true);
        view.lookupReference('ReasonText').setDisabled(true);
        view.lookupReference('LanguageText').setDisabled(true);
    },
    onCancel:function(btn){
        var record = this.getView().lookupReference('mainGrid').getSelection()[0];
        if (record){

            this.updateTemplateDetails(record);
            this.setSelectedState();
        }
        else {
            this.clearDetails();
            this.setInitalDetailsState();
        }
        this.getView().recordFunction = '';
    },
    clearDetails:function () {
        var view = this.getView();
        view.lookupReference('ReasonText').setValue('');
        view.lookupReference('pghtagfield').setValue('');
        view.lookupReference('LanguageText').setValue('');
    },
    onCreate:function(){

        this.clearDetails();
        this.setEditState();
        this.getView().recordFunction = 'A';

    },
    onDelete:function(){
        this.getView().recordFunction = 'D';
        var store = this.getViewModel().get('lettertemplate');
        var record = this.getView().lookupReference('mainGrid').getSelection()[0];
        var con = this;
        Ext.Msg.confirm('Delete Letter Template', 'Are you sure you wish to delete this selected record?',function (btn) {
            if (btn == 'no') {
                return;
            }
            else{
                store.remove(record);
                con.onSave();
            }
        });


    },
    onSave:function(){
        var me = this,
            vm = this.getViewModel(),
            view = this.getView();
        var form = view.lookupReference('letterForm');
        if (!form.isValid())
            return;
        else {


            var store = this.getViewModel().getStore('lettertemplate');
            var selectedSystemId = '';
            var record = '';
            if (this.getView().recordFunction == 'A') {

                var newList = Ext.create('Atlas.admin.model.LetterTemplate');
                newList.set('PlanGroupAccess', view.lookupReference('pghtagfield').getValue());
                newList.set('LANGUAGE', view.lookupReference('LanguageText').getValue());
                newList.set('PlanGroupAccessDesc', view.lookupReference('pghtagfield').getRawValue());
                newList.set('Reason', view.lookupReference('ReasonText').getValue());
                newList.set('SystemID', 0);
                store.insert(0, newList);
            }
            else if (this.getView().recordFunction == 'U') {
                selectedSystemId = view.lookupReference('mainGrid').getSelection()[0].data.SystemID;
                record = view.lookupReference('mainGrid').getSelection()[0];
                record.set('PlanGroupAccess', view.lookupReference('pghtagfield').getValue());
                record.set('LANGUAGE', view.lookupReference('LanguageText').getValue());
                //record.set('PlanGroupAccessDesc',view.lookupReference('pghtagfield').getRawValue());
                record.set('Reason', view.lookupReference('ReasonText').getValue());
            }
            var saveAction = [{
                "Create": {"key": 'RecordAction', "value": 'A'},
                "Update": {"key": 'RecordAction', "value": 'U'},
                "Delete": {"key": 'RecordAction', "value": 'D'}
            }];
            var testReturn = Atlas.common.utility.Utilities.saveData([store], 'shared/rx/lettertemplatelanguage/update', 'ttLetterTempLanguage', [true], null,
                saveAction, ['pSystemID']);
            if(testReturn){
                store.load({
                    callback: function(){
                        var selIndex = me.lookupReference('mainGrid').getStore().find('SystemID',testReturn.pSystemID );
                        if(selIndex != -1){
                            me.lookupReference('mainGrid').getSelectionModel().select(selIndex);
                            me.lookupReference('mainGrid').fireEvent('itemclick','', me.lookupReference('mainGrid').getStore().getAt(selIndex));
                        }
                    }
                });
            }

            this.clearDetails();
            this.setInitalDetailsState();
            if (this.getView().recordFunction == 'A')
                Ext.Msg.alert('Letter Templates', 'Record added Successfully.');
            else if (this.getView().recordFunction == 'U')
                Ext.Msg.alert('Letter Templates', 'Record updated Successfully.');
            else if (this.getView().recordFunction == 'D')
                Ext.Msg.alert('Letter Templates', 'Record deleted Successfully.');
        }

    }
});