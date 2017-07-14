Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel6', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel6',
  margin: '20 0 0 20',
  defaults: {},
  layout: 'column',
  items: [
    {
      xtype: 'textareafield',
      columnWidth: 0.50,
      fieldLabel: 'PDF Message',
      name: 'txtareaPDFMsg',
      itemId: 'txtareaPDFMsg',
      labelAlign: 'top',
      emptyText: 'Type PDF Message Here ...',
      bind: '{umcriteriarec.PDFMessage}'
    },
    {
      xtype: 'textareafield',
      columnWidth: 0.50,
      fieldLabel: 'Notes (Internal Use)',
      labelAlign: 'top',
      name: 'txtareaNotes',
      itemId: 'txtareaNotes',
      emptyText: 'Type Internal Use Notes Here ...',
      bind: '{umcriteriarec.UserNotes}'
    }
  ]
});