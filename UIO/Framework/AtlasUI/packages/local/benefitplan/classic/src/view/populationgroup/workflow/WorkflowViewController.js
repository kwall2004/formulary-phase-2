/**
 * Created by j2560 on 11/4/2016.
 */
/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.workflow.WorkflowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplanworkflow',
    listen: {
        //listen to events using GlobalEvents
        controller: {
            '*': {
                onWorkFlowUpdate:'onWorkFlowUpdate'
            }
        }
    },
    onWorkFlowUpdate:function(){
        this.getViewModel().getStore('workflow').reload();
    },
    checkForUnsavedRecords: function(panel) {
        /*this function will check for all grids on the parent panel/window and check to see if there are any updated or unsaved  records,
         */
        var phantomRowsExist= false;
        panel.query('grid').forEach(function logArrayElements(element){
            var gridStore = element.store;
            gridStore.each(function(record){
                if (record.phantom) {
                    phantomRowsExist = true;
                }
            });
        });
        if (phantomRowsExist||this.getViewModel().data.SaveEnabled){
            Ext.MessageBox.confirm('Close Window','This window contains unsaved rows that will be lost. Are you sure you want to close the window?',function (id){
                if (id === 'yes') {
                    panel.events.beforeclose.clearListeners();
                    panel.close();}
            });

        }else{
            panel.events.beforeclose.clearListeners();
            panel.close();
        }
        return false;
    },
    init: function(e) {
        var vm = this.getViewModel(),
            store = vm.getStore('workflow');
        vm.set('statusType', 2);
        store.getProxy().setExtraParam('statusType', vm.get('statusType'));
        store.getProxy().setExtraParam('startDate', '');
        store.getProxy().setExtraParam('endDate', '');
        Ext.getBody().mask('loading');
        store.load(function(){
            Ext.getBody().unmask();
        });
    },
    onNoteTextChange: function(textfield , eOpts)
    {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        if (!vm.get('ReadOnlyNotes')) {
            vm.set('SaveEnabled', (view.lookup('noteSubject').getValue().length > 0 && view.lookup('noteDetail').getValue().length > 0));
       }
    },
    onNoteSubjectEnabled: function(textfield , eOpts)
    {
        textfield.focus();
    },
    onWorkflowHistory: function(button, record, e) {
        this.fireEvent('OpenView','merlin', 'benefitplan', 'populationgroup.workflow.WorkflowHistory', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: this.lookup('workflowtabs').activeTab.selection.get('PopGrpPBPSK')
        });
    },
    onStatusChange: function(tabs, newTab, oldTab) {
        var vm = this.getViewModel(),
            store = vm.getStore('workflow');
        vm.set('statusType', newTab.status);
        vm.set('ApproveButtonHidden', vm.get('statusType') == 4);
        vm.set('RejectButtonHidden', vm.get('statusType') == 5);
        store.getProxy().setExtraParam('statusType', vm.get('statusType'));
        Ext.getBody().mask('loading');
        store.load({
            scope: this,
            callback: function(records, operation,success) {
                this.onCancel();
                this.getViewModel().set('isGridSelection', false);
                Ext.getBody().unmask();
            }
        });
    },
    onGridSelection: function(button, record, e) {
        this.getViewModel().set('isGridSelection', true);
        this.onCancel();
        var vm = this.getViewModel(),
            store = vm.getStore('statusnotes');
        store.getProxy().setExtraParams({'popGrpPBPSK': record.get('PopGrpPBPSK')});
        Ext.getBody().mask('loading');
        store.load({
            scope: this,
            callback: function(records, operation,success) {
                this.onCancel();
                Ext.getBody().unmask();
            }
        });
    },
    showMessage: function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            closable: false,
            draggable: false,
            resizable: false
        });
    },
    onApprove: function(button, record, e) {
        var me = this,
            vm = me.getViewModel(),
            workflowStore=vm.getStore('workflow'),
            notesStore=vm.getStore('statusnotes'),
            currentUser=vm.get('user').un,
            tabs = me.lookup('workflowtabs'),
            gridSelection = tabs.activeTab,
            selectedPopGrpPBPStatSK = gridSelection.selection.get('PopGrpPBPStatSK'),
            selectedPopGrpPBPSK = gridSelection.selection.get('PopGrpPBPSK');
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    var gridSelection = tabs.activeTab,
                        status = gridSelection.status;
                    if (gridSelection.status == 5) {
                        status = 2
                    } else {
                        status++;
                    }
                    workflowStore.add({
                        PopGrpPBPStatSK: selectedPopGrpPBPStatSK,
                        PopGrpPBPSK: selectedPopGrpPBPSK,
                        StatTypeSK: status,
                        CurrentUser: currentUser
                    });
                    if(workflowStore.getNewRecords() || workflowStore.getUpdatedRecords() || workflowStore.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    workflowStore.sync({
                        success: function (results, operation, success) {
                            me.fireEvent('onWorkFlowUpdate', {status: 'Approved'});
                            notesStore.getProxy().setExtraParams({});
                            notesStore.add({
                                CreatedBy: currentUser,
                                CreatedTs: new Date(),
                                CurrentUser: currentUser,
                                LastModfdBy: currentUser,
                                LastModfdTs: new Date(),
                                NoteDtl: "Status Accepted",
                                NoteSubject: "Accepted",
                                PopGrpPBPStatSK: selectedPopGrpPBPStatSK
                            });

                            notesStore.sync({
                                success: function (results, operation, success) {
                                    notesStore.getProxy().setExtraParams({'PopGrpPBPStatSK': 0});
                                    notesStore.load();
                                    vm.set('isGridSelection',false);
                                    me.onCancel();
                                    me.showMessage('Success StatusNote Saving', 'Data saved successfully');
                                },
                                failure: function (results, operation, messages) {
                                    try {
                                        vm.set('isGridSelection', false);
                                        var responsemessage = "";
                                        for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                                            var responsedata = JSON.parse(results.operations[i].getResponse().responseText);
                                            if (responsemessage != '') {
                                                responsemessage += '<br />';
                                            }
                                            responsemessage += responsedata.messages.map(function (elem) {
                                                return elem.message;
                                            }).join(",");
                                        }
                                        me.showMessage('Failed StatusNote Saving', 'Status Note could not be created:<br />' + responsemessage);
                                    } catch (e) {
                                        me.showMessage('Failed StatusNote Saving', 'Status Note could not be created. Unknown exception.');
                                    }
                                }
                            });
                        },
                        failure: function (results, operation, messages) {
                            try {
                                vm.set('isGridSelection',false);
                                var responsemessage = "";
                                for (var i = 0, tCnt = results.operations.length; i < tCnt; i++) {
                                    var responsedata = JSON.parse(results.operations[i].getResponse().responseText)
                                    if (responsemessage != '') {
                                        responsemessage += '<br />';
                                    }
                                    responsemessage += responsedata.messages.map(function (elem) {
                                        return elem.message;
                                    }).join(",");
                                }
                                me.showMessage('Approval Failure', 'Could not Approve :<br />' + responsemessage);
                            } catch (e) {
                                me.showMessage('Approval Failure', 'Could not Approve. Unknown exception.');
                            }
                        },
                        callback: function (results, operation, success) {
                            workflowStore.load(function(){
                                Ext.getBody().unmask();
                            });
                        }
                    });
                }
            }
        });
    },
    onReject: function(button, record, e) {
        var me = this,
            vm = me.getViewModel(),
            workflowStore=vm.getStore('workflow'),
            notesStore=vm.getStore('statusnotes'),
            currentUser=vm.get('user').un,
            gridSelection = me.lookup('workflowtabs').activeTab,
            selectedPopGrpPBPStatSK = gridSelection.selection.get('PopGrpPBPStatSK'),
            selectedPopGrpPBPSK = gridSelection.selection.get('PopGrpPBPSK');
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                if (btn == 'yes') {
                    workflowStore.add({
                        PopGrpPBPStatSK: selectedPopGrpPBPStatSK,
                        PopGrpPBPSK: selectedPopGrpPBPSK,
                        StatTypeSK: 5,
                        CurrentUser: currentUser
                    });
                    if(workflowStore.getNewRecords() || workflowStore.getUpdatedRecords() || workflowStore.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    workflowStore.sync({
                        success: function (results, operation, success) {
                            me.fireEvent('onWorkFlowUpdate');
                            notesStore.getProxy().setExtraParams({});
                            notesStore.add({
                                CreatedBy: currentUser,
                                CreatedTs: new Date(),
                                CurrentUser: currentUser,
                                LastModfdBy: currentUser,
                                LastModfdTs: new Date(),
                                NoteDtl: "Status Rejected",
                                NoteSubject: "Rejected",
                                PopGrpPBPStatSK: selectedPopGrpPBPStatSK,
                                StatNoteSK: 0
                            });
                            notesStore.sync({
                                success: function (results, operation, success) {
                                    notesStore.getProxy().setExtraParams({'PopGrpPBPStatSK': 0});
                                    notesStore.load();
                                    me.onCancel();
                                    me.showMessage('Success', 'Data saved successfully');
                                },
                                failure: function (results, operation, messages) {
                                    me.showMessage('Failed to Save', 'Data failed to save');
                                }
                            });
                        },
                        failure: function (results, operation, messages) {
                            me.showMessage('Failed to Save', 'Data failed to save');
                        },
                        callback: function (results, operation, success) {
                            workflowStore.load(function(){
                                Ext.getBody().unmask();
                            });
                        }
                    });
                }
            }
        });
    },
    onAddNote : function()
    {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        vm.set('ReadOnlyNotes', false);
        view.lookup('noteSubject').setValue('');
        view.lookup('noteDetail').setValue('');
    },

    onNoteSelection: function(button, record, e) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        vm.set('ReadOnlyNotes', true);
        vm.set('SaveEnabled', false);
        view.lookup('noteSubject').setValue(record.get('NoteSubject'));
        view.lookup('noteDetail').setValue(record.get('NoteDtl'));
    },
    onCancel: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        vm.set('SaveEnabled',false);
        vm.set('ReadOnlyNotes', true);
        view.lookup('noteSubject').setValue('');
        view.lookup('noteDetail').setValue('');
    },
    onClearFilters: function(button, record, e){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = vm.getStore('workflow');
        view.lookup('dateFromFilterField').setValue('');
        view.lookup('dateToFilterField').setValue('');
        store.clearFilter();
    },
    onDateFilterChange: function(button, record, e){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = vm.getStore('workflow'),
            dateFiltersArray = [],
            fromValue = view.lookup('dateFromFilterField').getValue(),
            toValue = view.lookup('dateToFilterField').getValue();
        store.clearFilter();
        store.filter(new Ext.util.Filter({
            filterFn: function(item) {
                return (
                    (!(fromValue instanceof Date) || item.get('LastDate').setHours(0,0,0,0) >= fromValue)
                    &&
                    (!(toValue instanceof Date) || item.get('LastDate').setHours(0,0,0,0) <= toValue)
                );
            }
        }));
    },
    onSave: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store=this.getViewModel().getStore('statusnotes'),
            currentUser=this.getViewModel().get('user').un,
            detailField = view.lookup('noteDetail'),
            subjectField = view.lookup('noteSubject');
        vm.set('ReadOnlyNotes', true);
        store.add({
            CreatedBy: currentUser,
            CreatedTs: new Date(),
            CurrentUser: currentUser,
            User: currentUser,
            LastModfdBy: currentUser,
            LastModfdTs: new Date(),
            DateCreated: new Date(),
            NoteDtl: detailField.getValue(),
            NoteSubject: subjectField.getValue(),
            PopGrpPBPStatSK: this.lookup('workflowtabs').activeTab.selection.get('PopGrpPBPStatSK'),
            StatNoteSK: 0
        });
        detailField.setValue('');
        subjectField.setValue('');
        if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
            Ext.getBody().mask('Saving');
        }
        store.sync({
            success: function (results, operation, success) {
                me.showMessage('Success', 'Data saved successfully');
            },
            failure: function (results, operation,messages) {
                me.showMessage('Failed to Save', 'Data failed to save');
            },
            callback:function(){
              Ext.getBody().unmask();
            }
        });
    }
});