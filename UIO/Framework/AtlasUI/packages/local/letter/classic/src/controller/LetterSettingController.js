/**
 *      Author: Dean C. Reed
 *     Created: 10/12/2016
 *      Origin: MERLIN - Reports
 * Description: Controller for LetterDetailPlan.js
 **/
Ext.define('Atlas.letter.controller.LetterSettingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lettersettingctrl',
    xtype: 'lettersettingcontroller',

    init: function(){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            queryDBObj,
            queryDBObjList,
            pList,
            pListArray=[],
            lettersettingstore = me.getStore('letterslistdata');

        lettersettingstore.load();
    },
    onActionClick: function(button) {
        var me = this,
            grid = me.getView(),
            listStore = me.getStore('letterslistdata'),
            store = grid.getStore(),
            newRecord = Ext.create('Atlas.letter.model.LetterSettingModel',
                {
                    LetterName  : '',
                    LetterProgramName: '' ,
                    LetterTemplateName: 'Plan',
                    TemplateFields: '',
                    moduleName: '',
                    authLetterId: '',
                    authLetterType: '',
                    LetterFrom: ''
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
                "Create": {"key": 'mode', "value": 'A'},
                "Update": {"key": 'mode', "value": 'U'},
                "Delete": {"key": 'mode', "value": 'D'}
            }],
            listStore = me.getStore('letterslistdata');

        var testReturn = Atlas.common.utility.Utilities.saveData([listStore],'shared/rx/letterslist/update','ttLettersList' ,[true], '' ,
            saveAction, null );
    }
});
