/**
 * Created by m4542 on 11/22/2016.
 */
Ext.define('Atlas.portals.provider.model.IcbrDataPortalDetail', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'memberLegalGuardian', type: 'string' },
        { name: 'commonKey', type: 'string' },
        { name: 'memberRace', type: 'string' },
        { name: 'memberAddress', type: 'string' },
        { name: 'receiveDateTime', type: 'date' },
        { name: 'source', type: 'string' },
        { name: 'memberSt', type: 'string' },
        { name: 'memberEthnicity', type: 'string' },
        { name: 'memberPhone', type: 'string' },
        { name: 'ICBRControlNum', type: 'int' },
        { name: 'memberSecCity', type: 'string' },
        { name: 'memberSecSt', type: 'string' },
        { name: 'memberFirstName', type: 'string' },
        { name: 'memberCity', type: 'string' },
        { name: 'memberLanguage', type: 'string' },
        { name: 'memberLastName', type: 'string' },
        { name: 'memberLastName', type: 'string' },
        { name: 'memberGender', type: 'string' },
        { name: 'memberSecZipCode', type: 'string' },
        { name: 'ICBRFileName', type: 'string' },
        { name: 'memberEmail', type: 'string' },
        { name: 'memberEnrollDate', type: 'date' },
        { name: 'memberSecAddress', type: 'string' },
        { name: 'recipientID', type: 'int' },
        { name: 'memberDOB', type: 'date' },
        { name: 'memberID', type: 'string' },
        { name: 'memberZipCode', type: 'string' }
    ],
    proxy: {
        url: 'caremanagement/hp/icbrdataportaldetail',
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});