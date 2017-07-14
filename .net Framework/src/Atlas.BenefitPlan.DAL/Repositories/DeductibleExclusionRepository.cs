using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System.Data.Entity;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the DeductibleExclusion Repository for Benefit Plan
    /// </summary>
    public class DeductibleExclusionRepository : EFRepositoryBase<DeducblExcl, BenefitPlanEntities>, IDeductibleExclusionRepository
    {
        /// <summary>
        /// the Constructor for DeductibleExclusion Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public DeductibleExclusionRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        /// Add Or Update
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(DeducblExcl itemToUpdate)
        {
            _db.DeducblExcl.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.DeducblExclSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}