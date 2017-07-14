Ext.define('Atlas.admin.model.claimdef.ConditionValueFieldFunction', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefconditionvaluefieldfunction',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pMode: '',
            pSelection: 'V'
        },
        url: 'claims/{0}/claimeditfieldsfunctions'
    }
});

// T - F
// {"fld-name":"AckFlag","fld-DATA-TYPE":"*logical","fld-Label":"AckFlag","tbl-name":"authMaster"}

// F- F
// {"tItem":"@Check340BContractAvail","tDesc":"340B Contract Available"}