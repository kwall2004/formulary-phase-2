Ext.define('Atlas.claims.model.detail.diagCodeModel', {
        extend: 'Ext.data.Store',
        requires: [
            'Ext.data.field.Field'
        ],
        storeId: 'diagCodeModel',
        fields: ['idNo', 'id', 'diagCode'],
        data: [
            {"idNo": "1","id": 0,"diagCode": "Medicaid"},
            {"idNo": "2","id": 1,"diagCode": "Medicare"},
            {"idNo": "3","id": 2,"diagCode": "Comm-HMO"},
            {"idNo": "4","id": 3,"diagCode": "Medicaid"},
            {"idNo": "5","id": 4,"diagCode": "Medicare"},
            {"idNo": "6","id": 5,"diagCode": "Comm-HMO"},
            {"idNo": "7","id": 6,"diagCode": "Medicaid"},
            {"idNo": "8","id": 7,"diagCode": "Medicare"},
            {"idNo": "9","id": 8,"diagCode": "Comm-HMO"},
            {"idNo": "10","id": 9,"diagCode": "Medicaid"},
            {"idNo": "11","id": 10,"diagCode": "Medicare"},
            {"idNo": "12","id": 11,"diagCode": "Comm-HMO"}
        ],
        autoLoad: true
    });