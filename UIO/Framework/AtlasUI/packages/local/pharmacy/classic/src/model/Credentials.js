Ext.define('Atlas.pharmacy.model.Credentials', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'ncpdpId',
        {name: 'credDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'insuranceAmt',
        {name: 'insuranceExpDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'insuranceName',
        'insuranceAcctNum',
        {name: 'lastInspectionDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'lastInspectionGrade',
        'suspiousFlag',
        {name: 'suspiousDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'PIC',
        {name: 'DeaExpDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        {name: 'StLicExpDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'PicLic',
        'ReCntName',
        'ReAddress1',
        'ReAddress2',
        'ReCity',
        'ReState',
        'ReZip',
        'RePhone',
        'ReFax',
        'ReEmail',
        'RetailDspnsr',
        'MailDspnsr',
        'LongTrmDspnsr',
        'CompDspnsr',
        'SpecDspnsr',
        'IVFusDspnsr',
        'InternetDspnsr',
        'RetBusPct',
        'MailSrvBusPct',
        'CompBusPct',
        'IVFusBusPct',
        'InternetBusPct',
        'LonTrmBusPct',
        'PharHrM-F',
        'PharHrSat',
        'PharHrSun',
        'PatCnslng',
        'Literature',
        'PhyLocCompSrv',
        'PhyLocDelSrv',
        'SepChrDelSrv',
        'PhyLocLang',
        'PhyLoc',
        'NamePost',
        'PrepWait',
        'Litigation',
        'BusFail',
        'LegalViolations',
        'Allegations',
        'SpecDspnsrBusPct',
        'OtherSvcsProvided',
        'RetLicensed',
        'MailSrvLicensed',
        'LonTrmLicensed',
        'SpecDspnsrLicensed',
        'CompLicensed',
        'IVFusLicensed',
        'InternetLicensed',
        'legalBusinessName',
        'name',
        'contactFirstName',
        'contactLastName',
        'npi',
        'fedTaxId',
        'deaId',
        'stateLicNum',
        'medicaidId',
        'medicareSupplierId',
        {name: 'PICExpDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        {name: 'PICVerfDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'PICDiscpAction',
        {name: 'DEAVerfDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'DEADiscpAction',
        {name: 'StLicVerfDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'StLicDiscpAction',
        'EvidDebar',
        'EvidDebarDet',
        {name: 'OIGVerfDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'OIGDiscpAction',
        {name:'EPLSVerfDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'EPLSDiscpAction',
        'Comments',
        'VerfPerfBy',
        {name: 'VerfPerfDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        {name: 'CredCommApprDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        {name: 'insuranceVerfDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        {name: 'NCPDPStLicExpDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        {name: 'NCPDPDeaExpDate', type: 'date', dateReadFormat: 'Y-m-d', dateWriteFormat: 'm/d/Y'}, //date
        'locstate'
    ],

    unifyOperations: true, //Set to true to send create/update/delete operations as an update
    proxy: {
        extraParams: {
            pKeyType: 'ncpdpid',
            pKeyValue: '',
            pCredDate: ''
        },
        skipData: true, // exclude original fields and send only parameters
        url: 'pharmacy/{0}/pharmacredentials',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {


                return payload.data;
            }
        }
    }
});
