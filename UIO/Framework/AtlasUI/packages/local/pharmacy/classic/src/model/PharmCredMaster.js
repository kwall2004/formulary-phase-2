/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.PharmCredMaster', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'RSrelationshipID', mapping: 'ncpdpid', type: 'string'},
        {name: 'ncpdpId', mapping: 'ncpdpid', type: 'string'},
        {name: 'ncpdpid', type: 'string'},
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'PharmacyName', mapping: 'name', type: 'string'},
        {name: 'locCity', mapping: 'locCity', type: 'string'},
        {name: 'locState', mapping: 'locState', type: 'string'},
        {name: 'locAddress1', mapping: 'locAddress1', type: 'string'},
        {name: 'locAddress2', mapping: 'locAddress2', type: 'string'},
        {name: 'locZip', mapping: 'locZip', type: 'string'},
        {name: 'locCrossStreet', mapping: 'locCrossStreet', type: 'string'},
        {name: 'mailAddress1', mapping: 'mailAddress1', type: 'string'},
        {name: 'mailCity', mapping: 'mailCity', type: 'string'},
        {name: 'mailState', mapping: 'mailState', type: 'string'},
        {name: 'mailZip', mapping: 'mailZip', type: 'string'},
        {name: 'RSphone', mapping: 'locPhone', type: 'number'},
        {name: 'locPhoneExt', mapping: 'locPhoneExt', type: 'string'},
        {name: 'RSfaxNum', mapping: 'locFax', type: 'number'},
        {name: 'PMemail', mapping: 'locEmail', type: 'string'},
        {name: 'contactLastname', mapping: 'contactLastname', type: 'string'},
        {name: 'contactFirstname', mapping: 'contactFirstname', type: 'string'},
        {name: 'contactTitle', mapping: 'contactTitle', type: 'string'},
        {name: 'contactPhone', mapping: 'contactPhone', type: 'number'},
        {name: 'contactFax', mapping: 'contactFax', type: 'string'},
        {name: 'contactExt', mapping: 'contactExt', type: 'string'},
        {name: 'ContactEmail', mapping: 'ContactEmail', type: 'string'},
        {name: 'PCpayCenterName', mapping: 'legalBusinessName', type: 'string'},
        {name: 'primDispTypeCode', mapping: 'primDispTypeCode', type: 'string'},
        {name: 'secDispTypeCode', mapping: 'secDispTypeCode', type: 'string'},
        {name: 'tertDispTypeCode', mapping: 'tertDispTypeCode', type: 'string'},
        {name: 'fedTaxId', mapping: 'fedTaxId', type: 'number'},
        {
            name: 'RSRelationTypeInfo', convert: function (v, rec) {
            return rec.get('dispClassCode').split('^')[0];
        }
        },
        {
            name: 'locationAddr', convert: function (v, rec) {
            return rec.get('locAddress1') + "<br>" + rec.get('locCity') + ", " + rec.get('locState') + " " + rec.get('locZip');
        }
        },
        {
            name: 'mailingAddr', convert: function (v, rec) {
            return rec.get('mailAddress1') + "<br>" + rec.get('mailCity') + ", " + rec.get('mailState') + " " + rec.get('mailZip');
        }
        },
        {
            name: 'contactNameTitle', convert: function (v, rec) {
            return rec.get('contactFirstname') + rec.get('contactLastname') + " - " + rec.get('contactTitle');
        }
        },
        {
            name: 'storeClosure', convert: function (v, rec) {
            return "";                              //TODO - discuss
        }
        },
        {
            name: 'contractStatus', convert: function (v, rec) {
            return "In Network Active";             //TODO - Logic to be discussed
        }
        }
    ],
    proxy: {
        url: 'pharmacy/{0}/pharmacymasterdata'
    }
});
