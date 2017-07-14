

Atlas.constants = {};
Ext.apply(Atlas.constants, {
    globalPagination:true
});

Ext.define('Atlas.home.model.ContactLogAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'LastModifiedBy', type: 'string'},
        {name: 'systemID', type: 'number'},
        {name: 'RecipientId', type: 'int'},
        {name: 'subject', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'callerLastName', type: 'string'},
        {name: 'contactType', type: 'string'},
        {name: 'resolvedFirstCall', type: 'boolean'},
        {name: 'TransactionID', type: 'int'},
        {name: 'MemberId', type: 'string'},
        {name: 'ContactTypeInfo', type: 'string'},
        {name: 'pharmacyName', type: 'string'},
        {name: 'callStatus', type: 'int'},
        {name: 'MTMCaseDesc', type: 'string'},
        {name: 'rowNum', type: 'int'},
        {name: 'ReasonCode1', type: 'string'},
        {name: 'CaseNum', type: 'int'},
        {name: 'ReasonCode2', type: 'string'},
        {name: 'ReasonCode3', type: 'string'},
        {name: 'updatedBy', type: 'string'},
        {name: 'MTMId', type: 'int'},
        {name: 'npi', type: 'string'},
        {name: 'Reason1', type: 'string'},
        {name: 'CreateUser', type: 'string'},
        {name: 'Reason3', type: 'string'},
        {name: 'Reason2', type: 'string'},
        {name: 'CallStatusInfo', type: 'string'},
        {name: 'AuthID', type: 'int'},
        {name: 'ProviderName', type: 'string'},
        {name: 'CarrierID', type: 'int'},
        {name: 'ncpdpid', type: 'string'},
        {name: 'DBrowID', type: 'string'},
        {name: 'callerFirstName', type: 'string'},
        {name: 'callerPhone', type: 'string'},
        {name: 'contactUser', type: 'string'},
        {name: 'MemberName', type: 'string'},
        {name: 'planGroupId', type: 'int'},
        // {name: 'callDateTime', type: 'date', convert: function(date){
        //     return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(date, 'm/d/Y g:i:s');
        // }},
        {name: 'categoryId', type: 'string'}
    ],

    proxy: {
        url: 'shared/{0}/contactlog',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {

                payload.data.forEach(function(contactlogval,contactlogindex){
                    contactlogval.reasons=[];
                    contactlogval.reasontext ='';

                    contactlogval.oldformatLastModified = contactlogval.LastModified;
                    contactlogval.oldformatupdatedDatetime = contactlogval.updatedDatetime;
                    contactlogval.callDateTime = Ext.util.Format.date(new Date(contactlogval.callDateTime), 'm/d/Y H:i:s');
                    if(contactlogval.LastModified && contactlogval.LastModified.indexOf("T"))
                    {
                        var breaksdateandtime = contactlogval.LastModified.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');

                        var formatter ='AM';
                        var hours =timeparts[0];
                        if(hours >=11) {
                            formatter = 'PM';
                        }

                        if(hours >=12) {
                            hours = hours%12;
                        }

                        contactlogval.LastModified = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' +hours+ ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2)+' '+formatter ;
                    }


                    if(contactlogval.updatedDatetime && contactlogval.updatedDatetime.indexOf("T"))
                    {
                        var breaksdateandtime = contactlogval.updatedDatetime.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');

                        var formatter ='AM';
                        var hours =timeparts[0];
                        if(hours >=11) {
                            formatter = 'PM';
                        }

                        if(hours >=12) {
                            hours = hours%12;
                        }

                        contactlogval.updatedDatetime = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' +hours+ ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2)+' '+formatter ;
                    }


                    if(contactlogval.ReasonCode1)
                    contactlogval.reasons.push({CodeValue: contactlogval.ReasonCode1,CodeDescr: contactlogval.Reason1 });
                    if(contactlogval.ReasonCode2)
                    contactlogval.reasons.push({CodeValue: contactlogval.ReasonCode2,CodeDescr: contactlogval.Reason2 });
                    if(contactlogval.ReasonCode3)
                    contactlogval.reasons.push({CodeValue: contactlogval.ReasonCode3,CodeDescr: contactlogval.Reason3 });

                });



                return payload.data;
            }
        },
        extraParams: {
            pWhere: '',
            pSort: 'callDateTime',
            pBatchSize: 0,
            pRowNum: 0,
            pDBRowID: '',
            pagination:  true
        },
        timeout: 120000
    }
});