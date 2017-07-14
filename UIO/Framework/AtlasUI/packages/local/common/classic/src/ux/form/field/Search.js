Ext.define('Atlas.common.ux.form.field.Search', {
    extend: 'Ext.form.field.Text',

    alias: 'widget.uxsearchfield',

    triggers: {
        clear: {
            weight: 0,
            cls: 'fa-times',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: 'fa-search',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },

    initComponent: function () {
        var me = this;

        me.callParent();

        me.on({
            keyup: 'onKeyUp',
            change: 'onKeyUp',
            specialkey: 'onSpecialKey',
            scope: me
        });
    },

    onSpecialKey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }
    },

    onKeyUp: function () {
        var me = this,
            value = this.getValue(),
            trigger = me.getTrigger('clear');

        if (value.length > 0) {
            trigger.show();
        } else {
            trigger.hide();
        }
    },

    onClearClick: function () {
        var me = this;

        me.getTrigger('clear').hide();
        me.setValue('');

        me.fireEvent('clear');
    },

    onSearchClick: function () {
        this.fireEvent('search', this.getValue());
    }
});
