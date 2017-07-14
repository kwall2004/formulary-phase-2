/**
 * Created by d3973 on 11/7/2016.
 */
Ext.define('Atlas.plan.view.addNewTaskWin', {
    extend: 'Ext.form.Panel',
    xtype: 'view-planaddnewtaskwin',
    viewModel: 'plantasksviewmodel',
    controller: 'planaddnewtaskcontroller',
    width: '100%',
    layout: 'form',

    //the pbmTaskScheduler store
    pbmTaskScheduler: null,

    //the pbmTaskSeries store
    pbmTaskSeries: null,

    //index of the selected row in pbmTaskScheduler
    taskSchedulerIdx: null,

    //equivalent to the taskStatus field in the pbmTaskScheduler store
    status: '',

    //a config if the user is doing an update; values are either 'series' or 'occurrence'
    updateType: '',

    taskSeriesId: '',

    //whether the user is adding a new task or updating a new task. Values are either 'add' or 'update'
    windowType : 'add',

    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [
            '->',
            {
                xtype: 'button',
                text: 'Add',
                itemId: 'btnAdd',
                iconCls: 'x-fa fa-plus-circle',
                listeners: {
                    click: 'addPbmTask'
                }
            }, {
                xtype: 'button',
                text: 'Cancel',
                iconCls: 'x-fa fa-times-circle',
                listeners: {
                    click: 'closeWindow'
                }
            }]
    }],

    items: [{
        xtype: 'fieldset',
        title: 'Job Type',
        items: [{
            xtype: 'fieldcontainer',
            layout: 'vbox',
            items: [{
                xtype: 'combobox',
                fieldLabel: 'Task',
                emptyText: 'Task List',
                // width: 610,
                grow: true,
                growMax: 500,
                growMin: 500,
                displayField: 'TaskName',
                valueField: 'TaskConfigId',
                queryMode: 'local',
                bind: {
                    store: '{pbmTaskConfig}'
                },
                validator: function(){
                    if (this.getValue() == null){
                        return 'Please select a task';
                    }
                    else {
                        return true;
                    }
                },
                tpl: Ext.create('Ext.XTemplate',
                    '</Html>'
                    + '<tpl for=".">'
                    + '<tpl if="xindex == 1">'
                    + '<table style="width: 500px;">'
                    + '<tr>'
                    + '<th style="font-weight: bold; padding: 3px;">Task</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Carrier</th>'
                    + '<th style="font-weight: bold; padding: 3px;">LOB</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Account</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Active</th>'
                    + '</tr>'
                    + '</tpl>'
                    + '<tr class="x-boundlist-item">'
                    + '<td style="padding: 3px;">{TaskName}</td>'
                    + '<td style="padding: 3px;">{CarrierName}</td>'
                    + '<td style="padding: 3px;">{CarrierLobName}</td>'
                    + '<td style="padding: 3px;">{CarrierAccountName}</td>'
                +'<tpl if="Active == true">',
                    '<td style="padding: 3px;">Yes</td>',
                '<tpl else>',
                    '<td style="padding: 3px;">No</td>',
                '</tpl>'

                    + '</tr>'
                    + '<tpl if="xindex==0">'
                    + '</table>'
                    + '</tpl>'
                    + '</tpl>'
                    + '</Html>'),

                listeners: {
                    select: 'selectTask'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Run Program',
                grow: true,
                growMax: 500,
                growMin: 500,
                disabled: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Email List',
                grow: true,
                growMax: 500,
                growMin: 500
            }, {
                xtype: 'checkbox',
                value: true,
                fieldLabel: 'Active',
                labelWidth:110
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Upload Document'
                }, {
                    xtype: 'button',
                    fieldLabel: 'Upload Document',
                    iconCls: 'x-fa fa-paperclip',
                    itemId: 'btnUpload',
                    listeners: {
                        click: 'uploadDocBtnWindow'
                    }
                }, {
                    xtype: 'button',
                    iconCls: 'x-fa fa-minus-circle',
                    hidden: true,
                    handler: 'deleteDocument'
                }]
            }]
        }]
    }, {
        xtype: 'fieldset',
        title: 'Submission Window',
        items: [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'datefield',
                fieldLabel: 'From',
                allowBlank: false,
                format: 'm/d/Y',
                validator: function(){
                    var me = this,
                        dateTo = me.up('fieldset').down('[fieldLabel = To]');

                    if ((dateTo.getValue()) && (me.getValue()) &&  (me.getValue().length >5) && (dateTo.getValue().length >5)  && (me.getValue().getTime()) && (Math.floor(dateTo.getValue().getTime() / 1000 / 60 / 60 / 24) < Math.floor(me.getValue().getTime() / 1000 / 60 / 60 / 24))){
                        return 'From date should be less than To date';
                    }
                    else{
                        return true;
                    }
                },
                listeners: {
                    errorchange: 'onDateErrorChange',
                    focusleave: 'onLeaveDateRange'
                }
            }, {
                xtype: 'timefield',
                fieldLabel: 'Time',
                allowBlank: false,
                itemId: 'fromTimefield',
                validator: function(){
                    var toTime = this.up('fieldset').down('#toTimefield'),
                        dateFrom = this.up().down('[fieldLabel = From]'),
                        dateTo = this.up('fieldset').down('[fieldLabel= To]');

                    //checks to see if the fromDate is larger than the toDate
                    if ((dateTo.getValue()) && (dateFrom.getValue()) &&  (dateFrom.getValue().length >5) && (dateTo.getValue().length >5) && (dateFrom.getValue().getTime()) && (dateTo.getValue().getTime()) && (Math.floor(dateFrom.getValue().getTime() / 1000 / 60 / 60 / 24) - Math.floor(dateTo.getValue().getTime() / 1000 / 60 / 60 / 24) > 0)){
                        return 'From date and time should be less than To date and time';
                    }
                    //checks to see if the fromDate is the same as the toDate
                    else if ((dateTo.getValue()) && (dateFrom.getValue()) &&  (dateFrom.getValue().length >5) && (dateTo.getValue().length >5)  && (dateFrom.getValue().getTime()) && (dateTo.getValue().getTime()) && (Math.floor(dateFrom.getValue().getTime() / 1000 / 60 / 60 / 24) - Math.floor(dateTo.getValue().getTime() / 1000 / 60 / 60 / 24) == 0)){
                        if ((toTime.getValue()) && (this.getValue()) && (this.getValue().getTime() > toTime.getValue().getTime())){
                            return 'From date and time should be less than To date and time';
                        }
                        else {
                            return true;
                        }
                    }
                    else{
                        return true;
                    }
                },
                listeners: {
                    errorchange: 'onTimeErrorChange'
                }
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'datefield',
                fieldLabel: 'To',
                allowBlank: false,
                format: 'm/d/Y',
                validator: function(){
                     //debugger;
                    // var me = this,
                    //     dateFrom = me.up('fieldset').down('[fieldLabel = From]');
                    //
                    // if(me.getValue() && me.getValue().length >5) {
                    //
                    //     if ((dateFrom.getValue()) && (me.getValue()) && (Math.floor(dateFrom.getValue().getTime() / 1000 / 60 / 60 / 24) > Math.floor(me.getValue().getTime() / 1000 / 60 / 60 / 24))) {
                    //         return 'From date should be less than To date';
                    //     }
                    //     else {
                    //         return true;
                    //     }
                    // }
                    // else
                    // {
                    //     return;
                    // }

                    // if ((dateFrom.getValue()) && (me.getValue()) && (Math.floor(dateFrom.getValue().getTime() / 1000 / 60 / 60 / 24) > Math.floor(me.getValue().getTime() / 1000 / 60 / 60 / 24))) {
                    //     return 'From date should be less than To date';
                    // }
                    // else {
                    //     return true;
                    // }

                    var me = this,
                        dateFrom = me.up('fieldset').down('[fieldLabel = From]');
                    dateTo = me.up('fieldset').down('[fieldLabel = To]');
                    dateTo.setMinValue( Ext.Date.format(dateFrom.getValue(), 'm/d/Y'));
                    if ((dateFrom.getValue()) && (me.getValue())  &&  (dateFrom.getValue().length >5) && (me.getValue().length >5)  && (me.getValue().getTime()) && (Math.floor(dateFrom.getValue().getTime() / 1000 / 60 / 60 / 24) < Math.floor(me.getValue().getTime() / 1000 / 60 / 60 / 24))){
                        return 'From date should be less than To date';
                    }
                    else{
                        return true;
                    }

                },
                listeners: {
                    errorchange: 'onDateErrorChange',
                    focusleave: 'onLeaveDateRange'
                }
            }, {
                xtype: 'timefield',
                fieldLabel: 'Time',
                allowBlank: false,
                itemId: 'toTimefield',
                validator: function(){
                    var fromTime = this.up('fieldset').down('#fromTimefield'),
                        dateFrom = this.up('fieldset').down('[fieldLabel = From]'),
                        dateTo = this.up('fieldset').down('[fieldLabel= To]');

                    //checks to see if the fromDate is larger than the toDate
                    if ((dateTo.getValue()) && (dateFrom.getValue()) &&  (dateFrom.getValue().length >5) && (dateTo.getValue().length >5)  && (dateFrom.getValue().getTime()) && (dateTo.getValue().getTime()) && (Math.floor(dateFrom.getValue().getTime() / 1000 / 60 / 60 / 24) - Math.floor(dateTo.getValue().getTime() / 1000 / 60 / 60 / 24) > 0)){
                        return 'From date and time should be less than To date and time';
                    }
                    //checks to see if the fromDate is the same as the toDate
                    else if ((dateTo.getValue()) && (dateFrom.getValue()) &&  (dateFrom.getValue().length >5) && (dateTo.getValue().length >5) && (dateFrom.getValue().getTime()) && (dateTo.getValue().getTime()) && (Math.floor(dateFrom.getValue().getTime() / 1000 / 60 / 60 / 24) - Math.floor(dateTo.getValue().getTime() / 1000 / 60 / 60 / 24) == 0)){
                        if ((fromTime.getValue()) && (this.getValue()) && (fromTime.getValue().getTime() > this.getValue().getTime())){
                            return 'From date and time should be less than To date and time';
                        }
                        else {
                            return true;
                        }
                    }
                    else{
                        return true;
                    }
                },
                listeners: {
                    errorchange: 'onTimeErrorChange'
                }
            }]
        }]
    }, {
        xtype: 'fieldset',
        title: 'Recurrence Pattern',
        items: [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            itemId: 'recurrenceDisplay',
            items: [{
                xtype: 'checkbox',
                fieldLabel: 'Recurrence',
                reference: 'cbxRecurrence',
                listeners: {
                    change: function(){
                        var fieldset = this.up('fieldset'),
                            me=this,
                            view = this.up('view-planaddnewtaskwin'),
                            recurrenceEndDate = fieldset.down('[fieldLabel= Recurrence End Date]'),
                            dateToday = new Date().setHours(0, 0, 0, 0),
                            dateFrom = view.down('[fieldLabel= From]'),
                            dateTo =view.down('[fieldLabel= To]'),
                            fromTimefield = view.down('#fromTimefield'),
                            toTimefield = view.down('#toTimefield');

                            if (this.checked) {
                                fieldset.down('#recurrenceContTasks').unmask();
                                recurrenceEndDate.enable();
                                recurrenceEndDate.setConfig('allowBlank', false);
                                view.down('#dailyDays').setConfig('allowBlank', false);
                                view.down('#btnUpload').disable();
                                               dateFrom.setMinValue( Ext.Date.format(new Date(), 'm/d/Y'));
                                               dateTo.setMinValue( Ext.Date.format(new Date(), 'm/d/Y'));
                                                recurrenceEndDate.setMinValue( Ext.Date.format(new Date(), 'm/d/Y'));
                                                if(dateFrom.getValue()!=null && dateFrom.getValue() < dateToday )
                                                      {
                                                           Ext.Msg.alert('Date', 'Date can not less than current date.');
                                                         view.down('[fieldLabel= From]').setValue('');
                                                          view.down('[fieldLabel= To]').setValue('');

                                                      }
                                                if (dateTo.getValue() !=null && dateTo.getValue() < dateToday) {
                                                     Ext.Msg.alert('Date', 'Date can not less than current date.');
                                                   view.down('[fieldLabel= From]').setValue('');
                                                    view.down('[fieldLabel= To]').setValue('');
                                                }

                        }
                        else{
                            fieldset.down('#recurrenceContTasks').mask();
                            recurrenceEndDate.disable();
                            recurrenceEndDate.setConfig('allowBlank', true);
                            view.down('#dailyDays').setConfig('allowBlank', true);
                            recurrenceEndDate.isValid();
                            view.down('#btnUpload').enable();
                            dateFrom.setMinValue('');
                            dateTo.setMinValue('');
                        }

                    }
                }
            }, {
                xtype: 'datefield',
                fieldLabel: 'Recurrence End Date',
                margin: '0 0 0 100',
                format: 'm/d/Y',
                allowBlank: true,
                listeners: {
                    focusleave: 'onLeaveDateRange'
                }
            }]
        }, {
            xtype: 'fieldcontainer',
            itemId: 'recurrenceContTasks',
            layout: 'hbox',
            listeners: {
                afterrender: function(){
                    this.mask();
                }
            },
            items: [{
                xtype: 'radiogroup',
                border: true,
                columns: 1,
                flex: 5,
                items: [{
                    boxLabel: 'Daily',
                    value: 'on',
                    itemId: 'dailyTask',
                    listeners: {
                        change: function(){
                            if (this.value){
                                var containerCards = this.up('fieldset').down('#cardsContainerTasks');
                                containerCards.setActiveItem(0);
                                var view = this.up('view-planaddnewtaskwin');
                                view.down('#dailyDays').setConfig('allowBlank', false);
                                view.down('#weeklyWeek').setConfig('allowBlank', true);
                                view.down('#monthlyDay').setConfig('allowBlank', true);
                                view.down('#yearlyYear').setConfig('allowBlank', true);
                            }
                        }
                    }
                }, {
                    boxLabel: 'Weekly',
                    itemId: 'weeklyTask',
                    value: 'false',
                    listeners: {
                        change: function(){
                            if (this.value){
                                var containerCards = this.up('fieldset').down('#cardsContainerTasks');
                                containerCards.setActiveItem(1);
                                 var view = this.up('view-planaddnewtaskwin');
                                   view.down('#dailyDays').setConfig('allowBlank', true);
                                     view.down('#weeklyWeek').setConfig('allowBlank', false);
                                     view.down('#monthlyDay').setConfig('allowBlank', true);
                                       view.down('#yearlyYear').setConfig('allowBlank', true);

                            }
                        }
                    }
                }, {
                    boxLabel: 'Monthly',
                    itemId: 'monthlyTask',
                    value: 'false',
                    listeners: {
                        change: function(){
                            if (this.value){
                                var containerCards = this.up('fieldset').down('#cardsContainerTasks');
                                containerCards.setActiveItem(2);
                                 var view = this.up('view-planaddnewtaskwin');
                                   view.down('#dailyDays').setConfig('allowBlank', true);
                                   view.down('#weeklyWeek').setConfig('allowBlank', true);
                                    view.down('#monthlyDay').setConfig('allowBlank', false);
                                      view.down('#yearlyYear').setConfig('allowBlank', true);

                            }
                        }
                    }
                }, {
                    boxLabel: 'Yearly',
                    itemId: 'yearlyTask',
                    value: 'false',
                    listeners: {
                        change: function(){
                            if (this.value){
                                var containerCards = this.up('fieldset').down('#cardsContainerTasks');
                                containerCards.setActiveItem(3);
                                  var view = this.up('view-planaddnewtaskwin');
                                      view.down('#dailyDays').setConfig('allowBlank', true);
                                        view.down('#weeklyWeek').setConfig('allowBlank', true);
                                         view.down('#monthlyDay').setConfig('allowBlank', true);
                                          view.down('#yearlyYear').setConfig('allowBlank', false);

                            }
                        }
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'card',
                itemId: 'cardsContainerTasks',
                activeItem: 0,
                flex: 15,
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    itemId: 'dailyCardTasks',
                    items: [{
                        xtype: 'displayfield',
                        value: 'Every'
                    }, {
                        xtype: 'numberfield',
                        value: 1,
                        width: 40,
                        enforceMaxLength: true,
                        maxLength: 2,
                        minValue: 0,
                        hideTrigger: true,
                        itemId: 'dailyDays'
                    }, {
                        xtype: 'displayfield',
                        value: 'day(s).'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'vbox',
                    itemId: 'weeklyCardTasks',
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [{
                            xtype: 'displayfield',
                            value: 'Recur Every'
                        }, {
                            xtype: 'numberfield',
                            value: 1,
                            width: 40,
                            enforceMaxLength: true,
                            maxLength: 2,
                            minValue: 0,
                            hideTrigger: true,
                            itemId: 'weeklyWeek'
                        }, {
                            xtype: 'displayfield',
                            value: 'week(s) on:'
                        }]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        width: '100%',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: 'Sunday',
                            flex: 1
                        }, {
                            xtype: 'checkbox',
                            boxLabel: 'Monday',
                            flex: 1
                        }, {
                            xtype: 'checkbox',
                            boxLabel: 'Tuesday',
                            flex: 1
                        }, {
                            xtype: 'checkbox',
                            boxLabel: 'Wednesday',
                            flex: 1
                        }]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        width: '100%',
                        items: [{
                            xtype: 'checkbox',
                            boxLabel: 'Thursday',
                            flex: 1
                        }, {
                            xtype: 'checkbox',
                            boxLabel: 'Friday',
                            flex: 1
                        }, {
                            xtype: 'checkbox',
                            boxLabel: 'Saturday',
                            flex: 1
                        }, {
                            xtype: 'container',
                            flex: 1
                        }]
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId: 'monthlyCardTasks',
                    items: [{
                        xtype: 'displayfield',
                        value: 'Day'
                    }, {
                        xtype: 'numberfield',
                        value: 1,
                        width: 40,
                        enforceMaxLength: true,
                        maxValue: 31,
                        maxLength: 2,
                        minValue: 0,
                        hideTrigger: true,
                        itemId: 'monthlyDay'
                    }, {
                        xtype: 'displayfield',
                        value: 'of every'
                    }, {
                        xtype: 'numberfield',
                        value: 1,
                        width: 40,
                        enforceMaxLength: true,
                        maxLength: 2,
                        minValue: 0,
                        hideTrigger: true,
                        itemId: 'monthlyMonth'
                    }, {
                        xtype: 'displayfield',
                        value: 'month(s).'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId: 'yearlyCardTasks',
                    items: [{
                        xtype: 'displayfield',
                        value: 'Recur every'
                    }, {
                        xtype: 'numberfield',
                        value: 1,
                        width: 40,
                        enforceMaxLength: true,
                        maxLength: 2,
                        minValue: 0,
                        hideTrigger: true,
                        itemId: 'yearlyYear'
                    }, {
                        xtype: 'displayfield',
                        value: 'year(s) on day'
                    }, {
                        xtype: 'numberfield',
                        value: 1,
                        width: 40,
                        enforceMaxLength: true,
                        maxLength: 2,
                        minValue: 0,
                        hideTrigger: true,
                        itemId: 'yearlyDay'
                    }, {
                        xtype: 'displayfield',
                        value: 'of'
                    }, {
                        xtype: 'combobox',
                        displayField: 'name',
                        valueField: 'value',
                        value: 'January',
                        //editable: false,
                        itemId: 'cbxMonths',
                        forceSelection: true,
                        store: {
                            data: [{
                                name: 'January',
                                value: 1
                            }, {
                                name: 'February',
                                value: 2
                            }, {
                                name: 'March',
                                value: 3
                            }, {
                                name: 'April',
                                value: 4
                            }, {
                                name: 'May',
                                value: 5
                            }, {
                                name: 'June',
                                value: 6
                            }, {
                                name: 'July',
                                value: 7
                            }, {
                                name: 'August',
                                value: 8
                            }, {
                                name: 'September',
                                value: 9
                            }, {
                                name: 'October',
                                value: 10
                            }, {
                                name: 'November',
                                value: 11
                            }, {
                                name: 'December',
                                value: 12
                            }]
                        }
                    }]
                }]
            }]
        }]
    }]
});