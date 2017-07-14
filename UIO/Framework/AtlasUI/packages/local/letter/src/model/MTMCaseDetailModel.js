/** ... **/

Ext.define('Atlas.letter.model.MTMCaseDetailModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.mtmcasedetailmdl',
    fields: [
        {name: '@enrollmentStatus', type: 'string' },
        {name: 'birthDate', type: 'string' },
        {name: 'firstname', type: 'string' },
        {name: 'gender', type: 'string' },
        {name: 'homephone.ContactInfo', type: 'string' },
        {name: 'lastname', type: 'string' },
        {name: 'middlename', type: 'string' },
        {name: 'recipientID', type: 'string' },
        {name: 'suffix', type: 'string' },
        {name: 'FullName', type: 'string'},
        {name: 'LOBName', type: 'string'}
    ],
    proxy: {
        url: 'member/{0}/mtmcasedetails',
        extraParameters: {
            pMTMID: '',
            pSystemId: '',
            pRecordType: ''
        }
    }
});