/**
 * Created by c4539 on 10/5/2016.
 */
Ext.define('Atlas.portals.view.prescriber.MemberDrugAllergyWindow', {
    extend: 'Ext.panel.Panel',

    xtype: 'portalsPrescriberMemberDrugAllergyWindow',

    items: [
        {
            xtype: 'form',

            reference: 'editorForm',

            modelValidation: true,

            bodyPadding: 10,
            
            defaults: {
                minWidth: 350
            },

            items: [
                {
                    xtype: 'allergentypeahead',

                    fieldLabel: 'Allergen',
                    
                    allowBlank: false
                }
            ]
        }
    ]
});