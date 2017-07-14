Ext.define('Atlas.letter.model.templates.TransitionTypeModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.transitiontypemdl',
    fields: ['id', 'name'],
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});