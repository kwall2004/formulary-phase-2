Ext.define('Atlas.plan.view.tasks.TasksController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.plantaskscontroller',

    listen: {
        controller: {
            '#planaddnewtaskcontroller': {
                afterSave: 'searchTasks'
            }
        }
    },

    init: function(){
        var me = this,
            storePbmTaskStatus = me.retrieveStore('pbmTaskStatus'),
            storePbmTaskConfig = me.retrieveStore('pbmTaskConfig'),
            storePbmTaskList = me.retrieveStore('pbmTaskList');

        storePbmTaskStatus.onAfter('load', 'onFirstTaskStatusLoad');

        storePbmTaskConfig.load({
            addRecords: true
        });

        storePbmTaskStatus.load({
            addRecords: true,
            params: {
                pListName: 'PBMTaskList'
            }
        });
    },

    onFirstTaskStatusLoad: function(storePbmTaskStatus){
        storePbmTaskStatus.unAfter('load', 'onFirstTaskStatusLoad');
        storePbmTaskStatus.onAfter('load', 'searchTasks');

        storePbmTaskStatus.load({
            addRecords: true,
            params: {
                pListName: 'TaskStatus'
            }
        });
    },

    searchTasks: function(){
        var me = this,
            dateDueDateTo = me.getView().down('[fieldLabel = Due Date To]'),
            dateDueDateFrom = me.getView().down('[fieldLabel = Due Date From]'),
            cbxTask = me.getView().down('#cbxTask'),
            cbxTaskStatus = me.getView().down('#cbxTaskStatus'),
            selectedTask = cbxTask.getSelection(),
            selectedTaskStatus = cbxTaskStatus.getSelection(),
            storePbmTaskScheduler = me.retrieveStore('pbmTaskScheduler'),
            paramsTaskSched,
            gmtOffset = Ext.Date.getGMTOffset(new Date()),
            tempDueDateFrom = new Date(dateDueDateFrom.getValue()),
            tempDueDateTo = new Date(dateDueDateTo.getValue()),
            chkShowInactive = me.getView().down('[fieldLabel = Show Inactive]');
        paramsTaskSched = {
            pDateFrom: new Date(tempDueDateFrom./*getValue().*/setHours(0, 0, 0, 0)),
            pDateTo: new Date(tempDueDateTo./*getValue().*/setHours(0, 0, 0, 0)),
            pTaskID: selectedTask.get('TaskConfigId'),
            pCLTZ: gmtOffset,
            pTaskStatus: selectedTaskStatus.get('value')
        };



        storePbmTaskScheduler.getProxy().setExtraParam('pDateFrom',new Date(tempDueDateFrom./*getValue().*/setHours(0, 0, 0, 0)));
        storePbmTaskScheduler.getProxy().setExtraParam('pDateTo',new Date(tempDueDateTo./*getValue().*/setHours(0, 0, 0, 0)));
        storePbmTaskScheduler.getProxy().setExtraParam('pTaskID',selectedTask.get('TaskConfigId'));
        storePbmTaskScheduler.getProxy().setExtraParam('pCLTZ',gmtOffset);
        storePbmTaskScheduler.getProxy().setExtraParam('pTaskStatus',selectedTaskStatus.get('value'));
        if (!chkShowInactive.getValue()) {
            storePbmTaskScheduler.getProxy().setExtraParam('filter', '[{"operator":"like","value":"' + !chkShowInactive.getValue() + '","property":"active"}]');
        }
        else{
            delete storePbmTaskScheduler.proxy.extraParams.filter;
            storePbmTaskScheduler.clearFilter();
            storePbmTaskScheduler.removeAll();
            storePbmTaskScheduler.commitChanges();
        }
        storePbmTaskScheduler.onAfter('load', 'loadTaskSeries');
        storePbmTaskScheduler.load();// {params: paramsTaskSched}
        storePbmTaskScheduler.loadPage(1);
    },

    loadTaskSeries: function(storeTaskSched, records, successful, operation){
        var me = this,
            storePbmTaskSeries = me.retrieveStore('pbmTaskSeries'),
            chkShowInactive = me.getView().down('[fieldLabel = Show Inactive]'),
            metadataPayload = Ext.decode(operation.getResponse().responseText).metadata.ttTaskSeries.ttTaskSeries;
        storeTaskSched.unAfter('load', 'loadTaskSeries');
        storePbmTaskSeries.loadRawData(metadataPayload);
        for (var idx = 0; idx < storeTaskSched.getCount(); idx = idx + 1){
            if (storeTaskSched.getAt(idx).get('taskSeriesId')){
                storeTaskSched.getAt(idx).set('ApplyToSeries', true);
            }
            else{
                storeTaskSched.getAt(idx).set('ApplyToSeries', false);
            }
            // storeTaskSched.getAt(idx).set('dueDateBegin', storeTaskSched.getAt(idx).get('dueDateBegin'));
            //storeTaskSched.getAt(idx).set('dueDateEnd', storeTaskSched.getAt(idx).get('dueDateEnd'));
            if (storeTaskSched.getAt(idx).get('completeDate')){
                //storeTaskSched.getAt(idx).set('completeDate', storeTaskSched.getAt(idx).get('completeDate'));
            }
        }

        storeTaskSched.commitChanges();
        if (!chkShowInactive.getValue()){
            storeTaskSched.filter('active', true);
        }
        else{
            delete storeTaskSched.proxy.extraParams.filter;
            // storeTaskSched.filter('active', false);
            //storeTaskSched.clearFilter();
            storeTaskSched.loadData(records);

        }

    },

    onAddNewTaskBtn: function(){
        var me = this,
            containerAddNewTask = Ext.create('Ext.form.Panel', {
                modal: true,
                floating: true,
                autoShow: false,
                closable: true,
                title: 'Add New Task',
                resizable: true,
                draggable: true,
                width: 675,
                items: [{
                    xtype: 'view-planaddnewtaskwin',
                    pbmTaskScheduler: me.retrieveStore('pbmTaskScheduler'),
                    pbmTaskSeries: me.retrieveStore('pbmTaskSeries')
                }]
            });
        me.getView().add(containerAddNewTask).show();
    },

    updateRow: function(table, record, tr, rowIndex){
        //debugger;
        var me = this,
            storePbmTaskScheduler = me.retrieveStore('pbmTaskScheduler'),
            storePbmTaskSeries = me.retrieveStore('pbmTaskSeries');

        if ((record.get('taskSeriesId') == 0) || (record.get('taskStatus') != 'Scheduled')){
            var containerAddNewTask = Ext.create('Ext.form.Panel', {
                modal: true,
                floating: true,
                autoShow: false,
                closable: true,
                title: 'Update Task Status',
                resizable: true,
                draggable: true,
                width: 675,
                items: [{
                    xtype: 'view-planaddnewtaskwin',
                    status: record.get('taskStatus'),
                    updateType: 'occurrence',
                    pbmTaskScheduler: storePbmTaskScheduler,
                    taskSchedulerIdx: rowIndex,
                    windowType: 'update',
                    taskSeriesId: 0,
                    pbmTaskSeries: storePbmTaskSeries
                }]
            });
        }
        else{
            var winUpdateTask = Ext.create('Ext.form.Panel', {
                title: 'Update Task',
                iconCls: 'x-fa fa-exclamation-circle',
                floating: true,
                autoShow: true,
                modal: true,
                closable: true,
                width: 300,
                items: [{
                    xtype: 'radiogroup',
                    columns: 1,
                    items: [{
                        value: true,
                        boxLabel: 'Update this occurrence'
                    }, {
                        value: false,
                        boxLabel: 'Update the series'
                    }]
                }],

                dockedItems: [{
                    dock: 'bottom',
                    xtype: 'toolbar',
                    items:[
                        '->',
                        {
                            xtype: 'button',
                            text: 'OK',
                            iconCls: 'x-fa fa-check',
                            listeners: {
                                click: function(){
                                    var updateType,
                                        taskSeriesId;

                                    if (this.up('form').down('[boxLabel= Update this occurrence]').getValue()){
                                        updateType = 'occurrence';
                                        if(record.get('taskSeriesId')){
                                            taskSeriesId = 0;
                                        }
                                    }
                                    else {
                                        updateType = 'series';
                                        taskSeriesId = record.get('taskSeriesId');
                                    }
                                    var containerAddNewTask = Ext.create('Ext.form.Panel', {
                                        modal: true,
                                        floating: true,
                                        autoShow: false,
                                        closable: true,
                                        title: 'Update Task Status',
                                        resizable: true,
                                        draggable: true,
                                        width: 675,
                                        items: [{
                                            xtype: 'view-planaddnewtaskwin',
                                            status: record.get('taskStatus'),
                                            updateType: updateType,
                                            pbmTaskScheduler: storePbmTaskScheduler,
                                            taskSchedulerIdx: rowIndex,
                                            windowType: 'update',
                                            taskSeriesId: taskSeriesId,
                                            pbmTaskSeries: storePbmTaskSeries
                                        }]
                                    });

                                    this.up('form').close();
                                }
                            }
                        }, {
                            xtype: 'tbseparator'
                        }, {
                            xtype: 'button',
                            text: 'Cancel',
                            iconCls: 'x-fa fa-times',
                            listeners: {
                                click: function(){
                                    this.up('form').close();
                                }
                            }
                        }]
                }]
            });
        }
        me.getView().add(containerAddNewTask).show();
    },

    deleteTask: function(){
        var me = this,
            selectedRow = me.getView().down('gridpanel').getSelection()[0];

        if (selectedRow){
            var storePbmTaskScheduler = me.retrieveStore('pbmTaskScheduler'),
                idxSelectedRow = storePbmTaskScheduler.find('taskId', selectedRow.get('taskId')),
                storePbmTaskSeries = me.retrieveStore('pbmTaskSeries'),
                isSeries;

            if (selectedRow.get('taskSeriesId') != 0){
                var deleteWindow = Ext.create('Ext.panel.Panel', {
                    title: 'Delete Task',
                    closable: true,
                    modal: true,
                    floating: true,
                    autoShow: true,
                    width: 300,
                    iconCls: 'x-fa fa-exclamation-circle',
                    items: [{
                        xtype: 'radiogroup',
                        columns: 1,
                        items: [{
                            value: true,
                            boxLabel: 'Delete the occurrence'
                        }, {
                            value: false,
                            boxLabel: 'Delete the series'
                        }]
                    }],
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-check',
                                text: 'OK',
                                listeners: {
                                    click: function(){
                                        me.saveDeletion(storePbmTaskScheduler, idxSelectedRow, storePbmTaskSeries, this.up('panel').down('[boxLabel = Delete the series]').getValue());
                                        this.up('panel').close();
                                    }
                                }
                            }, {
                                xtype: 'button',
                                iconCls: 'x-fa fa-times',
                                text: 'Cancel',
                                listeners: {
                                    click: function(){
                                        this.up('panel').close();
                                        return;
                                    }
                                }
                            }]
                    }]
                });
            }
            else {
                isSeries = false;
                me.saveDeletion(storePbmTaskScheduler, idxSelectedRow, storePbmTaskSeries, isSeries);
            }
        }
        else{
            Ext.Msg.alert('Delete Task', 'Please select a task first');
            return;
        }
    },

    saveDeletion: function(storePbmTaskScheduler, idxSelectedRow, storePbmTaskSeries, isSeries){
        Ext.Msg.confirm('Confirm', 'Are you sure you want to delete this task?', function(buttonId){
            if (buttonId == 'yes'){
                var mode = 'D',
                    timeZone = Ext.Date.getGMTOffset(new Date());
                if (!(storePbmTaskScheduler.getAt(idxSelectedRow).get('systemID'))){
                    storePbmTaskScheduler.getAt(idxSelectedRow).set('systemID', -1);
                }

                if(!isSeries){
                    storePbmTaskScheduler.getAt(idxSelectedRow).set('ApplyToSeries', false);
                    storePbmTaskScheduler.removeAt(idxSelectedRow);
                    storePbmTaskSeries.removeAt(idxSelectedRow);
                }
                else{
                    var taskSeriesId = storePbmTaskScheduler.getAt(idxSelectedRow).get('taskSeriesId'),
                        removedRecordsScheduler = [],
                        removedRecordsSeries = [];

                    for (var idx = 0; idx < storePbmTaskScheduler.getCount(); idx = idx + 1){
                        if (storePbmTaskScheduler.getAt(idx).get('taskSeriesId') == taskSeriesId){
                            removedRecordsScheduler.push(storePbmTaskScheduler.getAt(idx));
                            removedRecordsSeries.push(storePbmTaskSeries.getAt(idx));
                        }
                    };
                    storePbmTaskScheduler.remove(removedRecordsScheduler);
                    storePbmTaskSeries.remove(removedRecordsSeries);
                }

                var saveAction =[{
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }, {
                    "Create": {"key": 'mode', "value": 'A'},
                    "Update": {"key": 'mode', "value": 'U'},
                    "Delete": {"key": 'mode', "value": 'D'}
                }];

                var setPbmTaskScheduler = Atlas.common.utility.Utilities.saveData([storePbmTaskScheduler, storePbmTaskSeries], 'shared/rx/pbmtaskscheduler/update', 'ttTaskScheduler,ttTaskSeries',[true, false], {'pMode': mode, 'pCLTZ': timeZone},
                    saveAction, null);

                storePbmTaskScheduler.commitChanges();
                storePbmTaskSeries.commitChanges();
            }
        });
    },

    resetPage: function(){
        var me = this,
            cbxStatus = me.getView().down('[fieldLabel= Status]'),
            cbxTask = me.getView().down('[fieldLabel= Task]'),
            dateDueDateFrom = me.getView().down('[fieldLabel= Due Date From]'),
            dateDueDateTo = me.getView().down('[fieldLabel= Due Date To]'),
            checkboxShowInactive = me.getView().down('[fieldLabel= Show Inactive]');

        dateDueDateFrom.setValue(new Date());
        dateDueDateTo.setValue(Ext.Date.add(new Date(), Ext.Date.DAY, 30));
        cbxTask.setValue(0);
        cbxStatus.setValue('');
        checkboxShowInactive.setValue(false);
        this.searchTasks();
    },

    retrieveStore: function(storeName){
        //quick method for calling a store in the viewModel
        return this.getViewModel().getStore(storeName);
    },
    onLeaveDateRange: function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    }
});