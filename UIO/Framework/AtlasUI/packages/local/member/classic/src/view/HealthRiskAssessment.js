Ext.define('Atlas.member.view.HealthRiskAssessment', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-healthriskassessment',

    title: 'Health Risk Assessment',
    items: [
      {
        xtype: 'panel',
        title: 'Health Risk Assessment (HRA)',
        items:[
          {
            padding: '20px',
            html: "Hello {YOUR NAME HERE},"
            + "</br></br>If you wish to download a blank copy of the Healthy Michigan HRA Survey please click on the pdf link below."
            + "<br><br><a href='google.com'>Healthy Michigan Survey Risk Assessment PDF</a>"
            + "</br></br>If you wish to complete the survey online, click on the link below to proceed:"
            + "</br></br><a href='google.com'>Healthy Michigan Survey Health Risk Assessment</a>"
            + "</br></br><b>**Please Note:</b>"
            + "</br>You will be able to fill out Sections 1, 2, and 3 of the form on the Member Portal."
            + "</br>Section 4 of the HRA form must be completed by your Primary Care Physician."
            + "</br>When you have completed filling out Sections 1, 2, and 3 you will be able to save your responses and download the"
            + "</br>entire form including (blank) Section 4 and carry the form to your physician's office for completion and attestation."
          }
        ]
      }
    ]
});
