/**
 * Created by agupta on 9/1/2016.
 */
Ext.define('Atlas.authorization.model.ModelDeterminationType', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Name', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pSessionID: 'e631fb5f-844e-b3bf-1414-88c460fded76'
        },
        reader: {
            rootProperty: 'data'
        },
        url: 'member/benefit/{0}/cobdata'
    }
});
