// Sample usage
// https://fiddle.sencha.com/#fiddle/1jm9
Ext.define('Atlas.common.data.field.Array', {
    extend: 'Ext.data.field.Field',

    alias: 'data.field.array',

    isArray: true,
    isArrayField: true,
    allowBlank: false,

    delimiter: '|',

    compare: function(o1, o2) {
        //debugger
        var i = 0,
            len;
        if (!o1 && !o2) {
            return 0;
        }
        if (!o1) {
            return -1;
        }
        if (!o2) {
            return 1;
        }
        if (o1.length !== o2.length) {
            return o1.length > o2.length ? -1 : 1;
        }
        len = o1.length;
        for (; i < len; i++) {
            if (o2.indexOf(o1[i]) === -1) {
                return 1;
            }
        }
        return 0;
    },

    convert: function(value) {
        var me = this;

        if (me.delimiter && Ext.isString(value)) {
            if (value === '') {
                value = [];
            } else {
                value = value.split(me.delimiter)
            }
        }

        if (Ext.isArray(value)) {
            if (me.map) {
                value = value.map(me.map);
            }
            return value;
        }

        return [];
    },

    serialize: function(value) {

        if (Ext.isArray(value)) {
            if (!this.allowBlank) {
                value = Ext.Array.filter(value, function(a) {
                    return a !== '';
                });
            }
            return this.delimiter ? value.join(this.delimiter) : value;

        }
        return value;
    },

    getType: function() {
        return 'array';
    }
});
