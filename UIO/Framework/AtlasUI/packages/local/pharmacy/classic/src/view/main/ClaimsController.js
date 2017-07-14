Ext.define('Atlas.pharmacy.view.main.ClaimsController', {
    //extend: 'Ext.app.ViewController',
    extend: 'Atlas.common.view.sharedviews.ClaimsController',
    alias: 'controller.pharmacy-main-claims',
    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    listen: {
        controller: {
            'pharmacy': {
                datachanged: 'onModuleDataChange'
            }
        }
    },

    boxReady: function () {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            pharmacy = vm.get('activePharmacy');
        //view.down('[name=pcEnd]').setValue(new Date());
        //view.down('[name=pcStart]').setValue(Ext.Date.subtract(new Date(), Ext.Date.DAY, 3));

        //this.onModuleDataChange();

        //if (pharmacy && pharmacy.get('ncpdpid')) {
        //    Ext.defer(function () {
        //        me.lookup('ncpdpidClaims').setValue(pharmacy.get('ncpdpid'));
        //        me.lookup('ncpdpidClaims').setRawValue(pharmacy.get('ncpdpid'));
        //        me.lookup('ncpdpidClaims').setDisabled(true);
        //
        //    }, 300);
        //
        //}
    },

    onModuleDataChange: function (origin) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            pharmacy = vm.get('activePharmacy');

        //Prevent any data collisions between tabs
        if (origin && origin !== view.ownerCt.id) {
            return;
        }

        if (pharmacy && pharmacy.get('ncpdpid')) {
            view.down('form').enable();
            view.down('[name=pcPharmID]').setValue(pharmacy.get('ncpdpid'));
            vm.getStore('claims').removeAll();
        }
    },

    onClaimsSearch: function () {
        //------------------------------------------------------------------------------
        var view = this.getView();
        var vm = this.getViewModel(),
            claimsStore = vm.getStore('claims'),
            parentViewModel,
            ncpdpId,
            where = '';

        ncpdpId = vm.get('ncpdpId');
        this.fireEvent('SearchClaimsCommonController', 'ncpdpId', ncpdpId);
    },

    // Fix #768. Export complete dataset.
    // Should be tested once Claims are available. Seems that there is a bug that prevents filters to be shown.
    onExcelExport: function () {
        var grid = this.getView().down('grid');
           // fileName = 'Claims';


        Atlas.common.utility.Utilities.exportToExcel(grid.getStore());

        // grid.saveDocumentAs({
        //     type: 'xlsx',
        //     title: fileName,
        //     fileName: fileName + '.xlsx'
        // });
    },

    onPDFExport: function () {
        //TBD Function disabled in original Merlin
    }

    /*gridItem_DblClick: function (grid, rcd) {
        var claimId = rcd.data.claimID;
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');
        me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
            atlasId: claimId,
            pClaimId: claimId
        }, null);
    }*/
});
