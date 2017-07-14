Ext.define('Atlas.pharmacy.model.PharmacyRelationship', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'ContractId',
        'DbRowID',
        { name: 'EffectiveDate', type: 'date', dateFormat: 'Y-m-d'},
        'Excluded',
        'HasContract',
        'LineOfBusiness',
        'NcpdpId',
        'PaycenterID',
        { name: 'PharEffDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'PharTermdate', type: 'date', dateFormat: 'Y-m-d'},
        'PharmacyName',
        'PharmacyNetworks',
        'RelationShipId',
        'RelationShipName',
        'RowNum',
        { name: 'SystemID', type: 'string'},
        { name: 'Termdate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'RLEffectiveDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'RLTermDate', type: 'date', dateFormat: 'Y-m-d'},
        'cSystemID',
        {name:'contractStatus',type :'string',convert:function(data)
        {
            if(data==null || data == '')
            {
                return 'No Contract';
            }
            return data;
        }
        },
        'paycenterName',
        'remitAndReconId'
    ],
    proxy: {
        extraParams: {
            //Listing parameters for reference. (default values)
            pRowID: '0',
            pRowNum: 0,
            pBatchSize: 0,
            pKeyType: 'NCPDPID',
            pWhere: '',
            pSort: ''
            //qryCriteria: "ContractStatus='Active' and (Excluded='' or Excluded is null) and (RLTermDate='' or RLTermDate is null)"
        },
        url: 'pharmacy/{0}/pharmacyrelationshipdetail',

        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(contractsDetail) {
                contractsDetail.data.forEach(function(item, index){
                    item.Entity = (item.NcpdpId != "" ? "<b>Pharmacy:</b> " + item.NcpdpId + " " + item.PharmacyName : "<b>Relationship:</b> " + item.RelationShipId + " " + item.RelationShipName);
                    item.Excluded = (item.Excluded == true ? "Pharmacy is excluded from contract" : "");
                    item.contractStatus = item.contractStatus != '' ? item.contractStatus : 'No Contract';
                    item.PRSystemId = item.SystemID;
                    item.SystemId = item.cSystemID;
                    item.RLEffectiveDate =item.PharEffDate;
                    item.RLTermDate =  item.PharTermdate;
                });
                return contractsDetail.data;
            }
        }
    }
});