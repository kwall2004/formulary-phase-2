/**
 * Created by c4539 on 12/5/2016.
 */
Ext.define('Atlas.portals.provider.model.ProvGroupEnrollmentWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'Zip', type: 'string' },
        { name: 'pcpId', type: 'string' },
        { name: 'cshcs', type: 'string' },
        { name: 'lineOfBusiness', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'filedate', type: 'string' },
        { name: 'Sex', type: 'string' },
        { name: 'locName', type: 'string' },
        { name: 'programGroup', type: 'string' },
        { name: 'hotListInd', type: 'string' },
        { name: 'Phone', type: 'string' },
        { name: 'taxID', type: 'string' },
        { name: 'npinNum', type: 'string' },
        { name: 'diseaseManage', type: 'string' },
        { name: 'Age', type: 'string' },
        { name: 'coordProgram', type: 'string' },
        { name: 'Address2', type: 'string' },
        { name: 'Address1', type: 'string' },
        { name: 'City', type: 'string' },
        { name: 'birthDate', type: 'string' },
        { name: 'pcpName', type: 'string' },
        { name: 'firstName', type: 'string' },
        { name: 'dispMemberID', type: 'string' },
        { name: 'planListInd', type: 'string' },
        { name: 'State', type: 'string' },
        { name: 'locationID', type: 'string' },
        { name: 'npinNum', type: 'string' },
        { name: 'recipientID', type: 'string' },
        { name: 'Measure' },
        { name: 'measure', type: 'string', calculate: function(obj) {
            return obj.Measure.toString();
        }}
    ],

    proxy: {
        url: 'provider/hp/provgroupenrollmentweb'
    }
});