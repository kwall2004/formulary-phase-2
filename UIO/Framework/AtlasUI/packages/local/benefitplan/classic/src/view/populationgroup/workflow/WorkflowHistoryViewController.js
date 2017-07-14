/**
 * Created by j2560 on 11/4/2016.
 */
/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.workflow.WorkflowHistoryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplanworkflowhistory',
    init: function(e) {
        Ext.getBody().mask('loading');
        var vm = this.getViewModel(),
            store = vm.getStore('workflowhistory'),
            notesStore = vm.getStore('statusnotes');
        vm.set('popGrpPBPSK', this.getView().atlasId);

        store.getProxy().setExtraParam('popGrpPBPSK', vm.get('popGrpPBPSK'));
        store.load({
            callback: function(records, operation, success) {
                notesStore.getProxy().setExtraParams({'popGrpPBPStatSK': vm.get('popGrpPBPSK')});
                notesStore.load(function(){
                    Ext.getBody().unmask();
                });
            }
        });
    },
    onBack: function() {
        this.getView().close();
    },
    onNoteSelection: function(button, record, e) {
        var vm = this.getViewModel();
        vm.set('ReadOnlyNotes', true);
        vm.set('SaveEnabled', false);
        this.lookup('noteSubject').setValue(record.get('NoteSubject'));
        this.lookup('noteDetail').setValue(record.get('NoteDtl'));
    },
    onHistoryItemSelection: function(button, record, e) {
        this.onCancel();
        var vm = this.getViewModel(),
        notesStore = vm.getStore('statusnotes');
        vm.set('isGridSelection', true);
        notesStore.getProxy().setExtraParams({'popGrpPBPStatSK': this.lookupReference('workflowhistorygrid').getSelection()[0].get('PopGrpPBPStatSK')});
        Ext.getBody().mask('loading');
        notesStore.load(function(){
            Ext.getBody().unmask();
        });
    },
    onCancel: function() {
        var me = this,
        view = me.getView(),
        vm = me.getViewModel();

        vm.set('SaveEnabled',false);
        vm.set('ReadOnlyNotes', true);
        view.lookupReference('noteSubject').setValue('');
        view.lookupReference('noteDetail').setValue('');
    },
    onAddNote : function()
    {
        var me = this;
        var view = me.getView();
        var vm = me.getViewModel();
        vm.set('isGridSelection', false);
        var workflowhistorygrid = view.lookupReference('workflowhistorygrid');
        if (workflowhistorygrid.getSelection().length > 0) {
            vm.set('ReadOnlyNotes', false);
            view.lookupReference('noteSubject').setValue('');
            view.lookupReference('noteDetail').setValue('');
        }
    },
    onClearFilters: function(button, record, e){
        var me = this,
        view = me.getView(),
        vm = me.getViewModel(),
        store = vm.getStore('workflow');
        view.lookupReference('dateFromFilterField').setValue('');
        view.lookupReference('dateToFilterField').setValue('');
        store.clearFilter();
    },
    onNoteTextChange: function(textfield , eOpts)
    {
        var me = this,
        view = me.getView();
        vm = me.getViewModel();
        if (!vm.get('ReadOnlyNotes')) {
            vm.set('SaveEnabled', (view.lookupReference('noteSubject').getValue().length > 0 && view.lookupReference('noteDetail').getValue().length > 0));
        }
    },
    onDateFilterChange: function(button, record, e){
        var me = this;
        var view = me.getView();
        var vm = me.getViewModel();
        var store = vm.getStore('workflowhistory');
        store.clearFilter();
        store.filter(new Ext.util.Filter({
            filterFn: function(item) {
                return (
                    (!(view.lookupReference('dateFromFilterField').getValue() instanceof Date) || item.get('ActionDate').setHours(0,0,0,0) >= view.lookupReference('dateFromFilterField').getValue())
                    &&
                    (!(view.lookupReference('dateToFilterField').getValue() instanceof Date) || item.get('ActionDate').setHours(0,0,0,0) <= view.lookupReference('dateToFilterField').getValue())
                );
            }
        }));
    },
    onNoteSubjectEnabled: function(textfield , eOpts)
    {
        textfield.focus();
    },
    onSave: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            workflowhistorygrid = view.lookupReference('workflowhistorygrid');
        if (workflowhistorygrid.getSelection().length > 0)
        {
            vm.set('ReadOnlyNotes', true);
            vm.set('SaveEnabled', false);
            var store=vm.getStore('statusnotes'),
            currentUser=vm.get('user').un;
            store.add({
                CreatedBy: currentUser,
                CreatedTs: new Date(),
                CurrentUser: currentUser,
                User: currentUser,
                LastModfdBy: currentUser,
                LastModfdTs: new Date(),
                DateCreated: new Date(),
                NoteDtl: view.lookupReference('noteDetail').getValue(),
                NoteSubject: view.lookupReference('noteSubject').getValue(),
                PopGrpPBPStatSK: workflowhistorygrid.getSelection()[0].get('PopGrpPBPStatSK'),
                StatNoteSK: 0

            });
            this.lookup('noteSubject').setValue('');
            this.lookup('noteDetail').setValue('');
            if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                Ext.getBody().mask('Saving');
            }
            store.sync({
                callback:function(){
                    Ext.getBody().unmask();
                },
                success: function (results, operation, success) {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully',
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                },
                failure: function (results, operation,messages) {
                    Ext.Msg.show({
                        title: 'Failed to Save',
                        msg: 'Data failed to save:',
                        buttons: Ext.Msg.OK,
                        closable: false,
                        draggable: false,
                        resizable: false
                    });
                }
            });
        }
    }
});