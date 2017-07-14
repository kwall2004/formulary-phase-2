Ext.define('Atlas.common.model.field.ZipCode', {
    extend: 'Ext.data.field.String',
    alias: 'data.field.zipcode',
    validators: [
        {
            type: 'format',
            matcher: /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/,
            message: 'The zip code format is wrong, e.g., 94105-0011 or 94105'
        }
    ]
});