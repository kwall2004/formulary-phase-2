Ext.define('Atlas.atlasformulary.overrides.BetweenDates', {
  override: 'Ext.form.field.VTypes',

  formularyDateRange: function (val, field) {
    var date = field.parseDate(val);

    if (!date) {
      return false;
    }

    if (field.startDateField) {
      var start = field.up('form').down('#' + field.startDateField);
      start.setMaxValue(date);
    } else if (field.endDateField) {
      var end = field.up('form').down('#' + field.endDateField);
      end.setMinValue(date);
    }

    return true;
  },

  formularyDateRangeText: 'Effective Date (end) must be greater than Effective Date (start).'
});
