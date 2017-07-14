Ext.define('Atlas.prescriber.model.State',{
    extend: 'Ext.data.Model',

    fields: [
        { name: "state" , type: "string"},
        { name: "abbrv" , type: "string"}
    ],
    proxy: {
        url: 'http://localhost:1841/apps/atlas/resources/data/dummydata/prescriber/states.json'
    }
});


