using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the EarlyRefillExcptionQulfierType Repository for Benefit Plan
    /// </summary>
    public class EarlyRefillExcptionQulfierTypeRepository : EFRepositoryBase<EarlyRefillExcpQulfrType, BenefitPlanEntities>, IEarlyRefillExcptionQulfierTypeRepository
    {
        /// <summary>
        /// the Constructor for EarlyRefillExcptionQulfierType Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public EarlyRefillExcptionQulfierTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
    }
}