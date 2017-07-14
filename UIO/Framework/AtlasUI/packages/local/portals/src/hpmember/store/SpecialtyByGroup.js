Ext.define('Atlas.portals.hpmember.store.SpecialtyByGroup', {
    extend: 'Ext.data.Store',

    alias: 'store.hpmember-specialtybygroup',
    model: 'Atlas.portals.hpmember.model.SpecialtyByGroup',
    sorters: 'value',
    remoteSort: false
});
