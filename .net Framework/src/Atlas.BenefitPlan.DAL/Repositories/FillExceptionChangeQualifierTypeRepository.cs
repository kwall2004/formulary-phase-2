using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the FillExceptionChangeQualifierType Repository for Benefit Plan
    /// </summary>
    public class FillExceptionChangeQualifierTypeRepository : EFRepositoryBase<FillExcpChngQulfrType, BenefitPlanEntities>, IFillExceptionChangeQualifierTypeRepository
    {
        /// <summary>
        /// the Constructor for FillExceptionChangeQualifierType Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public FillExceptionChangeQualifierTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
    }
}