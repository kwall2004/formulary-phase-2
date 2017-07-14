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
	/// the BenefitPlanWaiverRider Repository for Benefit Plan
	/// </summary>
	public class BenefitPlanWaiverRiderRepository : EFRepositoryBase<BnftPlanWvrRider, BenefitPlanEntities>, IBenefitPlanWaiverRiderRepository
	{
		/// <summary>
		/// the Constructor for BenefitPlanWaiverRider Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public BenefitPlanWaiverRiderRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Tenant Address to Add or Update</param>
        public override void AddOrUpdate(BnftPlanWvrRider itemToUpdate)
        {
            _db.BnftPlanWvrRider.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.BnftPlanWvrRiderSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

