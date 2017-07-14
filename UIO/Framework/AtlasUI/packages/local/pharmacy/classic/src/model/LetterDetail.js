/**
 * Created by S4505 on 12/7/2016.
 */
Ext.define('Atlas.pharmacy.model.LetterDetail', {
    extend: 'Atlas.common.model.Base',
    fields: ['DocID'],
    proxy: {
        // extraParams: {
        //     pFields: '',
        //     pValues: ''
        // },
        url: 'member/{0}/letterdetail'
    }
});