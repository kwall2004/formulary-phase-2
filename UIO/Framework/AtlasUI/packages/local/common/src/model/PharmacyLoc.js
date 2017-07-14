/**
 * Created by d4662 on 1/9/2017.
 */
Ext.define('Atlas.common.model.PharmacyLoc', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'ncpdpId',
        type: 'string'
    },{
        name: 'npi',
        type: 'string'
    },
        {
            name: 'Name',
            type: 'string'
        },
        {
        name: 'Address1',
        type: 'string'
    },
        {
            name: 'Address2',
            type: 'string'
        },{
        name: 'locCity',
        type:'string'
    },{
        name: 'locState',
        type:'string'
    },{
        name: 'locZip',
        type:'string'
    },{
        name: 'pharmacyLabel' , calculate: function(obj) {
            var pharmacyLbl;
            if (obj.ncpdpId && obj.Name) {
                pharmacyLbl = obj.ncpdpId + ' ' + obj.Name;
                return pharmacyLbl;
            } else {
                return '';
            }
        }
    }],
    reader: {
        rootProperty: function (payload) {
            return payload.data[0].ttPhamacyLoc;
        }
    },
    proxy: {
        extraParams: {
            pRowid:0,
            pRowNum:0,
            pBatchSize:25,
            pSort:"''",
            pagination:true
        },
        url: 'pharmacy/{0}/pharmacylocationdetail'
    }
});
