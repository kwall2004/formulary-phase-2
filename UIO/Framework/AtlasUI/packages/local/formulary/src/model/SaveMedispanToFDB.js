/**
 * Created by s6627 on 10/12/2016.
 */
Ext.define('Atlas.formulary.model.SaveMedispanToFDB',{
    extend: 'Atlas.common.model.Base',
    proxy: {
        url:'formulary/{0}/medispanfdbdrug'
    }
});