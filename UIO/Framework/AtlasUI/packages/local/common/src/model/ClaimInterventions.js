/**
 * Created by T4317 on 11/8/2016.
 */
Ext.define('Atlas.common.model.ClaimInterventions', {
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    fields: [
        { name:'NCPDPID'},
        { name:'Account'},
        { name:'ClaimID'},
        { name:'PlanGroupName'},
        { name:'NPI'},
        { name:'RuleId'},
        { name:'CreateDateTime'},
        { name:'SystemID'},
        { name:'PlanGroupID'},
        { name:'Descr'},
        { name:'NDC'},
        { name:'PharmacyName'},
        { name:'PrescriberName'},
        { name:'RecipID'},
        { name:'Stat'},
        { name: "status", calculate: function(obj){
            var status = '';

            if(obj.Stat){
                if(obj.Stat === 'P'){
                    status = 'Paid'
                } else if(obj.Stat === 'R') {
                    status = 'Rejected'
                } else if(obj.Stat === 'A') {
                    status = 'Reversed'
                } else if(obj.Stat === 'C') {
                    status = 'Captured'
                } else if(obj.Stat === 'D') {
                    status = 'Duplicate Paid'
                } else if(obj.Stat === 'F') {
                    status = 'Pa Defered'
                } else if(obj.Stat === 'Q') {
                    status = 'Duplicate of Capture'
                } else if(obj.Stat === 'S') {
                    status = 'Duplication of Reversed'
                }
            }

            return status;
        }},
        { name:'SvcDate',type: 'date',dateFormat:'Y-m-d'},
        {name: 'svcDateFormat', calculate: function (obj) {

            var svcDate = '';
            var svcDateFormat = '';
            var month = '';
            if (obj.SvcDate) {
                svcDate = new Date(obj.SvcDate);
                if((svcDate.getMonth()+1) < 10){
                    month = '0' + (svcDate.getMonth()+1);
                } else {
                    month = svcDate.getMonth()+1;
                }
                svcDateFormat = month + "/" + svcDate.getDate() + "/" + svcDate.getUTCFullYear();
            }
            return svcDateFormat;
        }},
        { name:'assigned'},
        { name:'Carrier'},
        { name:'MemberName'},
        { name:'StatCode'},
        { name:'LOB'},
        { name:'RecPointer'}
    ],
    proxy:{
        pagination:true,
        extraParams:{
            piQueID:10,
            pcLOBID:'3',
            ipiBatchSize:'',
            ipcFilter:'',
            ipcDirection:'FWD',
            ipcBckRecPointer:0,
            ipcFwdRecPointer:0,
            pagination:true
        },
        url:'claims/{0}/claimalert'
    }
});