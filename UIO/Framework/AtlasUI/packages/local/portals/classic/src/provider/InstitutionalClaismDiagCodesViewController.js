// k3279 - Kevin Tabasan - 11/30/2016

Ext.define('Atlas.portals.view.provider.InstitutionalClaimsDiagCodesViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.institutionalclaims-diagcodes',

  init: function () {
    var diagCodesForm = this.lookup('diagCodesForm').getForm(),
      codesTextarea = this.getViewModel().getData().diagCodesTextarea,
      codesTextareaValueArray = codesTextarea.value.split(','),
      counter = 0;

    diagCodesForm.getFields().each(function (field) {
      if ('' !== codesTextareaValueArray[counter] && codesTextareaValueArray[counter] !== undefined) {
        field.setValue(codesTextareaValueArray[counter]);
      }

      counter += 1;
    });
  },

  onCancelClick: function () {
    this.getView().destroy();
  },

  onClearClick: function () {
    var diagCodesForm = this.lookup('diagCodesForm').getForm();

    diagCodesForm.reset();
  },

  onOKClick: function () {
    var diagCodesForm = this.lookup('diagCodesForm').getForm(),
      codesTextarea = this.getViewModel().getData().diagCodesTextarea,
      noteString = '';

    if (diagCodesForm.isValid()) {
      diagCodesForm.getFields().each(function (field) {
        if ('' !== field.lastValue) {
          noteString += field.lastValue + ',';
        }
      });

      codesTextarea.setValue(noteString.substring(0, noteString.length - 1));
      this.getView().destroy();
    } else {
      Ext.Msg.alert('Validation Error', 'At least one diagnosis code needs to be entered.');
    }
  },

  onBlurDiagTextfield: function (record) {
    var value = record.getValue().split('.').join(''),
      beforeDecimal = value.substring(0, 3),
      afterDecimal = value.substring(3);

    if ('' !== value && 3 <= value.length) {
      record.setValue(beforeDecimal + '.' + afterDecimal);
    }

    this.diagCodeValidation(beforeDecimal + '.' + afterDecimal, record);
  },

  diagCodeValidation: function (diagCode, input) {
    var whereClause = '',
      diagCodeModel = Ext.create('Atlas.portals.provider.model.DiagCodeMaster', {});

    if (!diagCode) {
      return;
    }
    whereClause = 'diagCode=\'' + diagCode.replace('.', '') + '\'';

    diagCodeModel.getProxy().setExtraParam('pRowid', '0');
    diagCodeModel.getProxy().setExtraParam('pRowNum', 0);
    diagCodeModel.getProxy().setExtraParam('pRows', 0);
    diagCodeModel.getProxy().setExtraParam('pWhere', whereClause);
    diagCodeModel.getProxy().setExtraParam('pSort', '');
    diagCodeModel.load({
      callback: function (record) {
        if (!record && !record.data) {
          Ext.Msg.alert('Error', 'Could not validate code at this time.');

          return;
        }

        if (!record.data.diagCode && '' !== input.getValue()) {
          input.setValue('');
          Ext.Msg.alert('Input', 'Invalid Diagnoses Code Entered.');
        }
      }
    });
  }
});