/**
 * Created by rsalekin on 12/22/2016.
 */
/**
 * This Class represents the Credentialing Letters Poppup of the Credentialing Detail Tab
 */
Ext.define('Atlas.pharmacy.view.credentialing.popups.FederalTaxHistory', {
    extend: 'Ext.window.Window',
    alias: 'widget.pharmacy-federaltaxhistory-win',
    xtype: 'widget.pharmacy-federaltaxhistory-win',
    controller: {
        init: function(){
            var view = this.getView();
            if (view.extraParams) {
                var store = view.extraParams["storeFederalTaxHistory"];
                if(store) {
                    view.down('#grdFedralTaxHistory').setStore(store);
                }
            }
        }
    },
    width: 350,
    height: 200,
    title: 'Federal Tax History',
    modal: true,
    items: [
        {
            xtype: 'grid',
            itemId: 'grdFedralTaxHistory',
            columns: [
                {
                    text: 'Updated On',
                    dataIndex: 'updatedOn',
                    formatter: 'date("n/j/Y")',

                    flex: 1
                },
                {
                    text: 'Updated By',
                    dataIndex: 'updatedBy',
                    flex: 1
                },
                {
                    text: 'Federal Tax ID',
                    dataIndex: 'FederalTaxID',
                    flex: 1
                }
            ]
        }
    ]
});
