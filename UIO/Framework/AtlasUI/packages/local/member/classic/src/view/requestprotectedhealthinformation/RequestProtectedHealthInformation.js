Ext.define('Atlas.member.view.requestprotectedhealthinformation.RequestProtectedHealthInformation', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-requestprotectedhealthinformation-requestprotectedhealthinformation',

    requires: [
        'Ext.panel.Panel'
    ],
    region: 'center',
    title: 'Request Protected Health Information',
    items: [
          {
            title: 'Request Member Handbook',
            iconCls: 'fa fa-file',
            items: [
              {
                xtype: 'container',
                style: {
                  padding: '20px'
                },
                items:[
                {
                    html: '<h2>Request Member Handbook</h2>'
                },
                {
                    html: '<h3>Member Information</h3>'
                },
                {
                    xtype: 'requestProtectedHealthInformationForm'
                },
                {
                    html: '</br><h3 style="color:red;" >Please click on the lins below to open the PHI Request forms.</br></br>' +
                    'The first link opens a release form that allows Meridian Health Plan to release information to the memeber.</br></br>' +
                    'The second link opens a relase form that allows Meridian Health Plan to release information to other organizations, or for other organizations</br>' +
                    'to release information to Meridian Health Plan.</br></br>'+
                    'Both formas cna be filled out online They both need to be printed, signed and sent back to Meridian Health Plan at the address indicated on the form.</br></br></h3>'
                },
                {
                    html: 'Meridian Health Plan</br>' +
                    'Attn: Privacy Officer</br>' +
                    '1 Campus Martius</br>' +
                    'Suite 700</br>' +
                    'Detroit, MI 48226</br>'
                },
                {
                    html: '</br><a href="google.com">Download Authorization for Release of Protected Health Information</a>'
                },
                {
                    html: '</br><a href="google.com">Download Authorization for Release of Protected Health Information (Claims)</a>'
                }
              ]
        }
      ]
      }

    ]
});
