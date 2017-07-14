using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System.Data.Entity;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the DispenseAsWrittenCopay Repository for Benefit Plan
    /// </summary>
    public class DispenseAsWrittenCopayRepository : EFRepositoryBase<DAWCopay, BenefitPlanEntities>, IDispenseAsWrittenCopayRepository
    {
        /// <summary>
        /// the Constructor for DispenseAsWrittenCopay Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public DispenseAsWrittenCopayRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
		///  Override AddOrUpdate
		/// </summary>
		/// <param name="itemToUpdate">the Coverage Phase to Add or Update</param>
		public override void AddOrUpdate(DAWCopay itemToUpdate)
        {
            _db.DAWCopay.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.DAWCopaySK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}