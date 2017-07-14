/**
 * Created by s6393 on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.model.IncludeTypeModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'name',type: 'string'},
        {name: 'value',type: 'string'}
    ],

    proxy: {
        url: 'portal/{0}/listitemsmrx',
        extraParams: {
            pListName: "Open/Close/All"
        }
    }
});