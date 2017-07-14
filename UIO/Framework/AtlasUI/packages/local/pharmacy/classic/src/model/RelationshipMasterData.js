/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.RelationshipMasterData', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'RScity', type: 'string'},
        {name: 'PMcity', type: 'string'},
        {name: 'PMzip', type: 'number'},
        {name: 'PCremitCity', type: 'string'},
        {name: 'PMfax', type: 'number'},
        {name: 'PMext', type: 'number'},
        {name: 'PMparentOrgNPI', type: 'string'},
        {name: 'RScontactName', type: 'string'},
        {name: 'rowNum', type: 'number'},
        {name: 'RSstate', type: 'string'},
        {name: 'PMphone', type: 'number'},
        {name: 'PMemail', type: 'string'},
        {name: 'PMparentOrgName', type: 'string'},
        {name: 'RSrelationshipID', type: 'string'},
        {name: 'PCFederalTaxId', type: 'string'},
        {name: 'PCremitContact', type: 'string'},
        {name: 'ncpdpid', type: 'number'},
        {name: 'PCremitPhone', type: 'number'},
        {name: 'RScontactTitle', type: 'string'},
        {name: 'RSfaxNum', type: 'number'},
        {name: 'RSdeleteDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'RSrelationType', type: 'number'},
        {name: 'PCremitAddress1', type: 'string'},
        {name: 'RSNPI', type: 'string'},
        {name: 'RSSystemId', type: 'number'},
        {name: 'PCremitAddress2', type: 'string'},
        {name: 'PReffDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'PMstate', type: 'string'},
        {name: 'PMcontactTitle', type: 'string'},
        {name: 'RSemail', type: 'string'},
        {name: 'PCremitEmail', type: 'string'},
        {name: 'RSRelationTypeInfo', type: 'string'},
        {name: 'PCpayCenterName', type: 'string'},
        {name: 'PCremitContactTitle', type: 'string'},
        {name: 'PMaddress1', type: 'string'},
        {name: 'PMaddress2', type: 'string'},
        {name: 'PMcontactName', type: 'string'},
        {name: 'PCremitState', type: 'string'},
        {name: 'PRtermdate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'RSext', type: 'string'},
        {name: 'RSzip', type: 'string'},
        {name: 'RSaddress1', type: 'string'},
        {name: 'RSaddress2', type: 'string'},
        {name: 'RSphone', type: 'number'},
        {name: 'PCNPI', type: 'string'},
        {name: 'PCpayCenterId', type: 'number'},
        {name: 'RSFederalTaxId', type: 'string'},
        {name: 'PMparentOrgId', type: 'number'},
        {name: 'PCremitZip', type: 'number'},
        {name: 'PCremitExt', type: 'string'},
        {name: 'RSname', type: 'string'},
        {name: 'PCremitFax', type: 'number'},
        {
            name: 'locationAddr', convert: function (v, rec) {
            return rec.get('RSaddress1') + "<br>" + rec.get('RScity') + ", " + rec.get('RSstate') + " " + rec.get('RSzip');
        }
        },
        {
            name: 'mailingAddr', convert: function (v, rec) {
            return rec.get('RSaddress1') + "<br>" + rec.get('RScity') + ", " + rec.get('RSstate') + " " + rec.get('RSzip');
        }
        },
        {
            name: 'contactNameTitle', convert: function (v, rec) {
            return rec.get('RScontactName') + " - " + rec.get('RScontactTitle');
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
        extraParams: {
            //   pSessionID:"91ec4aa2-7003-2398-1b14-a45eb07abf75", //To Fix
            //   pSessionId:"91ec4aa2-7003-2398-1b14-a45eb07abf75" //To Fix
            //   pKeyValue: '{selCredValue}',
            //  pKeyType: '{selCredType}'
        },
        url: 'pharmacy/{0}/relationshipmasterdata'
    }
});