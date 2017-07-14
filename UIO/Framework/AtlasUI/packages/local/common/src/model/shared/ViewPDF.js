/**
 * Created by agupta on 11/3/2016.
 */
Ext.define('Atlas.common.model.shared.ViewPDF',{
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'shared/{0}/document'
    }
});