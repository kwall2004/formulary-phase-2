/**
 * Created by rsalekin on 11/21/2016.
 */
Ext.define('Atlas.pharmacy.model.SetEftVanWindow', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pMode: '',
            pKeyType: '',
            pKeyvalue: '',
            pFieldList: '',
            pFields: ''
        },
        url: 'pharmacy/{0}/epaymentinfo'
    }
});
