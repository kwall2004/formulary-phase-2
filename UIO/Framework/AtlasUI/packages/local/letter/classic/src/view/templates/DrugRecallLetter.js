/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.DrugRecallLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'DrugRecallLetter',
    itemId: 'fsTemplate',
    title: 'Drug Recall Letter Template',
    region: 'center',
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'fit'
    },
    defaults: {
        xtype: 'textfield',
        labelAlign: 'left',
        labelWidth: 150,
        width:'50%'
    },
        items: [
            {xtype: 'datefield', fieldLabel: 'Date of Recall', itemId: 'Freetext1', name: 'Freetext1', format: 'm/d/Y',allowBlank:false},
            {fieldLabel: 'Initiated By', itemId: 'Freetext2', name: 'Freetext2',allowBlank:false},
            {fieldLabel: 'Recall Of', itemId: 'Freetext3', name: 'Freetext3',allowBlank:false},
            {xtype: 'textarea', fieldLabel: 'Reason', itemId: 'Freetext4', name: 'Freetext4', height: 120,allowBlank:false},
            {xtype: 'textarea', fieldLabel: 'Products', itemId: 'Freetext5', name: 'Freetext5', height: 120,allowBlank:false},
            {
                xtype: 'form',
                isFormField:false,
                layout: 'hbox',
                style: 'background: #ffffff',
                items: [
                    {
                        xtype: 'combobox',
                        itemId: 'Freetext6',
                        name: 'Freetext6',
                        fieldLabel: 'Drug Recall Extract Jobs',
                        displayField: 'description',
                        valueField: 'jobNum',
                        dataIndex: 'jobNum',
                        allowBlank:false,
                        labelWidth: 152,
                        width:50,
                        emptyText: 'Drug Recall Extract Jobs',
                        flex: 1,
                        matchFieldWidth: false,
                        queryMode: 'local',
                        bind: {
                            store: '{drugrecalljobqdata}'
                        },
                        tpl: Ext.create('Ext.XTemplate',
                            '</Html>'
                            + '<tpl for=".">'
                            + '<tpl if="xindex == 1">'
                            + '<table class="comboGrid">'
                            + '<tr>'
                            + '<th>Job Num</th>'
                            + '<th>Description</th>'
                            + '<th>Status</th>'
                            + '<th>Submit Date</th>'
                            + '<th>Start Date</th>'
                            + '</tr>'
                            + '</tpl>'
                            + '<tr style="color:black;" class="x-boundlist-item">'
                            + '<td>{jobNum}</td>'
                            + '<td>{description}</td>'
                            + '<td>{jobStatus}</td>'
                            + '<td>{submitDateTime}</td>'
                            + '<td>{startDateTime}</td>'
                            + '</tr>'
                            + '<tpl if="xindex==0">'
                            + '</table>'
                            + '</tpl>'
                            + '</tpl>'
                            + '</Html>'),
                        listeners: {
                            select: 'setVMDRDocumentID'
                        }
                    },
                    {
                        xtype: 'button',
                        itemId:'btnViewOutput',
                        name: 'btnDocView',
                        text: 'View Output',
                        handler: 'onClickView',
                        disabled:true
                    }
                ]
            },
            {
                xtype: 'combobox',
                itemId: 'Freetext7',
                name: 'Freetext7',
                allowBlank:false,
                fieldLabel: 'Line of Business',
                displayField: 'name',
                valueField: 'value',
                dataIndex: 'value',
                forceSelection:true,
                //emptyText: 'Line of Business',
                queryMode: 'local',
                bind: {
                    store: '{lobstoredata}'
                }
            }
        ]
});