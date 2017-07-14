/**
 * Created by T4317 on 9/13/2016.
 */
Ext.define('Atlas.common.model.MemberPAHistory', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name:'authId' ,mapping:'AuthID'},
        'authStatus',
        'detrType',
        'GCNSEQ' ,
        'GPI',
        'NDC' ,
        'med' ,
        'carrier' ,
        'account' ,
        'lob' ,
        'UrgencyTypeDesc',
        'urgType' ,
        {name: 'effDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'termDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'createDate', type: 'date', dateFormat: 'c'},
        {name: 'modDate', type: 'date', dateFormat: 'c'},
        {name: 'fillDate', type: 'date', dateFormat: 'c'}
    ]
});