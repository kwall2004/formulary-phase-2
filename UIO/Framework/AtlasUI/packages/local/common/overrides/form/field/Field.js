/**
 * Add support for nestedIndex
 */
Ext.define('Atlas.common.overrides.form.field.Field', {
    override: 'Ext.form.field.Field',
    compatibility: '6.2.0'

}, function () {
    // Classes that have this mixin already in place won't be affected as the methods are copie to those classes
    // We have to manually replace the method

    var fn = function () {
        var me = this,
            name = me.nestedIndex;

        //nestedIndex has priority over dataIndex and name field
        if (name) {
            return name;
        } else {
            return me.isEditorComponent ? me.dataIndex : me.name;
        }
    };

    Ext.form.field.Base.prototype.getFieldIdentifier = fn;
    Ext.form.CheckboxGroup.prototype.getFieldIdentifier = fn;
    Ext.form.field.HtmlEditor.prototype.getFieldIdentifier = fn;
});
