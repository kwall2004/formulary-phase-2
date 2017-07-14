Ext.define('Atlas.atlasformulary.view.common.HierarchyTree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.hierarchytree',
  cls: 'headerTriState',
  rootVisible: false,

  columns: [
    {
      xtype: 'treecolumn',
      dataIndex: 'name',
      text: 'Hierarchy',
      flex: 1,
      rootVisible: false
    }
  ],

  useArrows: true
});
