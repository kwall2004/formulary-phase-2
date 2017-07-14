Ext.define('Atlas.pharmacy.model.PharmacyMasterData', {
    extend: 'Atlas.common.model.Base',

    fields: ['npi', 'ncpdpid', 'deaid', 'name', 'locCity', 'locState', 'locAddress1', 'locAddress2', 'locZip', 'locCrossStreet', 'mailAddress1', 'mailCity', 'mailState', 'mailZip',
        'locPhone', 'locPhoneExt', 'locFax', 'locEmail', 'contactLastname', 'contactFirstname', 'contactTitle', 'contactPhone', 'contactExt', 'ContactEmail',
        '@locHandicapAccessFlag', '@locAcceptsErxFlag', '@locDeliveryServiceFlag', '@locCompoundServFlag', '@locDriveUpFlag', '@locDMEflag', 'loc24hourFlag',
        {
            name: '@fnlocHours',
            type: 'array',
            delimiter: '^'
        }, 'legalBusinessName',
        {
            name: 'primDispTypeCode',
            type: 'objectarray'
        },
        {
            name: 'secDispTypeCode',
            type: 'objectarray'
        },
        {
            name: 'tertDispTypeCode',
            type: 'objectarray'
        },
        {
            name: 'dispClassCode',
            type: 'array',
            delimiter: '^'
        },
        {
            name: '@PharmacyType',
            type: 'objectarray'
            //separator: ',' // unknown separator
        },
        {
            name: 'txtServiceType',
            mapping: '@PharmacyType', //triggers setting this virtual field
            persist: false, // won't be saved back to server, exists only locally
            convert: function (val, rec) {
                if(!val){return;}

                var data = rec.get('@PharmacyType');
                var FinalStr='';
                val.split(',').forEach(function(Val,i){
                    if(FinalStr=='')
                    {
                        FinalStr =Val.split('^')[0];
                    }
                    else{FinalStr += ', '+Val.split('^')[0];}
                });

                return FinalStr;// Ext.isArray(data) ? data[0].name : '';
            }
        },
        {
            name: 'txtDispenser',
            mapping: 'primDispTypeCode', //triggers setting this virtual field
            persist: false, // won't be saved back to server, exists only locally
            convert: function (val, rec) {
                var pri = rec.get('primDispTypeCode'),
                    sec = rec.get('secDispTypeCode'),
                    tert = rec.get('tertDispTypeCode'),
                    arr = [];

                if(Ext.isArray(pri) && pri.length) {
                    arr.push(pri[0].name);
                }

                if(Ext.isArray(sec) && sec.length) {
                    arr.push(sec[0].name);
                }

                if(Ext.isArray(tert) && tert.length) {
                    arr.push(tert[0].name);
                }

                return arr.join(', ');
            }
        },

        'locOpenDate', 'locCloseDate',
        '@twentyFourHourIndFlag', '@walkInIndFlag', '@multiDoseIndFlag', '@immProvIndFlag', '@status340BIndFlag', '@closedDoorFacilityIndFlag',
        {
            name: '@OwnerShipHistory',
            type: 'array',
            delimiter: '^'
        },
        '@ContractSendDate',
       'PharmacyAdditionalInfo.FWALockFlag',

        'PharmacyAdditionalInfo.lockNote', '@FWALockLOBDesc',
        {
            name: 'mailAddress2',
            mapping: 'mailAddress1', //triggers setting this virtual field
            persist: false, // won't be saved back to server, exists only locally
            convert: function (val, rec) {
                return rec.get('mailCity') + ', ' + rec.get('mailState') + ' ' + Ext.util.Format.usZip(rec.get('mailZip'));
            }
        },
        {
            name: 'locAddressLine2',
            mapping: 'locAddress1',
            persist: false,
            convert: function (val, rec) {
                return rec.get('locCity') + ', ' + rec.get('locState') + ' ' + Ext.util.Format.usZip(rec.get('locZip'));
            }
        },
        {
            name: 'contactFullName',
            mapping: 'contactFirstname',
            persist: false,
            convert: function (val, rec) {
                return rec.get('contactFirstname') + ' ' + rec.get('contactLastname');
            }
        },
        {
            name: 'contactPhoneExt',
            mapping: 'contactPhone',
            persist: false,
            convert: function (val, rec) {
                var formatPhone = Atlas.common.Util.formatPhone(rec.get('contactPhone'));
                return formatPhone + (rec.get('contactExt') == '' ? '' : ' Ext: ' + rec.get('contactExt'));
            }
        }
    ],

    proxy: {
        extraParams: {
            //Listing parameters for reference.
            pFieldList: '',
            pKeyValue: '',
            pKeyType: 'ncpdpId'
        },
        url: 'pharmacy/{0}/pharmacymasterdata'
    }
});
