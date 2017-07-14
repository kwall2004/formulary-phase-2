Ext.define('Atlas.portals.view.hpmember.EnrollWellnessProgram', {
    extend: 'Ext.Container',
    xtype: 'portalshpmemberenrollwellnessprogram',
    controller: 'portalshpmemberenrollwellnessprogram',
    title: 'Enroll into a Wellness Program',
    viewModel: {
        data: {
            wellnessDescription: '',
            daySelected: false
        }
    },
    items: {
        xtype: 'panel',
        title: 'Enroll into a Wellness Program!',
        cls: 'card-panel',
        width: 680,
        bodyPadding: '15 50 15 15',
        items: [
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'container',
                        border: false,
                        bind: {
                            html: '<p>{wellnessDescription}</p>'
                        }
                    },
                    {
                        xtype: 'form',
                        cls: 'formPanel',
                        reference: 'enrollForm',
                        listeners: {
                            'dirtychange': 'onFormValueChange'
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Please provide us with the days and times that work best for you',
                                width: 600,
                                items: [{
                                    xtype: 'container',
                                    layout: {
                                        type: 'table',
                                        columns: 4,
                                        border: false
                                    },
                                    items: [
                                        { width: 150, html: '', style: {border: 'none !important'} },
                                        { xtype: 'container', width: 100, html: 'Morning', style: {border: 'none !important', textAlign: 'center'} },
                                        { xtype: 'container', width: 100, html: 'Afternoon', style: {border: 'none !important', textAlign: 'center'} },
                                        { xtype: 'container', width: 100, html: 'Anytime', style: {border: 'none !important', textAlign: 'center'} },

                                        { xtype: 'container', html: 'Monday', style: {border: 'none !important'} },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Monday', inputValue: 'Monday Morning' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Monday', inputValue: 'Monday Afternoon' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Monday', inputValue: 'Monday Anytime' } },

                                        { xtype: 'container', html: 'Tuesday', style: {border: 'none !important'} },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Tuesday', inputValue: 'Tuesday Morning' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Tuesday', inputValue: 'Tuesday Afternoon' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Tuesday', inputValue: 'Tuesday Anytime' } },

                                        { xtype: 'container', html: 'Wednesday', style: {border: 'none !important'} },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Wednesday', inputValue: 'Wednesday Morning' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Wednesday', inputValue: 'Wednesday Afternoon' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Wednesday', inputValue: 'Wednesday Anytime' } },

                                        { xtype: 'container', html: 'Thursday', style: {border: 'none !important'} },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Thursday', inputValue: 'Thursday Morning' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Thursday', inputValue: 'Thursday Afternoon' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Thursday', inputValue: 'Thursday Anytime' } },

                                        { xtype: 'container', html: 'Friday', style: {border: 'none !important'} },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Friday', inputValue: 'Friday Morning' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Friday', inputValue: 'Friday Afternoon' } },
                                        { xtype: 'container', layout: 'center', items: {xtype: 'radiofield', name: 'Friday', inputValue: 'Friday Anytime' } }
                                    ]
                                }, {
                                    xtype: 'container',
                                    width: '100%',
                                    margin: '10px 0 0 0',
                                    layout: {
                                        pack: 'center',
                                        align: 'center',
                                        type: 'hbox'
                                    },
                                    items: {
                                        xtype: 'button',
                                        text: 'Enroll Now',
                                        align: 'center',
                                        iconCls: 'x-fa fa-share-square-o',
                                        width: 200,
                                        handler: 'enroll',
                                        bind: {
                                            disabled: '{!daySelected}'
                                        }
                                    }
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});