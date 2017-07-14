/**
 * Created by d4662 on 1/11/2017.
 */
Ext.define('Atlas.claims.view.ClaimsMemberTypeAhead', {
    xtype: 'claimsmembertypeahead',
    extend: 'Atlas.common.view.sharedviews.typeahead.MemberTypeAhead',
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function () {
            /*return '<h4>{MemberName}</h4>' +
                '<h5>MeridianRx ID:<span>{recipientID}</span></h5>' +
                '<h5>Member ID:<span>{memberID}</span></h5>' +
                '<h5>Carrier:<span>{carrierName}</span></h5>' +
                '</span><h5>DOB:<span>{dob}</span> Gender:<span>{gender}</span></h5>' +
                '<h5>SSN:<span>{ssn}</span></h5>' +
                '<h5>Account:<span>{accountName}</span></h5>' +
                '<h5>Status:<span>{memStatus}</span></h5>'*/
            return '<h5>Member ID:<span>{memberID}</span></h5>' +
            '<h5>Member Name:<span>{MemberName}</span></h5>'+
                '<h5>MeridianRx ID:<span>{recipientID}</span></h5>' +
                '<h5>Carrier:<span>{carrierName}</span></h5>' +
                '<h5>DOB:<span>{dobFormat}</span></h5>' +
                '<h5>Gender:<span>{gender}</span></h5>' +
                '<h5>Account:<span>{accountName}</span></h5>' +
                '<h5>Status:<span>{memStatus}</span></h5>'
        }
    },
    displayField:'',
    valueField:''
});

