/**
 * Created by c4539 on 11/30/2016.
 */
Ext.define('Atlas.portals.provider.model.EnrollmentWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'lineOfBusiness', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'SocSecNum', type: 'string' },
        { name: 'hedisFlag', type: 'string' },
        { name: 'programGroup', type: 'string' },
        { name: 'Gender', type: 'string' },
        { name: 'otherInsuranceCode', type: 'string' },
        { name: 'cMessage', type: 'string' },
        { name: 'pocStatus', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'zip', type: 'string' },
        { name: 'jobNum', type: 'string' },
        { name: 'reviewRequiredBy', type: 'string' },
        { name: 'programCode', type: 'string' },
        { name: 'address2', type: 'string' },
        { name: 'address1', type: 'string' },
        { name: 'birthDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'decisionDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'firstName', type: 'string' },
        { name: 'dispMemberID', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'lastReviewDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'enrollmentStatus', type: 'string' },
        { name: 'dbRowID', type: 'string' },
        { name: 'rowNUm', type: 'string' },
        { name: 'recipientID', type: 'string' },
        { name: 'middleName', type: 'string' },
        { name: 'termDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'effectiveDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'lobID', type: 'string' },
        { name: 'cshcsFlag', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'provider/hp/enrollmentweb'
    }
});