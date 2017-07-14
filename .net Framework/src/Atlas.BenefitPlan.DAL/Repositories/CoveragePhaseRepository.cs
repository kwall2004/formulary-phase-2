using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System.Data.Entity;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the CoveragePhase Repository for Benefit Plan
    /// </summary>
    public class CoveragePhaseRepository : EFRepositoryBase<CvrgPhase, BenefitPlanEntities>, ICoveragePhaseRepository
    {
        /// <summary>
        /// the Constructor for CoveragePhase Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public CoveragePhaseRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
		///  Override AddOrUpdate
		/// </summary>
		/// <param name="itemToUpdate">the Coverage Phase to Add or Update</param>
		public override void AddOrUpdate(CvrgPhase itemToUpdate)
        {
            _db.CvrgPhase.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CvrgPhaseSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}