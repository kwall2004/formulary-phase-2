/**
 * Created by s6685 on 1/19/2017.
 */
Ext.define('Atlas.member.model.TotalQueDescriptionModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'shared/{0}/quedescription'
    }

});
