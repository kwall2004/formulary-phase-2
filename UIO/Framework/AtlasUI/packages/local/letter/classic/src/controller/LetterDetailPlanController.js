/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: Controller for LetterDetailPlan.js
 **/
Ext.define('Atlas.letter.controller.LetterDetailPlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.letterdetailplanctrl',
    xtype: 'letterdetailplancontroller',

    init: function(){
        var me = this,
            grid = me.getView(),
            vm = me.getViewModel(),
            queryDBObj,
            queryDBObjList,
            pList,
            pListArray=[],
           letterdetailplanstore = me.getStore('letterdetailplandata'),
           ldpplangroupinfostore = me.getStore('lettertypes'),
           ldpquerydbstore = me.getStore('queryDB');

        letterdetailplanstore.load();
        ldpplangroupinfostore.load();
        ldpquerydbstore.load({
            failure: function (record, operation) {
                var obj = Ext.decode(operation.getResponse().responseText),
                    returnMsgStatus = obj.message[0].message;

                Ext.Msg.alert('Status', returnMsgStatus);
            },
            callback: function (record, operation, success) {
                queryDBObj = Ext.decode(operation.getResponse().responseText);
                queryDBObjList = queryDBObj.metadata;
                pList = queryDBObjList.split('|');

                for(var i in pList) {
                    pListArray.push({
                        ListValue: pList[i],
                        ListName: pList[i]
                    });
                }
                ldpquerydbstore.loadRawData(pListArray);
            }
        });

        grid.on('edit',function(editor,context){
            /*
             upon editing a row, the LetterNameID changes from an int to a string value; in turn,
             it needs to be reverted back to an int before checking if the record is dirty
              */
            var rec = context.record;
            rec.set('LetterNameID', parseInt(rec.get('LetterNameID')));

            if (rec.dirty) {
                /*
                once isNeedUpdate is created, the record will be dirty until the view is destroyed.
                The following will set isNeedUpdate to false if isNeedUpdate is the only modified
                field for the record.
                 */
                var objKeys = Object.keys(rec.modified);
                if ((objKeys.length === 1) && (objKeys[0] === 'isNeedUpdate')){
                    rec.set('isNeedUpdate', false);
                    return;
                }
                rec.set('isNeedUpdate', true);
            }
        });
        grid.on('canceledit',function(editor,context){
            if(context.record && context.record.crudState=='C')
            {

                var rec = grid.getSelection();
                letterdetailplanstore.remove(rec);
            }

        });
        grid.on('beforeedit',function(editor,context){

            // you need to load the store/typeahead with the value of the Plan Group Name
            var cbxPlanGroup = grid.down('[text = Plan Group Name]');
            var e=cbxPlanGroup.getEditor(),
            record = context.record;
            Ext.Function.defer(function () {
                Ext.callback('populateCbx', me, [e, record]);
            }, 200);
        });


    },
    populateCbx: function(cbx, record){
        var me = this,
            view = me.getView(),
            record = view.getSelection()[0];
        var store = cbx.getStore();
        var id = record.get('planGroupId'),
            desc = record.get('PlanDesc');
        store.getProxy().setExtraParam('pWhere',
            "wrdidx contains '" + desc + "'");
        store.load({
            callback: function (record, operation, success) {
                cbx.setValue(id);
            }
        });




    },
    onReject: function (btn) {
        var grid = this.getView();
        var rec = btn.up().getViewModel().data.record;
        var optionsStore = this.getViewModel().getStore('letterdetailplandata');
        if (rec.crudState=='C'){
            var plugins = this.getView().getPlugins(),
                rowEditor;
            for (var idx = 0, myLength = plugins.length; idx < myLength; idx++){
                if (plugins[idx].ptype === 'rowediting'){
                    rowEditor = plugins[idx];
                    break;
                }
            }
            rowEditor.disabled=true;
            optionsStore.remove(rec);
            rowEditor.disabled=false;
            return;

        }
        rec.reject();
        rec.set('isNeedUpdate', false);


    },
    onEdit: function(editor, context, eOpts){
        var rec = context.record;

        if (rec.get('signedBy') === null){
            rec.set('signedBy', '');
        }
    },
    onActionClick: function(button) {
        var me = this,
            grid = me.getView(),
            listStore = me.getStore('letterdetailplandata'),
            store = grid.getStore(),
            newRecord = Ext.create('Atlas.letter.model.LetterDetailPlanModel',
                                    {
                                        planGroupId  : '',
                                        LetterNameID: '' ,
                                        letterFrom: 'Plan',
                                        leftFooter: '',
                                        rightFooter: '',
                                        overrideSignedBy: false,
                                        signedBy: ''
                                    }),
            selectedRow = me.getView().getSelectionModel().getSelection();

        switch(button.text)
        {
            case 'Add':
                store.insert(0, newRecord);
                grid.getPlugin().startEdit(newRecord);
                break;
            case 'Save':
                me.updateStore();
                break;
            case 'Remove':
                listStore.remove(selectedRow);
                break;
        }
    },
    updateStore:function(){
        var me = this,
            saveAction = [{
                "Create": {"key": 'action', "value": 'Add'},
                "Update": {"key": 'action', "value": 'Update'},
                "Delete": {"key": 'action', "value": 'Delete'}
            }],
            listStore = me.getStore('letterdetailplandata'),
            returnInfo;

        returnInfo = Atlas.common.utility.Utilities.saveData([listStore],'shared/rx/planletterdetail/update','ttPlanLetterDetail' ,[true], '' ,
            saveAction, null );

        if(returnInfo.code == 0) {
            Ext.Msg.alert('STATUS', 'Record has been successfully saved');
            listStore.reload();
        }
        else if(returnInfo.message !== 'undefined' && returnInfo.message !== '') {
            Ext.Msg.alert('STATUS', returnInfo.message);
        }
    },

    displayPlanGroupName: function(value) {
        var me = this,
            myVM = me.getViewModel(),
            planGroupText = myVM.get('vmPlanGroupText'),
            letterDetailStore = me.getStore('letterdetailplandata').findRecord('planGroupId',value);

        if (value !== '') {
            if (letterDetailStore.data.PlanDesc) {
                return letterDetailStore.data.PlanDesc;
            }
            else if(planGroupText){
                return planGroupText;
            }
            else {
                return value;
            }
        }

        // Reset VM text to ensure it's not improperly used
        myVM.set('vmPlanGroupText', '');
    },

    setPlanGroupText: function(combobox) {
        var me = this,
            myVM = me.getViewModel();

        myVM.set('vmPlanGroupText', combobox.getDisplayValue());
    },

    displayLetterName: function(value) {
        var me = this,
            listStore = me.getStore('lettertypes').findRecord('LetterNameID',value);

        if (value !== '') {
            if (listStore.data.LetterName !== 'undefined') {
                return listStore.data.LetterName;
            }
            else {
                return value;
            }
        }
    }
});