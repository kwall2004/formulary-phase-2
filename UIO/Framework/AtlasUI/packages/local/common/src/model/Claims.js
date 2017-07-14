/**
 * Created by T4317 on 9/8/2016.
 */
Ext.define('Atlas.common.model.Claims',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    fields: [ {name: 'Account',  type: 'string'},
        {name: 'planGroupName',  type: 'string'},
        {name: 'AWPPrice',  type: 'string'},
        {name: 'bin',  type: 'string'},
        {name: 'memFirstName',  type: 'string'},
        {name: 'rxname',  type: 'string'},
        {name: 'drname',  type: 'string'},
        {name: 'totalAmtPaid',  type: 'string'},
        {name: 'claimID',  type: 'string'},
        {name: 'brandname',  type: 'string'},
        {name: 'source',  type: 'string'},
        {name: 'suppy',  type: 'string'},
        {name: 'GPICode',  type: 'string'},
        {name: 'rowID',  type: 'string'},
        {name: 'PharmacySubAmt',  type: 'string'},
        {name: 'otherCoverageCode',  type: 'string'},
        {name: 'mcaidProvId',  type: 'string'},
        {name: 'rowNum',  type: 'string'},
        {name: 'Carrier',  type: 'string'},
        {name: 'LOB',  type: 'string'},
        {name: 'fillNumber',  type: 'string'},
        {name: 'ETCName',  type: 'string'},
        {name: 'adjClaimRefNum',  type: 'string'},
        {name: 'ncpdpid',  type: 'string'},
        {name: 'qty',  type: 'string'},
        {name: 'svcdate',  type: 'date',dateFormat: 'Y-m-d' },
        {name: 'transdate',  type: 'date',dateFormat: 'Y-m-d' }

        // 'planGroupName',
        // 'AWPPrice',
        // 'bin',
        // 'memFirstName',
        // 'rxname',
        // 'drname',
        // 'totalAmtPaid',
        // 'claimID',
        // 'source',
        // 'brandname',
        // 'suppy',
        // 'GPICode',
        // 'rowID',
        // 'PharmacySubAmt',
        // 'otherCoverageCode',
        // 'mcaidProvId',
        // 'rowNum',
        // 'Carrier',
        // 'LOB',
        // 'fillNumber',
        // 'ETCName',
        // 'adjClaimRefNum',
        // 'ncpdpid',
        // 'qty',
        // 'svcdate',
        // 'transdate'
    ]
    // ,
    // proxy: {
    //     extraParams:{
    //         pagination: true
    //     },
    //     url: 'shared/{0}/claimshistory'
    // }
});
