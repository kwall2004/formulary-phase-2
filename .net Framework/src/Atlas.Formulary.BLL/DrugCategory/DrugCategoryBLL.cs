using System;
using System.Collections.Generic;
using System.Linq;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.BLL.Services.DrugSearch;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.BLL.DrugCategory;
using Atlas.Formulary.DAL.ViewModels;

namespace Atlas.Formulary.BLL.DrugSearch
{
    /// <summary>
    /// Business logic for drug categories.
    /// </summary>
    /// <remarks>
    /// Drug categories are also commonly refered to as rules. 
    /// </remarks>
    public class DrugCategoryBLL : IDrugCategoryBLL
    {
        private IFormularyRepositoryFactory _repoFactory;

        public DrugCategoryBLL(IFormularyRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Gets all drug categories (AKA rules) related to a formulary. 
        /// </summary>
        /// <param name="formularySK"></param>
        /// <returns></returns>
        public QueryResult<DrugCategoryVM> GetDrugCategoriesByFormularySK (long formularySK)
        {
            var result = new QueryResult<DrugCategoryVM>();

            using (var drugCategoryRepository = _repoFactory.DrugCategory())
            {
                var cats = drugCategoryRepository.GetAllDrugCategories(formularySK).ToList();
                var catVMs = new List<DrugCategoryVM>();

                cats.ForEach(c => catVMs.Add(
                    new DrugCategoryVM()
                    {
                        FormularySK = c.FrmlrySK,
                        DrugCategorySK = c.DrugCatgSK,
                        Name = c.DrugCatgName
                    }));

                result.Rows = catVMs;
                result.Count = cats.Count();
            }

            return result;
        }

    }
}
