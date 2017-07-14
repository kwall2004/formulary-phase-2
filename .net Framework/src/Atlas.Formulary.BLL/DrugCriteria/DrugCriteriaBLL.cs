using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.DrugCriteria
{
    /// <summary>
    /// Business logic for drug criteria.
    /// </summary>
    /// <remarks>
    /// Drug criteria are the parts that make up a drug category.
    /// Drug categories are also comonly refered to as rules. 
    /// </remarks>
    public class DrugCriteriaBLL : IDrugCriteriaBLL
    {
        private IFormularyRepositoryFactory _repoFactory;

        public DrugCriteriaBLL(IFormularyRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get's all the criteria for a drug category. 
        /// </summary>
        /// <param name="drugCategorySK"></param>
        /// <returns></returns>
        public QueryResult<Criteria> GetCriteriaForDrugCategorySK(long drugCategorySK)
        {
            var result = new QueryResult<Criteria>();

            using (var drugCategoryRepository = _repoFactory.DrugCategory())
            {
                var criteria = new List<Criteria>();
                drugCategoryRepository.GetDrugCategoryCriteria(drugCategorySK).ForEach(c =>
                criteria.Add(new Criteria()
                {
                    Operator = c.OperTypeCode,
                    Property = c.ValQulfrCode,
                    Value = c.CrtriaVal
                }));
                result.Rows = criteria;
                result.Count = criteria.Count();
            }

            return result;
        }
    }
}
