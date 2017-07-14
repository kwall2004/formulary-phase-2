/**
 * Created by j2560 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.view.CustomTrigger', {
    extend: 'Ext.form.field.Text',
    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function(){
                this.searchHierarchy();
			}
        }
    },
    alias: 'widget.searchtenanthierarchytrigger',
    enableKeyEvents: true,
    onKeyUp: function(event, item, eOpts){
        if(event.keyCode === 13) {
            //debugger;
            this.searchHierarchy();
        }
    },
    searchHierarchy: function() {
        /*Users must be able to search within the Tenant Family configuration screen by any level of the Tenant Hierarchy. The user will be provided with search results by entering criteria into a type-ahead field. The type-ahead search bar must provide the user with the hierarchical levels above the name that has been entered into the search field. For example, if the user searches "Ford", the user must be provided with all hierarchy names and their associated level(s) above. If there is a "Ford" Account, a "Ford-MI" Group and a "Ford Stamping Plant" Population Group, the user will be provided with the following search results in the type-ahead field:
         ·         Tenant Family: Caidan
         ·         Tenant: MHP-MI
         ·         Account: Ford

         ·         Tenant Family: Caidan
         ·         Tenant: MHP-MI
         ·         Account: Ford
         ·         Group: Ford-MI

         ·         Tenant Family: Caidan
         ·         Tenant: MHP-MI
         ·         Account: Ford
         ·         Group: Ford-MI
         ·         Population Group: Ford Stamping Plant
         */
        this.up().getViewModel().getStore('hierarchytree').addFilter(this.up().getController().filter);
        this.up().getViewModel().getStore('hierarchytree').filter(this.up().getController().filter);
    }
});