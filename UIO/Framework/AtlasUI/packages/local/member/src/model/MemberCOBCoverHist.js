/**
 * Created by j2487 on 11/4/2016.
 */
Ext.define('Atlas.member.model.MemberCOBCoverHist', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'COB', type: 'string' },
        { name: 'COBFileName', type: 'string' },
        { name: 'Contract', type: 'string' },
        { name: 'Coverage', type: 'string' },
        { name: 'CreateDate', type: 'string' },
        {name: 'EffDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'InsurerName', type: 'string' },
        { name: 'InsurerAddress1', type: 'string' },
        { name: 'InsurerAddress2', type: 'string' },
        { name: 'InsurerCity', type: 'string' },
        { name: 'InsurerState', type: 'string' },
        { name: 'InsurerZip', type: 'string' },
        {name:'InsurerFullAddress',
            calculate:function(obj)
            {
                 return obj.InsurerAddress1 + obj.InsurerAddress2 + '</br>' + obj.InsurerCity + ' ' +obj.InsurerState + ' ' +obj.InsurerZip;
            }
        },
        { name: 'lastModified', type: 'string' },
        { name: 'pbmCreateDate', type: 'string' },
        { name: 'RecType', type: 'string' },
        { name: 'Policy', type: 'string' },
        { name: 'Relationship', type: 'string' },
        { name: 'RxBin', type: 'string' },
        { name: 'RXGrp', type: 'string' },
        { name: 'RxID', type: 'string' },
        { name: 'SystemID', type: 'string' },
        { name: 'TermDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'LetterType', type: 'string' },
        { name: 'LetterTypeDesc', type: 'string' },
        { name: 'COBCStatus', type: 'string' },
        { name: 'COBCStatusDesc', type: 'string' },
        { name: 'cobcrecordid', type: 'int' },
        { name: 'HICNRRB', type: 'string' },
        { name: 'Coverage', type: 'string' },
        { name: 'MSP', type: 'string' }
    ],

    proxy: {
       url: 'member/{0}/cobcdetails',
        extraParams:{
           pagination:true
        }
    }

})