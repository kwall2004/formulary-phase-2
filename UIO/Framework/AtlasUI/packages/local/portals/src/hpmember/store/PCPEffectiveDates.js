/**
 * Created by b6636 on 11/4/2016.
 */
Ext.define('Atlas.portals.hpmember.store.PCPEffectiveDates', {
    extend: 'Ext.data.ArrayStore',

    alias: 'store.hpmember-pcpeffectivedates',
    fields: ['effectiveDate'],

    listeners: {
        load: function (store) {
            var dt = new Ext.Date.getFirstDateOfMonth(new Date()),
                dateList = [];

            for (var i = 1; i <= 12; i++) {
                dateList.push(Ext.Date.format(Ext.Date.getFirstDateOfMonth(Ext.Date.add(dt, Ext.Date.MONTH, i)), 'm/d/Y'));
            }

            // Feed store with the data
            store.setData(dateList);
        }
    }
});