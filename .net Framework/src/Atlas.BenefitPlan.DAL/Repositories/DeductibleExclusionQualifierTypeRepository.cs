using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    public class DeductibleExclusionQualifierTypeRepository : EFRepositoryBase<DeducblExclQulfrType, BenefitPlanEntities>, IDeductibleExclusionQualifierTypeRepository
    {
        public DeductibleExclusionQualifierTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
    }
}