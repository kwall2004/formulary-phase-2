Ext.define('Atlas.common.overrides.form.Panel', {
    override: 'Ext.form.Panel',

    compatibility: '6.2.0',

    loadRecord: function (record, nested) {
        return this.getForm().loadRecord(record, nested);
    },

    updateRecord: function (record, nested) {
        return this.getForm().updateRecord(record, nested);
    }
});