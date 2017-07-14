/**
 * Created by j2487 on 10/17/2016.
 */
Ext.define('Atlas.member.model.MemberAccumBenefitEnrollment', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'DisplayField',  type: 'date', dateFormat: 'Y-m-d' },
        { name: 'RecSeqBenefitYear', type: 'string' },
        { name: 'BenefitYear', type: 'string'  },
        { name: 'CMSCntrId', type: 'string'  },
        { name: 'PCNCode', type: 'string' },
        { name: 'BenefitStartDate', type: 'date', dateFormat: 'Y-m-d'  },
        { name: 'BenefitEndDate', type: 'date', dateFormat: 'Y-m-d'  },
        { name: 'PlangroupIdList', type: 'string' },
        { name: 'CanReprocess', type: 'boolean'  },
        { name: 'OutOfPocketMsg', type: 'string'  },
        { name: 'DrugCostMsg', type: 'string' },
        { name: 'FamilyDed', type: 'string' },
        { name: 'FamilyTroop', type: 'string' },
        {name:  'MoopBalance',type:'string'}
    ],
    proxy:{
        url:'member/0/memberaccumulatedbenefits'
    }


})