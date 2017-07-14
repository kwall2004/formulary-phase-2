/*
 * Last Developer: jagman bhullar
 * Origin:
 * Description: Gives users a place to view their Member Accumulated Benefits.
 *	It allows the user to export the data in a grid and Excel document
 */


Ext.define('Atlas.member.view.AccumulatedBenefit', {
	extend: 'Ext.panel.Panel',
	xtype: 'member-memberaccumulatedbenefit',
	region: 'center',
	title: 'New Accumulated Benefits',
	controller:'accumbenefit',
	viewModel:{
		stores:{
			StoreBenefitEnrollment:{
				type:'memberaccumbenefitenrollment',
                listeners: {
                    'load': 'onAccumBenefitEnrollmentLoad'
                }
			},
			AccumBenefitStore:{
				type:'memberaccumdetail'

			}
		}
	},
	items:[{
		xtype:'panel',
        height: '100%',
		width:'100%',
		title: 'Member Accumulated Benefit',
		dockedItems: [
			{
				xtype: 'toolbar',
				dock: 'top',
				items: [
					{xtype:'button',text:'Expand/Collapse Groups',handler:'btnExpand'},
					'->',
					{xtype: 'combobox', fieldLabel: 'Benefit Year',itemId:'cbxYear', displayField : 'year', valueField : 'year',
						listeners:
						{
							select:'onYearSelect'
						}},
					'-',
					{xtype: 'button', text: 'Export to Excel', iconCls: 'fa fa-file-excel-o',handler:'btnExportToExcel'}
				]
			}
		],
		items: [{
			xtype: 'gridpanel',
			height:800,
			width:'100%',
			bind:{
				store:'{StoreBenefitEnrollment}'
			},
            itemId: 'accumBenefitOuterGrid',
			defaults:{
				align:'right'
			},
			columns: [

				{
				    text: 'CMS Contract Id',
                    dataIndex:'CMSCntrId',
                    flex:1,
                    sortable:false
				},
				{
				    text: 'PCN',
                    dataIndex:'PCNCode',
                    flex:1,
                    sortable:false
				},
				{
				    text: 'Benefit Start Date',
                    dataIndex:'BenefitStartDate',
                    flex:1,
                    sortable:false,
                    formatter: 'date("n/j/Y")'
				},
				{
				    text: 'Benefit End Date',
                    dataIndex:'BenefitEndDate',
                    flex:1,
                    sortable:false,
                    formatter: 'date("n/j/Y")'
				},
				{
					text: 'Family Deductible Spent',
                    dataIndex:'FamilyDed',
                    flex:1,
                    sortable:false,align:'right',
					renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
						if(value == 0){return '$0.00'}
						else return '$'+value;
					}
				},
				{
					text: 'Family OOP Spent',
                    dataIndex:'FamilyTroop',
                    flex:1,
                    sortable:false,align:'right',
					renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
						if(value == 0){return '$0.00'}
						else return '$'+value;
					}
				},
				{
					text: 'Medical OOP Balance',
                    dataIndex:'MoopBalance',
                    flex:1,
                    sortable:false,align:'right',
					renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
						if(value == 0){return '$0.00'}
						else return '$'+value;
					}
				},
				{
				    text: 'OutOfPocketMsg',
                    dataIndex:'OutOfPocketMsg',
                    flex:1,
                    hidden:true,
                    sortable:false
				},
				{   text: 'DrugCostMsg',
                    dataIndex:'DrugCostMsg',
                    flex:1,
                    hidden:true,
                    sortable:false
				},
				{   text: 'RecSeqBenefitYear',
                    dataIndex:'RecSeqBenefitYear',
                    flex:1,
                    hidden:true,
                    sortable:false
				},
				{   text: 'CanReprocess',
                    dataIndex:'CanReprocess',
                    flex:1,
                    hidden:true,
                    sortable:false,
					renderer: function (value) {
						if (value)
							return 'Yes';
						else
							return 'No';
					}
				},
				{
					text:'Reprocess',
                    flex:1,
                    sortable:false,hideable:false,
					xtype:'actioncolumn',
                    itemId:'btnRep',
					items: [{
						xtype:'button',
						iconCls: 'x-fa fa-refresh',  // Use a URL in the icon config
						tooltip: 'Reprocess Accumulators',
						handler:'btnReprocess',
						isDisabled : function(view, rowIndex, colIndex, item, record) {
							if (record.data.CanReprocess){
								return false;
							}
							else {
								return true;
							}
						}
					}]
				}
			],
			dockedItems:[{
				xtype:'toolbar',
                dock:'bottom',
				items:[
					{xtype:'displayfield',itemId:'lblOutOfPocketMsg'},'-',
					{xtype:'displayfield',itemId:'lblDrugCostMsg'},'-',
					{xtype:'displayfield',itemId:'lblTier2Tier3Msg'}
				]
			}],
			listeners:{groupexpand:'onExpand'},
			plugins:[
				{
					ptype:'rowwidget',
                    listeners:
                    {
					    groupexpand:'onExpand'
                    },
					widget:{
						xtype: 'grid',
                        height: 760,
                        width:'100%',
                        name:'accumBenefitInnerGrid',
                        itemId: 'accumBenefitInnerGrid',
                        scrollable:true,
						defaults:{
							align:'right'
						},
						//autoLoad:true,
						bind: {
							store: '{AccumBenefitStore}'
						},
						columns:[
                            {
                                text:'Month',
                                dataIndex:'BenefitMonth',
                                flex:1,
                                hidden: true

                            },
                            {
							    text:'Service Date',
                                dataIndex:'serviceDate',
                                width: 150,
                                summaryType: 'count',
                                summaryRenderer: function (value, summaryData, field, metaData)
                                {
									return metaData.record.ownerGroup ? //<-- Are we rendering group?
										Ext.String.format('<b> Total: </b>', value, value !== 1 ? '' : '') :  '<b> Grand Total: </b>';
                                },
                                formatter: 'date("n/j/Y")'
                            },
                            {
                                text:'Transaction Date',
                                dataIndex:'transactionDate',
                                formatter: 'date("n/j/Y")',
                                xtype: 'datecolumn'
                            },
                            {
							    text:'Beginning Benefit Phase',
                                dataIndex:'BBP',
                                flex:1
							},
							{
							    text:'Ending Benefit Phase',
                                dataIndex:'EBP',
                                flex:1
							},
							{
							    text:'Trans Type',
                                dataIndex:'transactionCode',
                                flex:1
							},
							{
							    text:'Claim Id',
                                dataIndex:'transactionId',
                                width: 100
							},
                            {
                                text:'Claim Line Number',
                                dataIndex:'LineNumber',
                                flex:1
                            },
							{
							    text:'NDC',
                                dataIndex:'NDC',
                                flex:1
							},
							{
							    text:'LN',
                                dataIndex:'LN',
                                width: 250
							},
							{
								text:'TROOP',
                                dataIndex:'troop',
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                             if(value == 0){return '$0.00'}
                             else return '$'+value;
                             },*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
								text:'PLRO',
                                dataIndex:'PLRO',
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
								text:'Other Troop',
                                dataIndex:'OthTroopAmt',
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
								text:'Member Spend',
                                dataIndex:'PatPayAmt',
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
							/*	renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
                            {
                                text: 'DAW Penalty',
                                formatter: 'usMoney',
                                summaryType: 'sum',
                                dataIndex:'DAWPenalty',align:'right',
                                summaryRenderer: function(value, summaryData, dataIndex) {
                                    if(value == 0){return '<b>$0.00</b>'}
                                    return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
                                }
                            },
							{
								text:'LICS',
                                dataIndex:'LICS',
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
								text:'Gap Discount',
                                dataIndex:'RepGapDisc',
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+ value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00') +'</b>';
								}
							},
							{
								text:'Plan Spend',
                                dataIndex:'CPP',
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+ value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00') +'</b>';
								}

							},
							{
							    text:'Total Drug Cost',
                                dataIndex:'totalDrugCost',
                                width: 100,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
                            {
                                text:'Prev TDC',
                                dataIndex:'prevTDC',
                                flex:1,
                                hidden:true,
                                summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
                               /* renderer: function(value, metaData, record, rowIdx, colIdx, store, view)
                                {
                                    if(value == 0){return '$0.00'}
                                    else return '$'+value;
                                },*/
                                summaryRenderer: function(value, summaryData, dataIndex)
                                {
                                    if(value == 0){return '<b>$0.00</b>'}
                                    return '<b>$'+ value+'</b>';
                                }
                            },
                            {
							    text:'Prev Plan Paid Amt',
                                dataIndex:'prevPlanPaidAmt',
                                hidden: true,
                                flex:1,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}},
							{
							    text:'Prev Lics Amt',
                                dataIndex:'prevLicsAmt',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
							/*	renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
                            {
                                text:'Prev Member Paid',
                                dataIndex:'prevMemberPaid',
                                flex:1,hidden:true,
                                summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
                               /* renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                                    if(value == 0){return '$0.00'}
                                    else return '$'+value;
                                },*/
                                summaryRenderer: function(value, summaryData, dataIndex) {
                                    if(value == 0){return '<b>$0.00</b>'}
                                    return '<b>$'+ value+'</b>';
                                }},
							{
							    text:'Prev Other Plan Paid',
                                dataIndex:'prevOtherPlanPaid',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
							    text:'Benefit Stage Amt1',
                                dataIndex:'benefitStageAmt1',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
							/*	renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
							    text:'Benefit Stage Amt2',
                                dataIndex:'benefitStageAmt2',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
							/*	renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}},
							{
							    text:'Benefit Stage Amt3',
                                dataIndex:'benefitStageAmt3',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
							/*	renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
							    text:'Benefit Stage Amt4',
                                dataIndex:'benefitStageAmt4',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
							    text:'Copay Amt',
                                dataIndex:'copayAmt',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
							/*	renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
							    text:'Coins Amt',
                                dataIndex:'coinsAmt',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							},
							{
							    text:'Deduct Amt',
                                dataIndex:'deductAmt',
                                flex:1,
                                hidden:true,
								summaryType: 'sum',
                                formatter: 'usMoney',align:'right',
								/*renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
									if(value == 0){return '$0.00'}
									else return '$'+value;
								},*/
								summaryRenderer: function(value, summaryData, dataIndex) {
									if(value == 0){return '<b>$0.00</b>'}
									return '<b>$'+ Ext.util.Format.number(value,'0.00')+'</b>';
								}
							}
						],
                        features: [
                            {
                                groupHeaderTpl: [
                                '{name:this.calculateValues}',
                                {
                                    calculateValues: function(value){

                                        if(value == 0)
                                            return '<b> Medical:</b>';
                                        else
                                            return '<b> Month: </b>' +'<b>'+ value +'</b>';
                                    }
                                }
                                ],
                                ftype: 'groupingsummary',align:'right',startCollapsed:true,
							showSummaryRow: true //<-- this will turn off summary under each group
                            },
                            {
                                ftype: 'summary',align:'right',
                                dock: 'bottom'
                            }]
					}
				}]
		}]
	}]
});