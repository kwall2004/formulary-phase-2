/**
 * Created by b2352 on 12/21/2016.
 */


Ext.define('Atlas.plan.store.PlanProgramCodes',{
    alias: 'store.plan-planprogramcodes',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanProgramCode',
    autoLoad: false,
    pageSize:18

});