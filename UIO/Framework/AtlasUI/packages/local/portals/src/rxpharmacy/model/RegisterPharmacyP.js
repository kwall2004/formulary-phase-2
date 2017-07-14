/**
 * Created by c4539 on 12/12/2016.
 */
Ext.define('Atlas.portals.rxpharmacy.model.RegisterPharmacyP', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'UserName',type: 'string'},
        {name: 'Email',type: 'string'},
        {name: 'SecurityAnswer2',type: 'string'},
        {name: 'NcpdpID',type: 'string'},
        {name: 'SecurityAnswer1',type: 'string'},
        {name: 'SecurityQuestion1',type: 'string'},
        {name: 'AdminAcceptTerms',type: 'string'},
        {name: 'RelationshipID',type: 'string'},
        {name: 'Phone',type: 'string'},
        {name: 'SecurityQuestion2',type: 'string'},
        {name: 'RxNum',type: 'string'},
        {name: 'ContactName',type: 'string'},
        {name: 'Password',type: 'string'}
    ],

    proxy: {
        url: 'authentication/rx/registerpharmacyp'
    }
});