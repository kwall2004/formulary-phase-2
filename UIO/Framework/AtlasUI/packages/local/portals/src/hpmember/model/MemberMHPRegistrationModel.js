/**
 * Created by t3852 on 11/9/2016.
 */
Ext.define('Atlas.portals.hpmember.model.MemberMHPRegistrationModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'pListItems', type: 'string'}
    ],

    proxy: {
        url: 'portal/hp/listitems',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});