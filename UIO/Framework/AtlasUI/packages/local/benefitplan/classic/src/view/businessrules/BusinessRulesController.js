/**
 * Created by s6393 on 10/27/2016.
 */
//BusinessRulesController
Ext.define('Atlas.benefitplan.view.businessrules.BusinessRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitPackage-businessRules',
    listen: {
        controller: {
            '*': {
                onWorkFlowUpdate:'onWorkFlowUpdate'
            }
        }
    },
    onWorkFlowUpdate: function(args) {
        var isReadOnly = args != undefined && args.status != undefined;
        this.getViewModel().set('isReadOnly', isReadOnly);
    },
    load: function (pbpSK,canChangePBPBnftPlanList) {
		Ext.getBody().mask('Loading');
        var me = this,
            vm = this.getViewModel(),
            store = vm.getStore('benefitPackageBusinessRules'),
            proxy = store.getProxy();
        vm.getStore('Question10SelOpt').loadData([],false);
        vm.getStore('Question10ChildAnswers').loadData([],false);
        vm.getStore('Question10Dropdown').loadData([],false);
		vm.set('isReadOnly', !canChangePBPBnftPlanList);
        proxy.setExtraParams({
            'PBPSK': pbpSK
        });
        me.PBPSK = pbpSK;
        store.load(function (records) {
            me.createRadioButtonGroups(this, records);
            Ext.getBody().unmask();
        });
    },
    createRadioButtonGroups: function (store, records) {
        var vm = this.getViewModel(),
            rulesQuestionRadioGroup = this.getView().down('container[reference=rulesContainer]'),
            questionsArray = [],
            possibleOptions = [],
            possibleChildOptions = [];
        rulesQuestionRadioGroup.removeAll();
        if(vm.get('isReadOnly')){
            var messageLabel= Ext.create('Ext.form.Label', {
                cls:'m-red-color',
                text: 'Package is Approved. Cannot modify business Rules'});
            questionsArray.push(messageLabel);
        }
        for (var i in records) {
            var questionObj = records[i],
                questionRadioGroup = '';
            questionObj.set('CurrentUser', vm.get('user').un);
            if (questionObj.get('ChildQuestion') != null) {
                if (possibleOptions.length <= 0) {
                    possibleOptions = questionObj.get('PossibleAnswers');
                }
                if(questionObj.get('PBPConfgPrptySK') != 0){
                    vm.getStore('Question10SelOpt').add(questionObj);
                }
                if(questionObj.get('ChildPossibleAnswers') != null &&  questionObj.get('ChildPossibleAnswers') != ''){
                    if (possibleChildOptions.length <= 0) {
                        possibleChildOptions = questionObj.get('ChildPossibleAnswers');
                    }
                }
            }
            else {
                questionRadioGroup =
                {
                    fieldLabel: questionObj.get('ConfgPrptyTypeSK') + ' . ' + questionObj.get('Question'),
                    items: this.createRadioButtonOptions(questionObj)
                };
                questionsArray.push(questionRadioGroup);
            }
        }
        rulesQuestionRadioGroup.add(questionsArray);
        if(possibleOptions.length > 0) {
            for(var j in possibleOptions) {
                vm.getStore('Question10Dropdown').add({'PossibleAnswers': possibleOptions[j]});
            }
        }
        if(possibleChildOptions.length > 0) {
            for(var j in possibleChildOptions) {
                vm.getStore('Question10ChildAnswers').add({'ChildPossibleAnswers': possibleChildOptions[j]});
            }
        }
        rulesQuestionRadioGroup.add(this.create10GridField());
    },
    create10GridField:function() {
        var gridfield='',
            vm=this.getViewModel(), quest10Text='',
            q10Items = vm.getStore('Question10SelOpt').data.items;
        if(q10Items.length > 0){
            quest10Text=q10Items[0].data['ConfgPrptyTypeSK'] + ' . ' + q10Items[0].data['Question'];
        }
        else
        {
            quest10Text= '10 . ' + vm.getStore('benefitPackageBusinessRules').findRecord('ConfgPrptyTypeSK', 10, 0, false, false, true).data['Question'];
        }
        var grid = Ext.create('Ext.grid.Panel', {
           reference: 'Question10Grid',
            minHeight: 200,
            defaults: {
                sortable: true,
                filter: {type: 'string'}
            },
            viewConfig: {
                loadMask: false
            },
            plugins: [{
                ptype: 'rowediting',
                pluginId: 'rowediting',
                reference: 'rowediting',
                clicksToEdit: 2,
                clicksToMoveEditor: 1,
                autoCancel: false
            }],
            bind: {
                store: '{Question10SelOpt}'

            },
            dockedItems: [
                {
                    xtype:'label',
                    dock: 'top',
                    cls:'x-form-item-label-default',
                    text:quest10Text
                },
                {
                    xtype:'toolbar',
                    dock: 'top',
                    items:[{
                        text: 'Add Row',
                        itemId: 'addRow',
                        handler: 'onQuestion10GridAddRowClick',
                        bind:{
                            disabled:'{isReadOnly}'
                        }
                    },
                    {
                        text: 'Remove Row',
                        itemId: 'removeRow',
                        handler: 'onQuestion10GriddRemoveRowClick',
                        bind: {
                            disabled: '{!Question10Grid.selection || isReadOnly}'
                        }
                    }]
                }
            ],
            listeners: {
                canceledit: 'onQuestion10GridItemCancelEdit',
                edit: 'onQuestion10GridItemComplete',
                beforeedit:'onQuestion10GridBeforeEdit',
                validateedit:'onQuestion10GridItemValidateEdit'
            }
        }),
        columnstoAdd=this.createQ10GridColumns();
        grid.reconfigure(columnstoAdd);
        if(q10Items.length > 0){
            gridfield={
                fieldLabel:q10Items[0].data['ConfgPrptyTypeSK'] + ' . ' + q10Items[0].data['Question'],
                items:grid
            };
        }
        else
        {
            var recExist = vm.getStore('benefitPackageBusinessRules').findRecord('ConfgPrptyTypeSK', 10, 0, false, false, true);
            gridfield=
            {
                fieldLabel: '10 . ' + recExist.data['Question'],
                items: grid
            };
        }
        return gridfield;
    },
    createQ10GridColumns:function(){
        var columns=[],
            newColumn1 = {
                text: 'Relationship(s)',
                flex: 1,
                dataIndex: 'CurrentAnswer',
                editor: {
                    xtype: 'combo',
                    emptyText: 'Select Relationship(s)',
                    bind: {
                        store: '{Question10Dropdown}'
                    },
                    displayField: 'PossibleAnswers',
                    valueField: 'PossibleAnswers',
                    allowBlank: false,
                    enableKeyEvents: true,
                    typeAhead: true,
                    forceSelection: true,
                    queryMode: 'local'
                }
            };
        columns.push(newColumn1);
        var newColumn2 = {
            text:'Live in the same household',
            flex: 1,
            dataIndex: 'ChildCurrentAnswer',

            editor: {
                xtype: 'combo',
                emptyText: 'Select',
                bind: {
                    store: '{Question10ChildAnswers}'
                },
                displayField: 'ChildPossibleAnswers',
                valueField: 'ChildPossibleAnswers',
                allowBlank: false,
                enableKeyEvents: true,
                typeAhead: true,
                forceSelection: true,
                queryMode: 'local'
            }
        };
        columns.push(newColumn2);
         var newColumn3 = {
             hidden:true,
             dataIndex: 'ConfgPrptyTypeChildSK'
         };
        columns.push(newColumn3);
        var newColumn4 = {
            hidden:true,
            dataIndex: 'ConfgPrptyTypeSK'
        };
        columns.push(newColumn4);
        var newColumn5 = {
            hidden:true,
            dataIndex: 'PBPConfgPrptySK'
        };
        columns.push(newColumn5);
        var newColumn6 = {
            hidden:true,
            dataIndex: 'PBPSK'
        };
        columns.push(newColumn6);
        return columns;
    },
    onQuestion10GridAddRowClick:function(){
        var grid = this.lookup('Question10Grid'),
            newRecord = new Atlas.benefitplan.model.BusinessRule({
                CurrentAnswer:'',
                ChildCurrentAnswer:'No',
                ConfgPrptyTypeChildSK:0,
                ConfgPrptyTypeSK:10,
                PBPConfgPrptySK:0,
                PBPSK: this.PBPSK,
                CurrentUser: this.getViewModel().get('user').un
            });
        grid.getStore('Question10SelOpt').insert(0, newRecord);
        grid.findPlugin('rowediting').startEdit(newRecord, 0);
        this.addedRow = true;
    },
    onQuestion10GriddRemoveRowClick:function(){
        var grid = this.lookup('Question10Grid');
        grid.findPlugin('rowediting').cancelEdit();
        var sm = grid.getSelectionModel();
        sm.getSelection()[0].data.IsDeleted = true;
        grid.store.remove(sm.getSelection());
        this.getViewModel().set('changed', true);
        if (grid.store.getCount() > 0) {
            sm.select(0);
        }
    },
    onQuestion10GridItemCancelEdit:function() {
        //if this was an added row, remove it
        if (this.addedRow) {
            var store = this.getViewModel().getStore('Question10SelOpt');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
    },
    storeUpdated: function() {
        this.getViewModel().set('changed', true);
    },
    onQuestion10GridItemComplete:function(editor, e){
        this.addedRow = false;
        e.record.set('CurrentUser',this.getViewModel().get('user').un);
    },
    /*
     * Generic method to show a message dialog to prevent repeated code
     */
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
    onQuestion10GridItemValidateEdit:function(editor, context){
        var result=true,
            me = this;
        this.lookup('Question10Grid').getStore().each(function(row){
            if (row.data.PBPConfgPrptySK != context.record.data.PBPConfgPrptySK && row.data.CurrentAnswer.toLowerCase() == context.newValues.CurrentAnswer.toLowerCase()) {
                me.showMessage('Error Information', 'Duplicate Not Allowed! Please Change');
                result=false;
                return result;
            }
        });
        return result;
    },
    onQuestion10GridBeforeEdit:function(){
        var relToFilter=[];
        this.lookup('Question10Grid').getStore().each(function(row){
            if(row.data.CurrentAnswer != ''){
                relToFilter.push(row.data.CurrentAnswer);
            }
        });
        this.getViewModel().getStore('Question10Dropdown').filter(function(r) {
            return  !Ext.Array.contains(relToFilter,r.get('PossibleAnswers'));
        });
    },
    createRadioButtonOptions : function(questionObj){
        var possibleAnswer = questionObj.get('PossibleAnswers'),
            currentAnswer = questionObj.get('CurrentAnswer'),
            questionId = questionObj.get('ConfgPrptyTypeSK'),
            possibleAnswers = [],
            vm=this.getViewModel(),
            label= Ext.create('Ext.form.Label', {
                cls:'x-form-item-label-default',
                text:questionObj.get('ConfgPrptyTypeSK') + ' . ' + questionObj.get('Question')
            });
        possibleAnswers.push(label);
            for(var i in possibleAnswer) {
                var radio = Ext.create('Ext.form.field.Radio',{
                    "boxLabel":possibleAnswer[i],
                    "name": questionId,
                    "inputValue": possibleAnswer[i],
                    value: currentAnswer,
                    handler: 'onAnswerRadioChange',
                    "questionObj" : questionObj
                });
                radio.setDisabled(vm.get('isReadOnly'));
                possibleAnswers.push(radio);
            }
        return possibleAnswers;
    },
    onAnswerRadioChange:function(){
      this.getViewModel().set("changed", true);
    },
    onBusinessRulesSave : function () {
        var me = this,
            vm = me.getViewModel();
        Ext.Msg.show({
            title: 'Confirm Save',
            msg: 'Are you sure you want to save?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function () {

                var store = vm.getStore('benefitPackageBusinessRules'),
                    records = store.data,
                    vms = vm.getStore('Question10SelOpt');
                vms.data.items.forEach(function (item) {
                    if(item.data.PBPConfgPrptySK ==0){
                        store.add(item);
                    }
                    else{
                        var recExist = store.findRecord('PBPConfgPrptySK', item.data.PBPConfgPrptySK, 0, false, false, true);
                        if (recExist.data.ChildCurrentAnswer != item.data.ChildCurrentAnswer) {
                            recExist.data.ChildCurrentAnswer = item.data.ChildCurrentAnswer;
                        }
                    }
                });
                var answers = me.getView().down('form').getValues();
                for (var j in answers) {
                    if (answers.hasOwnProperty(j)) {
                        if (records) {
                            if (records.length > 1) {
                                var record = records.find('ConfgPrptyTypeSK', j);
                                if (record == -1) {
                                    return;
                                }
                                else {
                                    record.set('PBPConfgPrptySK', record.data.PBPConfgPrptySK);
                                    record.set('ConfgPrptyTypeSK', record.data.ConfgPrptyTypeSK);
                                    record.set('CurrentAnswer', answers[j]);
                                    record.set('CurrentUser', vm.get('user').un);
                                }
                            }
                        }
                    }
                }
                store.getProxy().setExtraParams({});
                if(vm.get('changed')) {
                    if(store.getNewRecords() || store.getUpdatedRecords() || store.getRemovedRecords()){
                        Ext.getBody().mask('Saving');
                    }
                    store.sync(
                        {
                            // save the record to the server
                            success: function () {
                                me.showMessage('Success', 'Data saved successfully');
                                vm.set("changed", false);
                                me.getView().hide();
                            },
                            failure: function () {
                                me.showMessage('Failed to Save', 'Data failed to save:');
                                me.getView().hide();
                            },
                            callback:function(){
                                Ext.getBody().unmask();
                            }
                        }, this);
                }
                else {
                    me.showMessage('Success', 'Data saved successfully');
                }
            }
        });
    },
    onBusinessRulesCancel: function() {
        var me = this;
        if(me.getViewModel().get('changed')) {
            Ext.Msg.show({
                title: 'Confirm Cancel',
                msg: 'Are you sure you want to cancel and lose your changes?',
                buttons : Ext.Msg.YESNO,
                closable: false,
                draggable: false,
                resizable: false,
                fn: function(btn) {
                    if (btn == 'yes') {
                        me.getView().hide();
                    }
                }
            });
        } else {
            me.getView().hide();
        }
    }
});