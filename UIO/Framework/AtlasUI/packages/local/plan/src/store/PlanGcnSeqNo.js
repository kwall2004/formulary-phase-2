/**
 * Created by S4505 on 11/17/2016.
 */

Ext.define('Atlas.plan.store.planGcnSeqNo',{
    extend: 'Ext.data.Store',
    alias: 'store.plan-plangcnseqno',
    model: 'Atlas.common.model.portals.MedicationMasterExtP',
    autoLoad: false,
    remoreFilter:true,
    remoteSort:true
});