/**
 * Created by S4505 on 11/14/2016.
 */

Ext.define('Atlas.plan.view.group.AddressModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-group-address',
    data: {
        isEditing: false
    },
    stores: {
        planaddress:{
            type: 'plan-planaddresslists'
        }
    }
});

