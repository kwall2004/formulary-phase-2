/**
 * Created by rsalekin on 11/9/2016.
 */
Ext.define('Atlas.pharmacy.view.ContractsDetailWindowController',
    {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.contractsdetailwindow',
        init: function () {
        },
        initViewModel: function () {
        },

        gpContractsDetail_ItemDblClick: function (dv, record, item, index, e) {
            this.fireEvent('contractInfo', record.data);
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        },

        rendererActiveWithRel: function (value, a, record) {
            var me = this,
                view = me.getView(),
                keyType = view.keyType,
                activeWithRel = '';
            if (record.get('PharTermdate') != null && keyType == 'NCPDPID' && record.get('RelationShipId') != '') {
                activeWithRel = 'Dissolved';
            }
            return activeWithRel;
        }
    }
);
