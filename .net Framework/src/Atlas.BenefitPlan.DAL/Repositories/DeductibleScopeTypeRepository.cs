using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the DeductibleScopeType Repository for Benefit Plan
    /// </summary>
    public class DeductibleScopeTypeRepository : EFRepositoryBase<DeducblScopeType, BenefitPlanEntities>, IDeductibleScopeTypeRepository
    {
        /// <summary>
        /// the Constructor for DeductibleScopeType Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public DeductibleScopeTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
    }
}