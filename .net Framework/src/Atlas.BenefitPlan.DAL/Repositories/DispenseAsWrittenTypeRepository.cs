using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the DispenseAsWrittenType Repository for Benefit Plan
    /// </summary>
    public class DispenseAsWrittenTypeRepository : EFRepositoryBase<DAWType, BenefitPlanEntities>, IDispenseAsWrittenTypeRepository
    {
        /// <summary>
        /// the Constructor for DispenseAsWrittenType Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public DispenseAsWrittenTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
    }
}