/**
 * Created by s6393 on 9/29/2016.
 */
Ext.define('Atlas.benefitplan.view.configuration.TenantIndustryIdentifierController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tenantIndustryIdentifierController',
    /**
     * Called when the view is created
     */

    listen: {
        //listen to events using GlobalEvents
        controller: {
            '*': {
                loadHierarchyGridData: 'loadData'
            }
        }
    },
    init: function() {
		this.isvalid = true;
    },
    loadData: function() {
        Ext.getBody().mask('loading');
        var vm = this.getViewModel();
        var store = vm.getStore('tenantIndustryIdentifier');
        store.getProxy().setExtraParam('tenantSK', vm.get('tenantHierarchyEntityId'));
        store.load(function(){
            Ext.getBody().unmask();
        });
    },
    getPhantomData: function () {
        var newRows =[],
            rows = this.getViewModel().getStore('tenantIndustryIdentifier').data.items;
        for (var i = 0; i < rows.length; i++) {
            var isNew = rows[i].phantom;
            if (isNew) {
                newRows.push(rows[i]);
            }
        }
        this.getViewModel().set('changeTenantData',true);
        return newRows;
    },
    onRender:function(value) {
        var rec = this.getViewModel().getStore('payerTypes').findRecord('Value', value, 0, false, false, true);
        if (rec)
        {
            return rec.get('Text');
        }
        return '&mdash;';
    },
    onSelectionChange: function () {
        var getGrid = this.getView().getComponent('BCNGrid'),
            removeButton =  this.lookup('removeRow');
        // check if the record is from the server or new
        if (getGrid.getSelectionModel().hasSelection()) {
            var row = getGrid.getSelectionModel().getSelection()[0];
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
    onAddClick: function () {
        var newRecord = new Atlas.benefitplan.model.TenantIndustryIdentifier({ });
        this.getViewModel().getStore('tenantIndustryIdentifier').add(newRecord);
        this.getView().getComponent('BCNGrid').findPlugin('rowediting').startEdit(newRecord);
		this.addedRow = true;
    },
    onRemoveClick: function () {
        var getGrid=  this.getView().getComponent('BCNGrid');
        getGrid.findPlugin('rowediting').cancelEdit();
        if (getGrid.getSelectionModel().hasSelection())
        {
            if(!getGrid.getSelectionModel().getSelection()[0].phantom)
            {
                getGrid.clicksToMoveEditor = 2;
                this.lookup('removeRow').disable(true);
            }
            else {
                var selection = getGrid.getSelectionModel().getSelection()[0];
                if (selection) {
                    var store = getGrid.getStore();
                    store.remove(selection);
                    var hasPhantom = false;
                    if(store.data.length > 0)
                    {
                        var rows = store.data.items;
                        for (var i = 0; i < rows.length; i++) {
                            if (rows[i].phantom) {
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
        this.isvalid = true;
        this.fireEvent('gridModified');
        this.fireEvent('tenantHierarchyGridEditing',{
            editinggrid: true
        });
    },
    onGridItemCancelEdit: function() {
        this.isvalid = true;
        this.fireEvent('gridModified');
        //if this was an added row, remove it
        if (this.addedRow) {
            var store = this.getViewModel().getStore('tenantIndustryIdentifier');
            store.remove(store.getAt(0));
            this.addedRow = false;
        }
        this.fireEvent('tenantHierarchyGridEditing',{
            editinggrid: false
        });
    },
    onGridItemComplete: function() {
        var me = this;
        Ext.Msg.show({
            title: 'Confirm Valid',
            msg: 'Is the set of BIN, PCN, and Payer IDs you entered approved by Relay Health, Emdeon and valid?',
            buttons : Ext.Msg.YESNO,
            closable: false,
            draggable: false,
            resizable: false,
            fn: function(btn) {
                me.addedRow = false;
                me.fireEvent('gridModified');
                if(btn == 'no') {
                    var store = me.getViewModel().getStore('tenantIndustryIdentifier');
                    var newRecord = store.getAt(0);
                    me.getView().getComponent('BCNGrid').findPlugin('rowediting').startEdit(newRecord, 0);
                } else {
                    me.fireEvent('tenantHierarchyGridEditing',{
                        editinggrid: false
                    });
                }
            }
        });
    }
});