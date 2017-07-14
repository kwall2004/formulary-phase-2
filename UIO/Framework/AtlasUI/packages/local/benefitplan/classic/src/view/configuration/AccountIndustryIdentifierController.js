/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.view.configuration.AccountIndustryIdentifierController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accountIndustryIdentifierController',
    listen: {
        //listen to events using GlobalEvents
        controller: {
            '*': {
                loadHierarchyGridData: 'loadData'
            }
        }
    },
    /**
     * Called when the view is created
     */
    init: function() {
		this.isvalid = true;
        this.addedRow = false;
        this.tenantSK = 0;
        this.acctSK =0;
    },
    loadData: function(args) {
        // load tenant payers
        this.tenantSK = args.parentSK;
        var vm = this.getViewModel();
        this.acctSK = vm.get('tenantHierarchyEntityId');
        // load tenant payers
        var tStore = vm.getStore('tenantIndustryIdentifier');
        tStore.getProxy().setExtraParam('tenantSK', args.parentSK);
        tStore.load();
       // load combo types
        var cStore = vm.getStore('typesCombo');
        cStore.getProxy().setExtraParam('tenantSK', args.parentSK);
        cStore.load();
        // load account level payers
        var aStore = vm.getStore('accountIndustryIdentifier');
        aStore.getProxy().setExtraParam('acctSk',  this.acctSK );
        aStore.load();
    },
    onPayerTypeSelected: function(combo) {
        var tStore = this.getViewModel().getStore('valuesCombo');
        tStore.getProxy().setExtraParam('tenantSK',  this.tenantSK );
        tStore.getProxy().setExtraParam('type', combo.getValue());
        tStore.load();
    },
    onPayerValueSelected: function(combo, record) {
        var selected = this.getView().getComponent('BCNGrid').getSelectionModel();
        if (selected.hasSelection())
        {
            var row = selected.getSelection()[0];
            if(row.phantom)
            {
                if(row.data.ValueID==0)
                    row.set('ValueID',record.data.ValueID);
                if(row.data.TenantTypeKey==0)
                    row.set('TenantTypeKey',record.data.TenantTypeKey)
            }
        }
    },
    getPhantomData: function () {
        var newRows =[];
        var aStore = this.getViewModel().getStore('accountIndustryIdentifier');
        aStore.getProxy().setExtraParam('acctSk',  this.acctSK );
        aStore.load();
        var rows = aStore.data.items;
        for (var i = 0; i < rows.length; i++) {
            var isNew = rows[i].phantom;
            if (isNew) {
                newRows.push(rows[i]);
            }
        }
       this.getViewModel().set('changeAccountValue',true);
        return newRows;
    },
    onSelectionChange: function () {
        var getGrid=  this.getView().getComponent('BCNGrid'),
            removeButton =  this.lookup('removeRow');
        // check if the record is from the server or new
        var selected = getGrid.getSelectionModel();
        if (selected.hasSelection()) {
            var row = selected.getSelection()[0];
            if(!row.phantom)
            {
                getGrid.getPlugin('rowEditing').disable();
                Ext.Msg.show({
                    title: 'Warning',
                    msg: 'Saved BIN/PCN/PayerID records are not allowed to Edit.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
                removeButton.disable(true);
            }
            else
            {
                getGrid.getPlugin('rowEditing').enable();
                removeButton.enable(true);
            }
        }
    },
    onRender:function(value) {
        var rec = this.getViewModel().getStore('payerTypes').findRecord('Value', value, 0, false, false, true);
        if (rec)
        {
            return rec.get('Text');
        }
        return '&mdash;';
    },
    onAddClick: function () {
        var newRecord = new Atlas.benefitplan.model.AccountIndustryIdentifier({ });
        this.getViewModel().getStore('accountIndustryIdentifier').insert(0, newRecord);
        this.getView().getComponent('BCNGrid').getPlugin('rowEditing').startEdit(newRecord, 0);
		this.addedRow = true;
    },
    onRemoveClick: function () {
        var getGrid = this.getView().getComponent('BCNGrid');
        getGrid.findPlugin('rowediting').cancelEdit();
        var selected = getGrid.getSelectionModel();
        if (selected.hasSelection())
        {
            var row = selected.getSelection()[0];
            if(!row.phantom)
            {
                getGrid.clicksToMoveEditor =2;
                var removeButton =  this.lookup('removeRow');
                removeButton.disable(true);
            }
            else {
                var selection = selected.getSelection()[0];
                if (selection) {
                    var store = getGrid.getStore();
                    store.remove(selection);
                    var hasPhantom = false;
                    if(store.data.length > 0)
                    {
                        var rows = store.data.items;
                        for (var i = 0; i < rows.length; i++) {
                            var isNew = rows[i].phantom;
                            if (isNew) {
                                hasPhantom = true;
                            }
                        }
                    }
                    if(hasPhantom) {
                        this.fireEvent('gridModified');
                    }
                }
            }
        }
    },
    isGridValid: function() {
        return this.isvalid;
    },
    onGridItemStartEdit: function(){
        this.isvalid = false;
        this.fireEvent('gridModified');
    },
    onGridItemCancelEdit: function(){
        this.isvalid = true;
        this.fireEvent('gridModified');
        //if this was an added row, remove it
        if (this.addedRow) {
            var store = this.getViewModel().getStore('accountIndustryIdentifier');
            if(store.getAt(0).data.IndustryIdentifier == 0){
                store.remove(store.getAt(0));
            }
            this.addedRow = false;
        }
    },
    onGridItemComplete: function(){
        this.isvalid = true;
        this.addedRow = false;
        this.fireEvent('gridModified');
    }
});