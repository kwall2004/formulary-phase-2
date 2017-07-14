/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Auth Inquiry
 * Description: Provider Service Counts
 */
Ext.define('Atlas.portals.provider.model.GetServiceCounts', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'benefitType', type: 'string'},
        { name: 'benefitCount' , type: 'string' },
        { name: 'benefitCountHard' , type: 'string' },
        { name: 'authCount' , type: 'string'},
        { name: 'authremain' , type: 'string'},
        { name: 'claimCount' , type: 'string'},
        { name: 'claimRemain' , type: 'string'},
        { name: 'nextBenefitDate' , type: 'date'},
        { name: 'authList' , type: 'string'},
        {  name: 'claimList' , type: 'string'}
    ],

    proxy: {
        url: 'member/hp/getservicecounts'
    }
});