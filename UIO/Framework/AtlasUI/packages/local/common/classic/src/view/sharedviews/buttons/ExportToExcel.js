/**
 * Created by T4317 on 10/12/2016.
 * *
 *
 *  Note that you must add the below plugin to the grid in which this export button is attached,
 ******
 *           plugins: [{
                ptype: 'gridexporter'
             }],
 */
Ext.define('Atlas.common.view.ExportToExcel', {
    extend: 'Ext.Button',
    xtype:'exporttoexcelbutton',
    requires:['Ext.grid.plugin.Exporter'],
    text:'Export to Excel',
    listeners:{
        click:function() {
            var gridPanelRef = this.up().up();
            Atlas.common.utility.Utilities.exportToExcel(gridPanelRef.getStore());
        }
    }
});
