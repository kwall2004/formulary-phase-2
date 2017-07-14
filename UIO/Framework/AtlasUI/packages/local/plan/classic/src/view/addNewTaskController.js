/**
 * Created by d3973 on 11/8/2016.
 */
Ext.define('Atlas.plan.view.addNewTaskController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.planaddnewtaskcontroller',

    id: 'planaddnewtaskcontroller',

    listen: {
        controller: {
            '#common-fileUploadController': {
                successfulUpload: 'uploadDocBtnPopup'
            }
        }
    },

    init: function() {
        var me = this,
            storeTaskConfig = me.getViewModel().getStore('pbmTaskConfig');



        if (me.getView().windowType != 'add'){
            storeTaskConfig.onAfter('load', 'populateScreen');
            me.getView().down('#btnAdd').setConfig('text', 'Update');
            me.getView().down('[emptyText = Task List]').disable();
        }

        storeTaskConfig.load();
    },

    populateScreen: function(){
        var me = this,
            storePbmTaskScheduler = me.getView().pbmTaskScheduler,
            idxPbmTaskScheduler = me.getView().taskSchedulerIdx,
            taskStatus = me.getView().status,
            btnAdd = me.getView().down('#btnAdd'),
            cbxTask = me.getView().down('[emptyText= Task List]'),
            btnDeleteDoc = me.getView().down('[handler = deleteDocument]'),
            dateFrom = me.getView().down('[fieldLabel = From]'),
            dateTo = me.getView().down('[fieldLabel=To]'),
            timeFrom = me.getView().down('#fromTimefield'),
            timeTo = me.getView().down('#toTimefield'),
            tfRunProgram = me.getView().down('[fieldLabel = Run Program]'),
            tfEmail = me.getView().down('[fieldLabel= Email List]'),
            chkActive = me.getView().down('[fieldLabel= Active]'),
            selectedRecord = storePbmTaskScheduler.getAt(idxPbmTaskScheduler);

        function checkForAttachments(){
            if ((storePbmTaskScheduler.getAt(idxPbmTaskScheduler).get('documentId') == 0) || me.getView().docId){
                btnDeleteDoc.setVisible(false);
            }
            else{
                btnDeleteDoc.setVisible(true);
            }
        }

        me.getViewModel().getStore('pbmTaskConfig').unAfter('load', 'populateScreen');

        if (taskStatus != 'Scheduled'){
            btnAdd.disable();
        }

        if (me.getView().windowType == 'updateTaskId0'){
            me.getView().updateType = 'occurrence';
            me.getView().down('#recurrenceDisplay').mask();
            checkForAttachments();

            cbxTask.setValue(selectedRecord.get('taskConfigId'));
            tfRunProgram.setValue(selectedRecord.get('runProgram'));
            tfEmail.setValue(selectedRecord.get('emailList'));
            chkActive.setValue(selectedRecord.get('active'));
            dateFrom.setValue(selectedRecord.get('dueDateBegin'));
            dateTo.setValue(selectedRecord.get('dueDateEnd'));
            timeFrom.setValue(selectedRecord.get('dueDateBegin'));
            timeTo.setValue(selectedRecord.get('dueDateEnd'));
        }
        else if (me.getView().windowType == 'update'){
            var chkRecurrence = me.getView().down('[fieldLabel= Recurrence]'),
                fieldsetRecurrence = me.getView().down('[title= Recurrence Pattern]'),
                /*tfRunProgram = me.getView().down('[fieldLabel = Run Program]'),
                 tfEmail = me.getView().down('[fieldLabel= Email List]'),
                 chkActive = me.getView().down('[fieldLabel= Active]'),
                 dateFrom = me.getView().down('[fieldLabel = From]'),
                 dateTo = me.getView().down('[fieldLabel=To]'),
                 timeFrom = me.getView().down('#fromTimefield'),
                 timeTo = me.getView().down('#toTimefield'),*/
                dateRecurEnd = me.getView().down('[fieldLabel=Recurrence End Date]'),
                radioDaily = me.getView().down('[boxLabel=Daily]'),
                radioWeekly =me.getView().down('[boxLabel=Weekly]'),
                radioMonthly = me.getView().down('[boxLabel=Monthly]'),
                radioYearly = me.getView().down('[boxLabel=Yearly]'),
                dailyDays = me.getView().down('#dailyDays'),
                weeklyWeek = me.getView().down('#weeklyWeek'),
                chkMonday = me.getView().down('[boxLabel= Monday]'),
                chkTuesday = me.getView().down('[boxLabel= Tuesday]'),
                chkWednesday = me.getView().down('[boxLabel= Wednesday]'),
                chkThursday = me.getView().down('[boxLabel= Thursday]'),
                chkFriday = me.getView().down('[boxLabel= Friday]'),
                chkSaturday = me.getView().down('[boxLabel= Saturday]'),
                chkSunday = me.getView().down('[boxLabel= Sunday]'),
                monthlyDay = me.getView().down('#monthlyDay'),
                monthlyMonth = me.getView().down('#monthlyMonth'),
                yearlyYear = me.getView().down('#yearlyYear'),
                yearlyDay = me.getView().down('#yearlyDay'),
                cbxMonths = me.getView().down('#cbxMonths'),
                // selectedRecord = storePbmTaskScheduler.getAt(idxPbmTaskScheduler),
                storePbmTaskSeries = me.getView().pbmTaskSeries;
            storePbmTaskSeries.clearFilter();
            //var selectedRecordSeries =me.getView().pbmTaskSeries;
            //selectedRecordSeries.loadRawData();
            storePbmTaskSeries.filter('taskSeriesId',selectedRecord.get('taskSeriesId')) //storePbmTaskSeries.getAt(idxPbmTaskScheduler);
            Ext.defer(function () {
                cbxTask.setValue(selectedRecord.get('taskConfigId'));
                tfRunProgram.setValue(selectedRecord.get('runProgram'));
                tfEmail.setValue(selectedRecord.get('emailList'));
                chkActive.setValue(selectedRecord.get('active'));
                dateFrom.setValue(selectedRecord.get('dueDateBegin'));
                dateTo.setValue(selectedRecord.get('dueDateEnd'));
                timeFrom.setValue(selectedRecord.get('dueDateBegin'));
                timeTo.setValue(selectedRecord.get('dueDateEnd'));
                if(storePbmTaskSeries.data && storePbmTaskSeries.data.items.length>0){
                    var arrstorePbmTaskSeries=storePbmTaskSeries.data.items[0].data;
                    dateRecurEnd.setValue(arrstorePbmTaskSeries.endDateTime);
                }


                checkForAttachments();

                if (me.getView().updateType == 'occurrence'){
                    fieldsetRecurrence.afterShow(null,
                        function(){
                            this.down('fieldcontainer').mask();
                        }
                    );
                }
                else {
                    if(storePbmTaskSeries.data && storePbmTaskSeries.data.items.length>0) {
                        chkRecurrence.setValue(true);

                        switch (arrstorePbmTaskSeries.taskFreq) {
                            case 'Daily':
                                radioDaily.setValue(true);
                                dailyDays.setValue(arrstorePbmTaskSeries.reOccursEvery);
                                break;

                            case 'Weekly':
                                var days = arrstorePbmTaskSeries.happensOnDay.split(',');//storePbmTaskSeries.get('happensOnDay').split(',');
                                radioWeekly.setValue(true);
                                weeklyWeek.setValue(arrstorePbmTaskSeries.reOccursEvery);

                                for (var i = 0; i < days.length; i++) {
                                    if (days[i] == '1') {
                                        chkSunday.setValue(true);
                                    }
                                    if (days[i] == '2') {
                                        chkMonday.setValue(true);
                                    }
                                    if (days[i] == '3') {
                                        chkTuesday.setValue(true);
                                    }
                                    if (days[i] == '4') {
                                        chkWednesday.setValue(true);
                                    }
                                    if (days[i] == '5') {
                                        chkThursday.setValue(true);
                                    }
                                    if (days[i] == '6') {
                                        chkFriday.setValue(true);
                                    }
                                    if (days[i] == '7') {
                                        chkSaturday.setValue(true);
                                    }
                                }
                                break;

                            case 'Monthly':
                                radioMonthly.setValue(true);
                                monthlyDay.setValue(arrstorePbmTaskSeries.happensOnDay);
                                monthlyMonth.setValue(storePbmTaskSeries.data.items[0].data.reOccursEvery);
                                break;

                            case 'Yearly':
                                radioYearly.setValue(true);
                                yearlyYear.setValue(arrstorePbmTaskSeries.reOccursEvery);
                                yearlyDay.setValue(arrstorePbmTaskSeries.happensOnDay);
                                cbxMonths.setValue(arrstorePbmTaskSeries.happensOnMonth);
                                break;
                        }
                        storePbmTaskSeries.clearFilter();
                    }
                }

            }, 400);



        }
    },

    selectTask: function(){
        var me = this,
            dispFieldRunProgram = me.getView().down('[fieldLabel= Run Program]'),
            cbxTask = me.getView().down('[fieldLabel= Task]');

        dispFieldRunProgram.setValue(cbxTask.getSelection().get('ProgramName'));
    },

    addPbmTask: function(){
        //debugger;
        var me = this,
            dateFrom = me.getView().down('[fieldLabel= From]'),
            dateTo = me.getView().down('[fieldLabel= To]'),
            cbxTask = me.getView().down('[emptyText= Task List]'),
            tfEmail = me.getView().down('[fieldLabel= Email List]'),
            chkActive = me.getView().down('[fieldLabel= Active]'),
            tfRunProgram = me.getView().down('[fieldLabel = Run Program]'),
            fromTimefield = me.getView().down('#fromTimefield'),
            toTimefield = me.getView().down('#toTimefield'),
            checkboxRecurrence = me.getView().down('[fieldLabel= Recurrence]'),
            containerRecurrence = me.getView().down('#recurrenceContTasks'),
            dateRecurrenceEnd = me.getView().down('[fieldLabel= Recurrence End Date]'),
            btnAdd = me.getView().down('[text= Add]'),
            dailyDays = me.getView().down('#dailyDays'),
            weeklyWeek = me.getView().down('#weeklyWeek'),
            chkMonday = me.getView().down('[boxLabel= Monday]'),
            chkTuesday = me.getView().down('[boxLabel= Tuesday]'),
            chkWednesday = me.getView().down('[boxLabel= Wednesday]'),
            chkThursday = me.getView().down('[boxLabel= Thursday]'),
            chkFriday = me.getView().down('[boxLabel= Friday]'),
            chkSaturday = me.getView().down('[boxLabel= Saturday]'),
            chkSunday = me.getView().down('[boxLabel= Sunday]'),
            monthlyDay = me.getView().down('#monthlyDay'),
            monthlyMonth = me.getView().down('#monthlyMonth'),
            yearlyYear = me.getView().down('#yearlyYear'),
            yearlyDay = me.getView().down('#yearlyDay'),
            cbxMonths = me.getView().down('#cbxMonths'),
            radioDaily = me.getView().down('[boxLabel=Daily]'),
            radioWeekly =me.getView().down('[boxLabel=Weekly]'),
            radioMonthly = me.getView().down('[boxLabel=Monthly]'),
            radioYearly = me.getView().down('[boxLabel=Yearly]'),
            sysID,
            taskFreq,
            reOccursEvery,
            happensOnDay,
            happensOnMonth,
            confirmMessage,
            taskSeriesId,
            dateToday =new Date().setHours(0, 0, 0, 0);

        function validDate(date, newString, preexistingString){
            //debugger;
            if(date.getValue() < dateToday){
                // date.setValue('');

                if (preexistingString){
                    return preexistingString + ' and ' + newString;
                }
                else {
                    return newString;
                }
            }
            else {
                return preexistingString;
            }
        }
        var errorFrom = validDate(dateFrom, 'From date', null),
            errorTo = validDate(dateTo, 'To date', errorFrom);

        if (!(me.getView().isValid())){
            //debugger;

            /*if(errorFrom || errorTo){
             var errorString = 'The following should not be less than the current date: ';
             if ((errorFrom) && (errorTo)){
             Ext.Msg.alert('Validation', errorString + errorTo);
             return;
             }
             else if (errorFrom){
             Ext.Msg.alert('Validation', errorString + errorFrom);
             return;
             }
             else {
             Ext.Msg.alert('Validation', errorString + errorTo);
             return;
             }
             }*/

            if (dateFrom.getActiveError() != '' || dateTo.getActiveError() != '' || fromTimefield.getActiveError() != '' || toTimefield.getActiveError() != '' || cbxTask.getActiveError() != ''){
                if(!(dateFrom.getActiveError().includes('From date should be less than To date')) && !(dateTo.getActiveErrors().includes('From date should be less than To date')) && !(fromTimefield.getActiveErrors().includes('From date and time should be less than To date and time')) && !(toTimefield.getActiveErrors().includes('From date and time should be less than To date and time'))){
                    var errorFields = '';

                    if (cbxTask.getActiveErrors() == 'Please select a task'){
                        errorFields = 'Task, ';
                    }
                    if (dateFrom.hasActiveError()){
                        var activeErrors = dateFrom.getActiveErrors();
                        for (var idx = 0; idx < activeErrors.length; idx = idx + 1){
                            if (activeErrors[idx] == 'This field is required'){
                                errorFields = errorFields + 'From Date, ';
                            }
                        }
                    }
                    if (fromTimefield.getActiveErrors() == 'This field is required'){
                        errorFields = errorFields + 'From Time, ';
                    }



                    if (dateTo.hasActiveError()){
                        var activeErrors = dateTo.getActiveErrors();
                        for (var idx = 0; idx < activeErrors.length; idx = idx + 1){
                            if (activeErrors[idx] == 'This field is required'){
                                errorFields = errorFields + 'To Date, ';
                            }
                            else{
                                if (dateTo.getValue() < dateFrom.getValue()){
                                    Ext.Msg.alert('Validation', 'From date should be less than To date');
                                    return;
                                }
                                else if (dateTo.getValue() <= dateFrom.getValue() && fromTimefield.getValue() > toTimefield.getValue()){
                                    Ext.Msg.alert('Validation', 'From date and time should be less than To date and time');
                                    return;
                                }

                            }
                        }
                    }
                    if (toTimefield.getActiveErrors() == 'This field is required'){
                        errorFields = errorFields + 'To Time, ';
                    }

                    // errorFields = errorFields.substring(0, (errorFields.length - 2));
                    //Ext.Msg.alert('Validation', 'Please select the following: ' + errorFields);
                    return;
                }
            }

            dateFrom.getValue().setHours(fromTimefield.getValue().getHours(), fromTimefield.getValue().getMinutes(), fromTimefield.getValue().getSeconds(), fromTimefield.getValue().getMilliseconds());
            dateTo.getValue().setHours(toTimefield.getValue().getHours(), toTimefield.getValue().getMinutes(), toTimefield.getValue().getSeconds(), toTimefield.getValue().getMilliseconds());

            if (dateTo.getValue() < dateFrom.getValue()){
                Ext.Msg.alert('Validation', 'From date should be less than To date');
                return;
            }
            else if (dateTo.getValue() <= dateFrom.getValue() && fromTimefield.getValue() > toTimefield.getValue()){
                Ext.Msg.alert('Validation', 'From date and time should be less than To date and time');
                return;
            }
            else if ((checkboxRecurrence.getValue()) && !(containerRecurrence.isDisabled())){
                if (!dateRecurrenceEnd.getValue()){
                    Ext.Msg.alert('Validation', 'Please enter Recurrence End Date');
                    return;
                }
            }

            return;
        }
        else {
            dateFrom.getValue().setHours(fromTimefield.getValue().getHours(), fromTimefield.getValue().getMinutes(), fromTimefield.getValue().getSeconds(), fromTimefield.getValue().getMilliseconds());
            dateTo.getValue().setHours(toTimefield.getValue().getHours(), toTimefield.getValue().getMinutes(), toTimefield.getValue().getSeconds(), toTimefield.getValue().getMilliseconds());
            if (dateTo.getValue() < dateFrom.getValue()){
                Ext.Msg.alert('Validation', 'From date should be less than To date');
                return;
            }
            else if (dateTo.getValue() <= dateFrom.getValue() && fromTimefield.getValue() > toTimefield.getValue()){
                Ext.Msg.alert('Validation', 'From date and time should be less than To date and time');
                return;
            }
        }

        if (checkboxRecurrence.getValue() && !(containerRecurrence.isDisabled())){
            dateRecurrenceEnd.getValue().setHours(toTimefield.getValue().getHours(), toTimefield.getValue().getMinutes(), toTimefield.getValue().getSeconds(), toTimefield.getValue().getMilliseconds());
            if (radioDaily.getValue()){
                taskFreq = 'Daily';
                reOccursEvery = dailyDays.getValue();
            }
            else if (radioWeekly.getValue()){
                var dayNum = '';

                taskFreq = 'Weekly';
                reOccursEvery = weeklyWeek.getValue();

                dayNum += chkSunday.getValue() ? ',1' : '';
                dayNum += chkMonday.getValue() ? ',2' : '';
                dayNum += chkTuesday.getValue() ? ',3' : '';
                dayNum += chkWednesday.getValue() ? ',4' : '';
                dayNum += chkThursday.getValue() ? ',5' : '';
                dayNum += chkFriday.getValue() ? ',6' : '';
                dayNum += chkSaturday.getValue() ? ',7' : '';
                happensOnDay = dayNum;
            }
            else if (radioMonthly.getValue()){
                taskFreq = 'Monthly';
                happensOnDay = monthlyDay.getValue();
                reOccursEvery = monthlyMonth.getValue();
            }
            else if (radioYearly.getValue()){
                taskFreq = 'Yearly';
                reOccursEvery = yearlyYear.getValue();
                happensOnDay = yearlyDay.getValue();
                happensOnMonth = cbxMonths.getValue();
            }
        }

        if(me.getView().windowType == 'update'){
            if (me.getView().pbmTaskScheduler.getAt(me.getView().taskSchedulerIdx).get('systemID')){
                sysID = me.getView().pbmTaskScheduler.getAt(me.getView().taskSchedulerIdx).get('systemID');
            }
            else{
                sysID = -1;
            }
        }
        else{
            sysID = -1;
        }

        var localTimeOffset=Ext.Date.getGMTOffset(new Date());//Ext.Date.getGMTOffset(new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y')))
           if (me.getView().windowType != 'add'){
            if (checkboxRecurrence.getValue()){
                confirmMessage = 'Are you sure you want to update this series?';
            }
            else {
                confirmMessage = 'Are you sure you want to update this task?';
            }

            taskSeriesId = me.getView().taskSeriesId;

            Ext.MessageBox.confirm('Confirm',confirmMessage,function (id, value){
                if (id === 'yes') {
                    me.saveTask(cbxTask.getValue('TaskConfigId'), cbxTask.getDisplayValue(), dateFrom, fromTimefield,dateTo,
                        toTimefield, dateRecurrenceEnd, tfEmail,tfRunProgram, chkActive, taskFreq, reOccursEvery, happensOnDay,
                        happensOnMonth,checkboxRecurrence,localTimeOffset, me.getView().status, sysID, taskSeriesId);
                }
            });

        }
        else {
            taskSeriesId = 0;
            me.saveTask(cbxTask.getValue('TaskConfigId'), cbxTask.getDisplayValue(), dateFrom, fromTimefield,dateTo,
                toTimefield, dateRecurrenceEnd, tfEmail,tfRunProgram, chkActive, taskFreq, reOccursEvery, happensOnDay,
                happensOnMonth,checkboxRecurrence,localTimeOffset, me.getView().status, sysID, taskSeriesId);
        }
    },

    saveTask: function(taskConfigId, taskName, dateFrom, fromTimefield, dateTo, toTimefield, dateRecurrenceEnd,
                       tfEmail,tfRunProgram, chkActive, taskFreq, reOccursEvery, happensOnDay, happensOnMonth,
                       chkRecurrence, dateCurrent, status, sysID, taskSeriesId){

        var me = this,
            documentId = me.getView().docId,
            storePbmTaskScheduler = me.getView().pbmTaskScheduler,
            storePbmTaskSeries = me.getView().pbmTaskSeries,
            hoursTo = toTimefield.getValue().getHours(),
            minutesTo = toTimefield.getValue().getMinutes(),
            secondsTo = toTimefield.getValue().getSeconds(),
            millisecondsTo = toTimefield.getValue().getMilliseconds(),
            setPbmTaskScheduler, mode, ttTaskScheduler, ttTaskSeries, saveAction, timeZone;

        if (!sysID){
            sysID = -1;

        }

        if (!documentId){
            documentId = 0;
        }

        if (sysID == -1){
            mode = 'A';
        }
        else{
            mode = 'U';
        }
         timeZone=Ext.Date.getGMTOffset(new Date());
        //timeZone =Ext.Date.getGMTOffset(new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y')));//Atlas.user.localTimeOffset;
        if (dateRecurrenceEnd.getValue() && chkRecurrence.getValue()){
            //difference in hours
            var dateDurationHours = (dateTo.getValue() - dateFrom.getValue()) / 1000 / 60 / 60,
                //difference in days
                dateDurationDays = dateDurationHours / 24;

            dateRecurrenceEnd.getValue().setHours(hoursTo, minutesTo, secondsTo, millisecondsTo);

            if (dateTo.getValue() > dateRecurrenceEnd.getValue()){
                Ext.Msg.alert('Validation', 'To Date should be less than Task End Date');
                dateRecurrenceEnd.markInvalid('To date should be less than Task End Date');
                return;
            }

            if (taskFreq == 'Daily'){
                var hrsInDuration = reOccursEvery * 24;

                if (dateDurationHours > hrsInDuration){
                    Ext.Msg.alert('Validation', 'Difference between From date and To date should be less than ' + hrsInDuration + ' hours');
                    dateFrom.markInvalid('Difference between From date and To date should be less than ' + hrsInDuration + ' hours');
                    dateTo.markInvalid('Difference between From date and To date should be less than ' + hrsInDuration + ' hours');
                    return;
                }
            }
            else if (taskFreq == 'Weekly'){
                var arrayHappensOnDay,
                    minDiff = 7;

                happensOnDay = happensOnDay.indexOf(',') == 0 ? happensOnDay.substr(1) : happensOnDay;
                arrayHappensOnDay = happensOnDay.split(',');
                for (var idx = arrayHappensOnDay.length - 1; idx > 0; idx = idx -1){
                    minDiff = minDiff < (arrayHappensOnDay[idx] - arrayHappensOnDay[idx - 1]) ? minDiff : (arrayHappensOnDay[idx] - arrayHappensOnDay[idx - 1]);
                }
                if (dateDurationDays > minDiff){
                    Ext.Msg.alert('Validation', 'Difference between From date and To date should be less than ' + minDiff + ' days(s)');
                    dateFrom.markInvalid('Difference between From date and To date should be less than ' + minDiff + ' days(s)');
                    dateTo.markInvalid('Difference between From date and To date should be less than ' + minDiff + ' days(s)');
                    return;
                }
            }
            else if (taskFreq == 'Monthly'){
                if (dateDurationDays > 30){
                    Ext.Msg.alert('Validation', 'Difference between From date and To date should be less than 1 month');
                    dateFrom.markInvalid('Difference between From date and To date should be less than 1 month');
                    dateTo.markInvalid('Difference between From date and To date should be less than 1 month');
                    return;
                }
            }
            else if (taskFreq == 'Yearly'){
                if (dateDurationDays > 365){
                    Ext.Msg.alert('Validation', 'Difference between From date and To date should be less than 1 year');
                    dateFrom.markInvalid('Difference between From date and To date should be less than 1 year');
                    dateTo.markInvalid('Difference between From date and To date should be less than 1 year');
                    return;
                }
            }

            if (!reOccursEvery){
                reOccursEvery = 0;
            }
            else{
                reOccursEvery = parseInt(reOccursEvery);
            }

            if (!happensOnDay){
                happensOnDay = '';
            }
            else{
                if (String(happensOnDay).indexOf(',') == 0){
                    happensOnDay = happensOnDay.substr(1);
                }
            }

            if (!happensOnMonth){
                happensOnMonth = 0;
            }
            else{
                happensOnMonth = parseInt(happensOnMonth);
            }
        }
        if(me.getView().windowType == 'update'){
            var selectedRow = storePbmTaskScheduler.getAt(me.getView().taskSchedulerIdx);
            storePbmTaskSeries.clearFilter();
            //var selectedRecordSeries =me.getView().pbmTaskSeries;
            //selectedRecordSeries.loadRawData();



            selectedRow.set('systemID', sysID);
            selectedRow.set('cmsContractId', '');
            selectedRow.set('planGroupId', 0);
            selectedRow.set('planGroupName', '');
            selectedRow.set('taskConfigId', parseInt(taskConfigId));
            selectedRow.set('taskDescription', taskName);
            selectedRow.set('dueDateBegin', dateFrom.getValue());
            selectedRow.set('dueDateEnd', dateTo.getValue());
            selectedRow.set('taskStatus', status);
            selectedRow.set('documentId', documentId);                         //put in a value
            selectedRow.set('active', true);
            selectedRow.set('emailList', tfEmail.getValue());
            selectedRow.set('runProgram', tfRunProgram.getValue());
            selectedRow.set('taskSeriesId', taskSeriesId);
            selectedRow.set('ApplyToSeries', chkRecurrence.getValue());
            selectedRow.set('taskId', null);

            // storePbmTaskSeries.filter('taskSeriesId',taskSeriesId); //storePbmTaskSeries.getAt(idxPbmTaskScheduler);
            var modelTaskSeries = Ext.create('Atlas.plan.model.pbmTaskSeries');
            if (chkRecurrence.getValue()){
                if(storePbmTaskSeries.data && storePbmTaskSeries.data.items.length>0) {
                    storePbmTaskSeries.data.items.forEach(function logArrayElements(element, index, array){
                        if(storePbmTaskSeries.data.items[index].data.taskSeriesId == taskSeriesId ) {
                            storePbmTaskSeries.data.items[index].data.startDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(dateFrom.getValue());
                            storePbmTaskSeries.data.items[index].data.endDateTime =Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(dateRecurrenceEnd.getValue());
                            storePbmTaskSeries.data.items[index].data.taskFreq = taskFreq;
                            storePbmTaskSeries.data.items[index].data.reOccursEvery = reOccursEvery;
                            storePbmTaskSeries.data.items[index].data.happensOnDay = happensOnDay;
                            storePbmTaskSeries.data.items[index].data.happensOnMonth = happensOnMonth;
                            storePbmTaskSeries.data.items[index].data.taskSeriesId = taskSeriesId;
                            storePbmTaskSeries.data.items[index].crudState="U";
                            storePbmTaskSeries.data.items[index].wasCrudState="U";
                            storePbmTaskSeries.data.items[index].dirty=true;
                        }
                    });

                }
            }
        }
        else{
            var modelTaskScheduler = Ext.create('Atlas.plan.model.PbmTaskScheduler'),
                modelTaskSeries = Ext.create('Atlas.plan.model.pbmTaskSeries');
            var ddb = dateFrom.getValue();
            var dde = dateTo.getValue();

            ddb = new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(ddb,'m/d/Y H:i:s'));
            dde = new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(dde,'m/d/Y H:i:s'));

            modelTaskScheduler.set('systemID', sysID);
            modelTaskScheduler.set('cmsContractId', '');
            modelTaskScheduler.set('planGroupId', 0);
            modelTaskScheduler.set('planGroupName', '');
            modelTaskScheduler.set('taskConfigId', parseInt(taskConfigId));
            modelTaskScheduler.set('taskDescription', taskName);
            modelTaskScheduler.set('dueDateBegin', ddb);
            modelTaskScheduler.set('dueDateEnd', dde);
            modelTaskScheduler.set('taskStatus', status);
            modelTaskScheduler.set('documentId', documentId);                         //put in a value
            modelTaskScheduler.set('active', true);
            modelTaskScheduler.set('emailList', tfEmail.getValue());
            modelTaskScheduler.set('runProgram', tfRunProgram.getValue());
            modelTaskScheduler.set('taskSeriesId', taskSeriesId);
            modelTaskScheduler.set('ApplyToSeries', chkRecurrence.getValue());

            if (chkRecurrence.getValue()){
                modelTaskSeries.set('startDateTime', ddb);
                modelTaskSeries.set('endDateTime',new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(dateRecurrenceEnd.getValue(),'m/d/Y H:i:s')));
                modelTaskSeries.set('taskFreq', taskFreq);
                modelTaskSeries.set('reOccursEvery', reOccursEvery);
                modelTaskSeries.set('happensOnDay', happensOnDay);
                modelTaskSeries.set('happensOnMonth', happensOnMonth);
                modelTaskSeries.set('taskSeriesId', taskSeriesId);
            }

            storePbmTaskScheduler.insert(0, modelTaskScheduler);
            if(!chkActive.getValue()){
                storePbmTaskScheduler.data.items[0].data.active=false;
            }
            storePbmTaskSeries.insert(0, modelTaskSeries);
        }

        saveAction =[{
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }, {
            "Create": {"key": 'mode', "value": 'A'},
            "Update": {"key": 'mode', "value": 'U'},
            "Delete": {"key": 'mode', "value": 'D'}
        }];

        storePbmTaskScheduler.each(function(item,index){
            if(item.dirty == true){
                if(!chkActive.getValue()) {
                    storePbmTaskScheduler.data.items[index].data.active = false;
                }
            }
        });
        if (me.getView().updateType == 'occurrence'){
            var emptyStore = Atlas.plan.view.tasksViewModel.create().getStore('pbmTaskSeries');

            setPbmTaskScheduler = Atlas.common.utility.Utilities.saveData([storePbmTaskScheduler, emptyStore], 'shared/rx/pbmtaskscheduler/update', 'ttTaskScheduler,ttTaskSeries',[false, false], {'pMode': mode, 'pCLTZ': timeZone},
                saveAction, null);
        }
        else{
            setPbmTaskScheduler = Atlas.common.utility.Utilities.saveData([storePbmTaskScheduler, storePbmTaskSeries], 'shared/rx/pbmtaskscheduler/update', 'ttTaskScheduler,ttTaskSeries',[false, false], {'pMode': mode, 'pCLTZ': timeZone},
                saveAction, null);
        }

        if (setPbmTaskScheduler.code !== 0){
            Ext.Msg.alert('Validation', setPbmTaskScheduler.message);
            storePbmTaskScheduler.rejectChanges();
            return;
        }

        storePbmTaskScheduler.commitChanges();
        storePbmTaskSeries.commitChanges();

        me.fireEvent('afterSave', null);

        me.getView().findParentByType('form').close();
    },

    closeWindow:function(){
        // var me = this;
        // me.getView().findParentByType('form').close();
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.hide();
        }
    },

    onDateErrorChange: function(dateField, errors){
        var me = this,
            secDateField;

        if (dateField == me.getView().down('[fieldLabel = To]')){
            secDateField = me.getView().down('[fieldLabel = From]');
        }
        else{
            secDateField = me.getView().down('[fieldLabel = To]');
        }

        if (errors != ''){
            for (var idx = 0; idx < dateField.activeErrors.length; idx = idx + 1){
                if (dateField.activeErrors[idx] == 'From date should be less than To date'){
                    secDateField.isValid();
                }
            }
        }
        else{
            secDateField.isValid();
        }
    },

    onTimeErrorChange: function(timeField, errors){
        var me = this,
            secTimefield;

        if (timeField == me.getView().down('#toTimefield')){
            secTimefield = me.getView().down('#fromTimefield');
        }
        else{
            secTimefield = me.getView().down('#toTimefield');
        }

        if (errors != ''){
            for (var idx = 0; idx < timeField.activeErrors.length; idx = idx + 1){
                if (timeField.activeErrors[idx] == 'From date and time should be less than To date and time'){
                    secTimefield.isValid();
                }
            }
        }
        else{
            secTimefield.isValid();
        }
    },

    uploadDocBtnWindow: function(){
        var me = this,
            view = me.getView();

        var uploadWin = Ext.create('Ext.window.Window', {
            title: 'Upload Document',
            closable: true,
            layout: {type: 'fit', align: 'stretch'},
            modal: true,
            floating: true,
            draggable: true,
            resizable: true,
            width: 500,
            height: 300,
            items: [{
                xtype: 'merlin.fileuploader',
                //controller: 'common-singlefileuploadercontroller',
                tbar: {
                    xtype: 'displayfield',
                    value: 'Please select one file to upload',
                    width: '100%'
                },
                width: '100%',
                height: '100%',
                keyType: 'imagePBMUpload',
                fileType: 'csv',
                maxUploadNum: 1,
                endpoint: 'shared/rx/document/update'
            }]
        });

        view.add(uploadWin);
        uploadWin.show();

        /*var uploadDocWindow = Ext.create('Ext.form.Panel', {
         title: 'Upload Document',
         layout: 'vbox',
         floating: true,
         modal: true,
         closable: true,
         width: 400,
         autoShow: true,

         items: [{
         xtype: 'container',
         layout: 'hbox',
         width: '100%',
         items: [{
         xtype: 'displayfield',
         fieldLabel: 'Description',
         flex: 10
         }, {
         xtype: 'textfield',
         itemId: 'descripField',
         flex: 29,
         validator: function(){
         var descripLength = this.getValue().length;

         if (descripLength == 0){
         return 'Must input a value';
         }
         else {
         return true;
         }
         },
         listeners: {
         change: function(){
         var saveBtn = this.up('[title= Upload Document]').down('[text= Save]'),
         fieldFile = this.up('[title= Upload Document]').down('filefield');

         if ((this.validate() == true) && (fieldFile.validate() == true)){
         saveBtn.enable();
         }
         else{
         saveBtn.disable();
         }
         }
         }
         }, {
         xtype: 'container',
         flex: 1
         }]
         }, {
         layout: 'hbox',
         xtype: 'container',
         width: '100%',
         items: [{
         xtype: 'displayfield',
         fieldLabel: 'File',
         flex: 10
         }, {
         xtype: 'filefield',
         buttonText: '',
         buttonConfig: {
         iconCls: 'x-fa fa-search-plus'
         },
         flex: 29,
         emptyText: 'Select a file',
         validator: function(val){
         var pathLength = this.getValue().length;

         if (this.getValue() == ''){
         return 'Must input a value';
         }
         else if(this.getValue().substring(pathLength - 3) != 'csv'){
         return 'Only .csv files are allowed';
         }
         else {
         return true;
         }
         },
         listeners: {
         change: function(){
         var saveBtn = this.up('[title= Upload Document]').down('[text= Save]'),
         fieldDescrip = this.up('[title= Upload Document]').down('#descripField');

         if ((this.validate() == true) && (fieldDescrip.validate() == true)){
         saveBtn.enable();
         }
         else{
         saveBtn.disable();
         }
         }
         }
         }, {
         xtype: 'container',
         flex: 1
         }]
         }],
         dockedItems: [{
         dock: 'bottom',
         xtype: 'toolbar',
         items: [
         '->',
         {
         xtype: 'button',
         text: 'Save',
         iconCls: 'x-fa fa-paperclip',
         disabled: true,
         listeners: function(){
         var fieldDescrip = this.up('[title= Upload Document]').down('#descripField'),
         fieldFile = this.up('[title= Upload Document]').down('filefield'),
         pcKeyType = 'imagePBMUpload';
         //plcImgData = Ext.util.Base64.encode(
         //moreInfo = this.getEl().down('input[type=file]').dom.files[0]

         //loadDocument method here

         /!*The following will give a success message, disable the recurence pattern
         section of the add new task window, and hide the upload document window

         if (success){
         Ext.Msg.alert('Success', 'Document uploaded successfully');
         me.getView().down('[title: Recurrence Pattern]').disable();
         this.up('[title: Upload Document]').hide();
         }
         else{
         Ext.Msg.alert('Failure', 'No file uploaded');
         }*!/
         }
         }, {
         xtype: 'tbseparator'
         }, {
         xtype: 'button',
         text: 'Reset',
         iconCls: 'x-fa fa-repeat',
         listeners: {
         click: function(){
         var fieldDescrip = this.up('[title= Upload Document]').down('#descripField'),
         fieldFile = this.up('[title= Upload Document]').down('filefield');

         fieldDescrip.setValue('');
         fieldFile.setRawValue('');
         }
         }
         }]
         }]
         });*/
    },

    uploadDocBtnPopup:function(documentIDList){
        var me = this,
            view = me.getView(),
            uploadWin = view.down('[title = Upload Document]'),
            btnDeleteDoc = view.down('[handler = deleteDocument]'),
            fieldContainerRecurrence = view.down('#recurrenceDisplay');


        if (view.down('#fileUploadGrid')){
            view.docId = documentIDList[0];

            btnDeleteDoc.setVisible(true);

            fieldContainerRecurrence.mask();

            Ext.Msg.alert('Success', 'Document uploaded successfully');

            uploadWin.close();
        }




    },

    deleteDocument: function(btnDeleteDoc){
        var me = this,
            view = me.getView(),
            fieldContainerRecurrence = view.down('#recurrenceDisplay');

        Ext.Msg.confirm('Confirm', 'Are you sure you want to remove this document?', function(buttonId){
            if(buttonId == 'yes'){
                view.docId = 0;
                btnDeleteDoc.setVisible(false);
                fieldContainerRecurrence.unmask();
            }
        });

    },
    onLeaveDateRange: function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    }
});