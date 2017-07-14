Ext.define('Atlas.atlasformulary.store.DrugCategoriesEdit', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.drugcategoriesedit',
  model: 'Atlas.atlasformulary.model.DrugCategory',

  proxy: {
    url: '/drugcategory',
    limitParam: 'pagesize',
    pageParam: 'page',

    extraParams: {
      formularysk: null,
      isnewrequest: true
    }
  }
});
