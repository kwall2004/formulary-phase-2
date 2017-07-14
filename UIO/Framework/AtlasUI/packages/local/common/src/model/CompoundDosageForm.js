/**
 * Created by T4317 on 11/8/2016.
 */
Ext.define('Atlas.common.model.CompoundDosageForm', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName:'CompoundDosageForm'
        },
        url: 'shared/{0}/listitems'
    }
});

