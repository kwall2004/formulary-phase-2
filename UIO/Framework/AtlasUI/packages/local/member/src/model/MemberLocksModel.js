/**
 * Created by j2487 on 10/13/2016.
 * model for Member --> Member Locks screen
 */
Ext.define('Atlas.member.model.MemberLocksModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'action',type:'string',mapping:'action'},
        {name: 'approvalDate',type: 'date',mapping: function (data) {
            if(data.approvalDate) {
                var strDate = '',
                    arrDate = data.approvalDate.split('T')[0].split('-');
                if (arrDate.length == 3) {
                    strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                }
            }
            return strDate;
          }},
        {name: 'approvalDeniedDate',type:'string',mapping:'approvalDeniedDate'},
        {name: 'approvedBy',type:'string',mapping:'approvedBy'},
        {name: 'approvedDeniedBy',type:'string',mapping:'approvedDeniedBy'},
        {name: 'Carrier',type:'string',mapping:'Carrier'},
       {name: 'changeDate',type:'string',mapping:'changeDate'},
        {name: 'createdBy',type:'string',mapping:'createdBy'},
        {name: 'createdDate',type: 'date',mapping: function (data) {
            if(data.createdDate) {
                var strDate = '',
                    arrDate = data.createdDate.split('T')[0].split('-');
                if (arrDate.length == 3) {
                    strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                }
            }
            return strDate;}},
        {name: 'currentLockID',type:'string',mapping:'currentLockID'},
        {name: 'currentStatus',type:'string',mapping:'currentStatus'},
        {name: 'lastModified',type: 'date',mapping: function (data) {
            if(data.lastModified) {
                var strDate = '',
                    arrDate = data.lastModified.split('T')[0].split('-');
                if (arrDate.length == 3) {
                    strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                }
            }
            return strDate;}},
        {name: 'lockType',type:'string',mapping:'lockType'},
        {name: 'memberID',type:'string',mapping:'memberID'},
        {name: 'newLockID',type:'string',mapping:'newLockID'},
       // {name: 'officeContact',type:'string',mapping:'officeContact'},
        //{name: 'officeContactPhone',type:'string',mapping:'officeContactPhone'},
       // {name: 'planContactExtn',type:'string',mapping:'planContactExtn'},
        //{name: 'planContactName',type:'string',mapping:'planContactName'},
        {name: 'recipientID',type:'string',mapping:'recipientID'},
      /*  {name: 'removalBy',type:'string',mapping:'removalBy'},
        {name: 'removalDate',type:'string',mapping:'removalDate'},
        {name: 'removalDeniedBy',type:'string',mapping:'removalDeniedBy'},
        {name: 'removalDeniedDate',type:'string',mapping:'removalDeniedDate'},*/
        {name: 'systemID',type:'string',mapping:'systemID'},
        {name: 'toBeStatus',type:'string',mapping:'toBeStatus'},
        {name: 'memberName',type:'string',mapping:'memberName'},
        {name: 'Account',type:'string',mapping:'Account'},
        {name: 'lockName',type:'string',mapping:'lockName'}
    ],
    proxy: {
        url: 'member/{0}/memberlockfordashboard',
        extraParams: {
            pagination: true
        }
    }
})

