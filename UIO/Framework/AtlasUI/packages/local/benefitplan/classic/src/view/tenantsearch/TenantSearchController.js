Ext.define('Atlas.benefitplan.view.tenantsearch.TenantSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-tenantsearchcontroller',

    onNewTenantHierarchyClick: function (grid, record, item) {
        var tenantFamilyId = 0;
        var tenantSearchGrid = Ext.getCmp('tenantSearchPanelGridId');
        var seletionModel = tenantSearchGrid.getSelectionModel();
        if (seletionModel.hasSelection()) {
            seletionModel.deselectAll();
        }
		//CAH possibly ask through events if the hierarchy forms are dirty.
		//if so, ask if they want to lose changes
		//if so, fire the event, else maybe focus the hierarchy page
		this.fireEvent('closeHierarchyConfiguration');
        this.fireEvent('openView', 'merlin', 'benefitplan', 'configuration.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: tenantFamilyId,
            rootsk: tenantFamilyId,
            viewtype: 10
        });
    },
    init: function(){
      var vm = this.getViewModel();
        Ext.getBody().mask('loading');
        vm.getStore('lob').load(function(){
            Ext.getBody().unmask();
        });
    },
    hasGridSelected: function () {
        var getGrid=  Ext.getCmp('tenantSearchPanelGridId');
        return getGrid.getSelectionModel().hasSelection();
    },
    clearGridSelection:function () {
        var getGrid=  Ext.getCmp('tenantSearchPanelGridId');
        var selected = getGrid.getSelectionModel();
        if (selected.hasSelection()) {
            selected.deselectAll();
        }
    },
    getAtlasId: function () {
        if(this.hasGridSelected())
        {
            var getGrid=  Ext.getCmp('tenantSearchPanelGridId');
            var row = getGrid.getSelectionModel().getSelection()[0];
            return row.get('TenantFamSK');
        }
        else return 0;
    },
    getSelection: function () {
        if(this.hasGridSelected())
        {
            var getGrid=  Ext.getCmp('tenantSearchPanelGridId');
            var row = getGrid.getSelectionModel().getSelection()[0];
            return row;
        }
        else return null;
    },
    onGridItemClick: function (grid, record, item) {
        var thisrecord = this.getSelection();
        var tenantFamilyId = this.getAtlasId();
        var itemId = tenantFamilyId;
        var viewType = 10;
        //CAH possibly ask through events if the hierarchy forms are dirty.
        //if so, ask if they want to lose changes
        //if so, fire the event, else maybe focus the hierarchy page
        if(thisrecord != null) {
            if (thisrecord.get('PopGrpSK')) {
                itemId = thisrecord.get('PopGrpSK');
                viewType = 50;
            }
            else if (thisrecord.get('GrpSK')) {
                itemId = thisrecord.get('GrpSK');
                viewType = 40;
            }
            else if (thisrecord.get('AcctSK')) {
                itemId = thisrecord.get('AcctSK');
                viewType = 30;
            }
            else if (thisrecord.get("TenantSK")) {
                itemId = thisrecord.get('TenantSK');
                viewType = 20;
            }
        }
		this.fireEvent('closeHierarchyConfiguration');
        this.fireEvent('openView', 'merlin', 'benefitplan', 'configuration.Main', {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: itemId,
            rootsk: tenantFamilyId,
            viewtype: viewType
        });
    },
    onTenantSearch: function (button) {
        // get reference to the container
        var searchView = button.up('container');
        //get the checked Radio button
        var searchTypeSelected = searchView.getComponent('searchRadioType').getChecked()[0];
        if(searchTypeSelected){
            var searchType = searchTypeSelected.getGroupValue();
        }
        var comboValue = this.lookup('tenantsearchcombo').getValue();
        var comboData = this.lookup('tenantsearchcombo').rawValue;
        var searchText = this.lookup('tenantSearchText').getValue();
        if( searchType != 3 && (searchText == '' || searchText.length <3 ) )
        {
            Ext.Msg.show({
                title: 'Error',
                msg: 'Please enter at-least 3 characters in search text box.',
                buttons: Ext.Msg.OK,
                closable: false,
                draggable: false,
                resizable: false
            });
        }
        else {
			var vm = this.getViewModel();
            var store = vm.getStore('tenantsearch');
            if(searchType != 3){

                store.getProxy().setExtraParam('searchText', searchText);
                store.getProxy().setExtraParam('searchType', searchType);
            }
            else{
                store.getProxy().setExtraParam('searchText', comboData);
                store.getProxy().setExtraParam('searchType', 3);
            }
            Ext.getBody().mask('loading');
            store.load(function(){
                Ext.getBody().unmask();
            });
        }

    },
    onRadioChange:  function(radiogroup,radio){
        var checkRadio = radio.tenantSearchType;
        this.lookup('tenantSearchText').reset();

        if(checkRadio == 3){
            this.getViewModel().set('changeType',true);
            this.lookup('tenantsearchcombo').setValue('');
        }
        else{
            this.getViewModel().set('changeType',false);
        }
    },

	onSearchEnterKey: function(field, e){
		if (e.getKey() == e.ENTER) {
			this.onTenantSearch(field);
		}
	}
});
