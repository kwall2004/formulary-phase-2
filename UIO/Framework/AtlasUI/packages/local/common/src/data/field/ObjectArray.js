// Sample usage
// https://fiddle.sencha.com/#fiddle/1jm9
Ext.define('Atlas.common.data.field.ObjectArray', {
    extend: 'Ext.data.field.Field',

    alias: 'data.field.objectarray',

    isObjectArray: true,
    isObjectArrayField: true,

    delimiter: '|',
    separator: '^',

    keyName: 'name',
    valueName: 'value',

    hash: false, // create object hash

    compare: function(o1, o2) {
        //TODO write compare function
        return 1;
    },

    convert: function(value) {
        var me = this,
            data,
            i = 0,
            obj = {},
            pairs, len, tmp;

        if (Ext.isArray(value)) {
            return value;
        }

        if (me.delimiter && me.separator && Ext.isString(value)) {
            if (value !== '') {
                pairs = value.split(me.delimiter);
                len = pairs.length;

                me.hash ? data = {} : data = [];

                for (; i < len; i++) {
                    tmp = pairs[i].split(me.separator);
                    obj = {};

                    if (me.hash) {
                        data[tmp[0]] = tmp[1];
                    } else {
                        obj[me.keyName] = tmp[0];
                        obj[me.valueName] = tmp[1];
                        data.push(obj);
                    }
                }
            }
            return data;
        }

        if (me.hash && value) {
            return value;
        }
    },

    serialize: function(value) {
        var me = this,
            key, i = 0,
            iLen, arr = [],
            tmp;

        if (Ext.isArray(value)) {


            if (!me.allowBlank) {
                value = Ext.Array.filter(value, function(a) {
                    return a !== '';
                });
            }

            len = value.length;
            for (; i < len; i++) {
                arr.push(value[i][me.keyName] + me.separator + value[i][me.valueName]);
            }


            return me.delimiter ? arr.join(me.delimiter) : value;
        }

        if (me.hash) {
            for (key in value) {
                arr.push(key + me.separator + value[key]);
            }
            return me.delimiter ? arr.join(me.delimiter) : value;
        }

        return value;
    },

    getType: function() {
        return 'objectarray';
    }
});
