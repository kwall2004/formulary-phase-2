/**
 * Created By: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/12/2016
 * Origin: MERLIN - Member
 * Description: View Controller for the Formulary Approval page
 **/

Ext.define('Atlas.formulary.view.FormularyApprovalViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formularyapprovalviewcontroller',

    onViewChangesButtonCLick:  function (grid, rowIndex) {
        var me = this,
            win;
        var view = me.getView();
        var vm = me.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        vm.set('FormularyID',rec.data['FormularyID'] );
        vm.set('FormularyVersion',rec.data['FormularyVersion'] );
        vm.set('systemID',rec.data['systemID'] );
        vm.set('FormularyName',rec.data['FormularyName'] );
        vm.set('Stat',rec.data['Stat'] );
        vm.set('EffectiveDate',rec.data['EffectiveDate'] );

         win = Ext.create({
            xtype: 'formulary-formularychanges',
            // viewModel: {
            //     parent: this.getViewModel() //windows need to have the VM chain added to them
            // },

            modal:true,
            autoShow: true,
             viewModel:{
                 parent: me.getViewModel()
             }


        });
        if (vm.get('Stat') == '3') {
            win.setTitle('Formulary Approval by Pharmacy Director');
        }
        else if (vm.get('Stat') == '4') {
         win.setTitle('Formulary Approval by Medical Director');
        }
        else if (vm.get('Stat') == '1' || vm.get('Stat') == '2' || vm.get('Stat') == '5') {
            win.setTitle( "Formulary Changes - " + vm.get('FormularyName') + " - Version: " + vm.get('FormularyVersion'));
        }

    },
    init: function () {

        // Any init logic should go here.
        var vm = this.getViewModel();
        var formularyinfodata = vm.getStore('formularyinfodata');
        formularyinfodata.getProxy().setExtraParam('pagination', true);
        formularyinfodata.load();

    }


});