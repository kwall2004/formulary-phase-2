Ext.define('Atlas.atlasformulary.overrides.TextField', {
  override: 'Ext.form.field.Text',
  constructor: function () {
    var me = this;
    me.callParent(arguments);
    if (me.allowBlank === false) {
      me.afterLabelTextTpl = '&nbsp;&nbsp;<span class=\'x-form-required-field\'>*</span>';
    }
  }
});
