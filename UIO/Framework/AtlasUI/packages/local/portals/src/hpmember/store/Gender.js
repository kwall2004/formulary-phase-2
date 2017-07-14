Ext.define('Atlas.portals.hpmember.store.Genders', {
    extend: 'Ext.data.Store',

    alias: 'store.hpmember-genders',
    model: 'Atlas.portals.hpmember.model.Gender',
    data: [
        {
            "id": "M",
            "name": "Male"
        },
        {
            "id": "F",
            "name": "Female"
        }
    ]
});
