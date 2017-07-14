/**
 * Created by S4505 on 11/14/2016.
 */

Ext.define('Atlas.plan.view.group.AddressFormModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-group-addressform',
    data: {
        isEditing: false
    },
    stores: {

        planadressinprocess:{
            type: 'plan-planaddressinprocess'
        }
    }
});
