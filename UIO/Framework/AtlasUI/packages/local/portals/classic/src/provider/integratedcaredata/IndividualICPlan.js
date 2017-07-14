/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.IndividualICPlan', {
  extend: 'Ext.panel.Panel',
  xtype: 'individualicplan',
  title: 'Individual Integrated Care Plan',

  items: [
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 300,
      scrollable: true,
      maxHeight: 600,
      minHeight: 300,
      title: 'Individual Integrated Care Plan',
      bind: {
        store: '{individualicplanstore}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPDueByDate',
          text: 'POC Due By Date'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPStartDate',
          text: 'POC Start Date'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPProblem',
          text: 'Problem'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPBarriers',
          text: 'Barriers'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPStrengths',
          text: 'Strengths'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPPriority',
          text: 'Member Centered POC Priority'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPGoal',
          text: 'POC Goal'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPGoalType',
          text: 'POC Term of The Goal'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPIntervention',
          text: 'Interventions'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPGoalStatus',
          text: 'Goal Status'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPGoalStartDate',
          text: 'POC Goal Start Date'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPGoalEndDate',
          text: 'Goal End Date'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPDeclineDate',
          text: 'Goal Decline Date'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICPTimeForCompletion',
          text: 'Timeframe for Completion'
        }
      ],

      bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        emptyMsg: 'No Individual Care Plans to display.'
      }
    }
  ]
});