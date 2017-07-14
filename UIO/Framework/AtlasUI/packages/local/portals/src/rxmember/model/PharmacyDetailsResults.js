/**
 * Created by m4542 on 9/28/2016.
 */
Ext.define('Atlas.portals.rxmember.model.PharmacyDetailsResults', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'ncpdpid',type: 'string'},
        {name: 'name',type: 'string'},
        {name: 'locCity',type: 'string'},
        {name: 'locState',type: 'string'},
        {name: 'locAddress1',type: 'string'},
        {name: 'locAddress2',type: 'string'},
        {name: 'locZip',type: 'string'},
        {name: 'locCrossStreet',type: 'string'},
        {name: 'mailAddress1',type: 'string'},
        {name: 'mailCity',type: 'string'},
        {name: 'mailState',type: 'string'},
        {name: 'mailZip',type: 'string'},
        {name: 'locPhone',type: 'string'},
        {name: 'locPhoneExt',type: 'string'},
        {name: 'locFax',type: 'string'},
        {name: 'locEmail',type: 'string'},
        {name: 'contactLastname',type: 'string'},
        {name: 'contactFirstname',type: 'string'},
        {name: 'contactTitle',type: 'string'},
        {name: 'contactPhone',type: 'string'},
        {name: 'contactExt',type: 'string'},
        {name: 'ContactEmail',type: 'string'},
        {name: 'locHandicapAccessFlag',type: 'string'},
        {name: 'locAcceptsErxFlag',type: 'string'},
        {name: 'locDeliveryServiceFlag',type: 'string'},
        {name: 'locCompoundServFlag',type: 'string'},
        {name: 'locDriveUpFlag',type: 'string'},
        {name: 'locDMEflag',type: 'string'},
        {name: 'loc24HourFlag',type: 'string'},
        {name: '@locHours',type: 'string'},
        {name: '@fnlocHours',type: 'string'},
        {name: 'legalBusinessName',type: 'string'},
        {name: 'primDispTypeCode',type: 'string'},
        {name: 'secDispTypeCode',type: 'string'},
        {name: 'tertDispTypeCode',type: 'string'},
        {name: 'dispClassCode',type: 'string'},
        {name: '@PharmacyType',type: 'string'}


    ],
    proxy: {
        url: 'pharmacy/{0}/pharmacymasterdata'
    }
});