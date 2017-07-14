/**
 * Created by T4317 on 9/13/2016.
 */
Ext.define('Atlas.common.model.ContactLog', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'AuthID',
        'CallStatusInfo',
        'CarrierID' ,
        'CaseNum',
        'CategoryId' ,
        'ContactTypeInfo',
        'CreateUser' ,
        'DBrowID' ,
        'LastModifiedBy',
        'MTMId',
        'MemberId',
        'MemberName',
        'ProviderName',
        'Reason1',
        'Reason2' ,
        'Reason3',
        'ReasonCode1' ,
        'ReasonCode2',
        'ReasonCode3' ,
        'RecipientId' ,
        'TransactionID' ,
        'callDateTime',
        'callStatus',
        'callerFirstName',
        'callerLastName',
        'callerPhone',
        'contactType' ,
        'contactUser',
        'description' ,
        'ncpdpid',
        'npi' ,
        'pharmacyName' ,
        'planGroupId' ,
        'resolvedFirstCall',
        'rowNum',
        'subject',
        'systemID',
        'updatedBy',
        'updatedDatetime',
        { name: 'updatedt' , calculate: function(obj) {
            var dt;

            if(obj.updatedDatetime){
                dt = new Date(obj.updatedDatetime);
                return Ext.Date.format(dt, 'm/d/Y' );
            } else {
                return '';
            }
        }}
    ],
    validators: {
        MemberId:'presence',
        MemberName:'presence',
        ProviderName:'presence'
    },
    proxy: {
        extraParams:{
            pStartDate: null,
            pEndDate: null,
            pBatchSize: '',
            pDBRowID: 0,
            pagination:true

        },
        url: 'shared/{0}/contactlogtable',
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
                    if(contactlogval.callDateTime && contactlogval.callDateTime.indexOf("T"))
                    {
                        var breaksdateandtime = contactlogval.callDateTime.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');
                        contactlogval.callDateTime = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' + timeparts[0] + ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2) ;
                    }
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

                    /*payload.metadata.ttContactReasonCode.ttContactReasonCode.forEach(function(val,index){
                        if(val.caseNum==contactlogval.CaseNum)
                        {
                            contactlogval.reasons.push(val);
                            if(!contactlogval.reasontext){
                                contactlogval.reasontext  = val.CodeDescr;
                            }
                        }

                    });*/
                });

                return payload.data;
            }
        }
    }
});

