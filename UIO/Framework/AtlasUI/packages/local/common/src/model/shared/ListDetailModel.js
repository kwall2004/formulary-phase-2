/**
 * Created by agupta on 10/17/2016.
 */
Ext.define('Atlas.common.model.shared.ListDetailModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'ListItem',type: 'string'},
        {name: 'ListDescription',type: 'string'},
        {name: 'Active',type: 'boolean'},
        {name: 'charString',type: 'string'},
        {name: 'systemID',type: 'string'},
        {name: 'dbRowID',type: 'string'},
        {name: 'RowNum',type: 'string'},
        {name: 'ListDescription',type: 'string'},
        {name: 'Mode',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName:''
        },
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'system/{0}/listdetail'
    }
});
