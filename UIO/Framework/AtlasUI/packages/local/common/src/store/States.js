Ext.define('Atlas.common.store.States',{
    extend: 'Ext.data.Store',

    alias: 'store.common-states',
    model: 'Atlas.common.model.State',

    listeners:{
        load: function(store){
            //Add --- value that is not present in payload options
            store.insert(0, {name:'---', value: ''});
        }
    }
});
