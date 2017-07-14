using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces; 
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks; 

namespace Atlas.BenefitPlan.DAL.Repositories
{
	/// <summary>
	/// the LowIncomeCostSharingSubsidySetup Repository for Benefit Plan
	/// </summary>
	public class LowIncomeCostSharingSubsidySetupRepository : EFRepositoryBase<LICSSetup, BenefitPlanEntities>, ILowIncomeCostSharingSubsidySetupRepository
	{
		/// <summary>
		/// the Constructor for LowIncomeCostSharingSubsidySetup Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public LowIncomeCostSharingSubsidySetupRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>S
        /// <param name="itemToUpdate">the NtwrkTier to Add or Update</param>
        public override void AddOrUpdate(LICSSetup itemToUpdate)
        {
            _db.LICSSetup.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.LICSSetupSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

