Ext.define('Atlas.common.overrides.util.Sorter', {
    override: 'Ext.util.Sorter',

    compatibility: '6.2.0',
    serialize: function () {
        return {
            property: this.getProperty(),
            direction: this.getDirection(),
            dataType:this._type
        };
    }
});