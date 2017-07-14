Ext.define('Atlas.portals.view.rxmember.model.FormsModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'ListDescription', type: 'string'},
        {name: 'charString', type: 'string'}
    ],

    proxy: {
        url: 'portal/{0}/listdetail'
    }

});