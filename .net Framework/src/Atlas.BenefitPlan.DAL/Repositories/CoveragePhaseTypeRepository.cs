using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the CoveragePhaseType Repository for Benefit Plan
    /// </summary>
    public class CoveragePhaseTypeRepository : EFRepositoryBase<CvrgPhaseType, BenefitPlanEntities>, ICoveragePhaseTypeRepository
    {
        /// <summary>
        /// the Constructor for CoveragePhaseType Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public CoveragePhaseTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
    }
}