/**
 * Created by c4539 on 11/29/2016.
 */
Ext.define('Atlas.portals.provider.model.ERVisitReportWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'procDesc', type: 'string'},
        { name: 'cpt4cd' , type: 'string' },
        { name: 'serviceDate' , type: 'date', dateFormat: 'Y-m-d'},
        { name: 'providerLastName' , type: 'string'},
        { name: 'admitDiagCd' , type: 'string'},
        { name: 'servCategory' , type: 'string'},
        { name: 'diagDesc1' , type: 'string'},
        { name: 'diagDesc2' , type: 'string'},
        { name: 'diagDesc3', type: 'string'},
        { name: 'pcpFirstName' , type: 'string' },
        { name: 'facilityName' , type: 'string'},
        { name: 'attendingFirstName' , type: 'string'},
        { name: 'admitDesc' , type: 'string'},
        { name: 'claimNumber' , type: 'string'},
        { name: 'pcpID' , type: 'string'},
        { name: 'memberFirstName' , type: 'string'},
        { name: 'facilityId', type: 'string'},
        { name: 'diagCd2' , type: 'string' },
        { name: 'diagCd3' , type: 'string'},
        { name: 'memberLastName' , type: 'string'},
        { name: 'lineNumb' , type: 'string'},
        { name: 'diagCd1' , type: 'string'},
        { name: 'providerID' , type: 'string'},
        { name: 'attendingID' , type: 'string'},
        { name: 'dbRowID', type: 'string'},
        { name: 'rowNUm' , type: 'string' },
        { name: 'providerFirstName' , type: 'string'},
        { name: 'recipientID' , type: 'string'},
        { name: 'attendingLastName' , type: 'string'},
        { name: 'pcpLastName' , type: 'string'},
        { name: 'memberID' , type: 'string'},
        { name: 'primaryLoB' , type: 'string'},
        { name: 'lobID' , type: 'string'},
        { name: 'attendingProvider', type: 'string', calculate: function(obj) {
            return obj.attendingFirstName + ' ' + obj.attendingLastName;
        }},
        { name: 'pcpName', type: 'string', calculate: function(obj) {
            return obj.pcpFirstName + ' ' + obj.pcpLastName;
        }}
    ],

    proxy: {
        url: 'provider/hp/ervisitreportweb'
    }
});