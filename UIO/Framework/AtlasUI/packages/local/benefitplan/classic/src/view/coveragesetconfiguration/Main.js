/**
 * Created by n6570 on 11/14/2016.
 */


/**
 * @Class : 'Atlas.benefitplan.view.benefitcoverageset.Main'
 * This Class is the View for the Coverage Set Configuration Module
 * @author : l6630
 * @Date : '5-11-2016'
 */
Ext.define('Atlas.benefitplan.view.coveragesetconfiguration.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Coverage Set Configuration',
    controller: 'coveragesetconfiguration',
    layout: 'fit',
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    viewModel: {
        data: {
            cmbBenefitPlanSK: 0,
            cmbBenefitType: 0,
            LOBName: 0,
            popGrpPBPSK : '0',
            currentUser : 'unknown',
            changed: false,
            validform: false,
            copying:false,
            creatingnew:false,
            changedforms: false,
            thresholdGridValid:true,
            ruleSetsGridValid:true,
            ruleDetailsGridValid:true,
            isCoverageSetCmbselected:false,
            showCoinsEA:false,
            showDedEA:false,
            showCopayEA:false
        },
        stores: {
            monthListstore : {
                model : 'Atlas.benefitplan.model.MonthList',
                autoLoad : true
            },
            coveragesetsallstore:{
                model : 'Atlas.benefitplan.model.CoverageSetsAll',
                sorters: 'CvrgSetSK'
            },
            coveragesetconfigstore : {
                model : 'Atlas.benefitplan.model.CoverageSetConfiguration',
                listeners: {update : 'CoverageSetConfigurationStoreUpdated'}
            },

            frequencyqualifiertypestore :{
                model : 'Atlas.benefitplan.model.FrequencyQualifierType',
                autoLoad : true
            },
            valuequalifiertypestore :{
                model : 'Atlas.benefitplan.model.ValueQualifierType',
                autoLoad : true
            },
            criteriaconditiontypestore :{
                model : 'Atlas.benefitplan.model.CriteriaConditionType',
                autoLoad : true
            },
            thresholdtypestore :{
                model : 'Atlas.benefitplan.model.ThresholdType'

            },
            criteriasettype:{
                model: 'Atlas.benefitplan.model.CriteriaSetType'
            },
            coveragethresholdstore :{
                model : 'Atlas.benefitplan.model.ThresholdConfiguration'
            },
            thresholdqualifiertypestore :{
                model : 'Atlas.benefitplan.model.ThresholdQualifierType',
                autoLoad : true
            },
            CostShareMaximums: {
                model: 'Atlas.benefitplan.model.CostShareMaximums',
                sorters: 'DeducblCodeDesc',
                asynchronusLoad: false,
                queryMode: 'local',
                autosync: false,
                autoload: false
            }
        }
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                pack: 'center',
                align : 'stretch'
            },
            scrollable: true,
            items: [
                // Coverage Set Configuration',
                {
                    xtype: 'container',
                    layout : 'fit',
                    items: [
                        {
                            xtype: 'fieldset',
                            collapsible : true,
                            collapsed : false,
                            title: 'Coverage Set Configuration',
                            items: [
                                {
                                    xtype : 'coveragesetconfig'
                                }
                            ]
                        }
                    ]
                },
                // Criteria Set Details
                {
                    xtype: 'container',
                    layout : 'fit',
                    items: [
                        {
                            xtype: 'fieldset',
                            collapsible : true,
                            collapsed : false,
                            title: 'Criteria Set Detail',
                            items: [
                                {
                                    xtype : 'criteriasetdetail'
                                }
                            ]
                        }
                    ]
                },
                // Threshold Details,
                {
                    xtype: 'container',
                    layout : 'fit',
                    items: [
                        {
                            xtype: 'fieldset',
                            collapsible : true,
                            collapsed : false,
                            title: 'Threshold Detail',
                            items: [
                                {
                                    xtype : 'threshholddetail'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'benefitplan-progress',
            itemId: 'thermometerPanel',
            dock: 'top'
        }
    ],
    bbar: [
        '->',
        {
            text: 'Copy Coverage Set',
            bind: {
                disabled: '{!isCoverageSetCmbselected || creatingnew || copying}'
            },
            handler : 'onCoverageConfigSaveAs'
        },
        {
            text: 'Create New',
            bind: {
                disabled: '{ copying || creatingnew}'
            },
            handler : 'onCoverageConfigCreateNew'
        },
        {
            xtype: 'tbspacer',
            width: 50
        },
        {
            xtype : 'label',
            reference : 'lblModeStatus',
            text : ''
        },
        {
            text: 'Save',
            bind: {
                disabled:  '{(!validform || !thresholdGridValid || !ruleSetsGridValid || !ruleDetailsGridValid || ((!copying && !creatingnew) && (!isCoverageSetCmbselected))) }'
            },
            handler : 'onCoverageConfigSave'
        },
        {
            text: 'Cancel',
            handler : 'onCoverageConfigCancel',
            bind: {
                disabled:  '{!copying && !creatingnew && !isCoverageSetCmbselected}'
            }
        }
    ],
    listeners: {
        beforeClose: 'checkForUnsavedRecords',
        afterrender : 'afterPageRendered'
    }
});
