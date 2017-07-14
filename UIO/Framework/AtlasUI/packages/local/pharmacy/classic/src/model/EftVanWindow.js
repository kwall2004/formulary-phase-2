/**
 * Created by rsalekin on 11/17/2016.
 */
Ext.define('Atlas.pharmacy.model.EftVanWindow', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pKeyType: '',
            pKeyvalue: '',
            pFieldList: ''
        },
        url: 'pharmacy/{0}/epaymentinfo'
    }
});

