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
	/// the CopayOverride Repository for Benefit Plan
	/// </summary>
	public class CopayOverrideRepository : EFRepositoryBase<CopayOvrrd, BenefitPlanEntities>, ICopayOverrideRepository
	{
		/// <summary>
		/// the Constructor for CopayOverride Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public CopayOverrideRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate for Copay Exclusion
        /// </summary>
        /// <param name="itemToUpdate">the Copay Distribution to Add or Update</param>
        public override void AddOrUpdate(CopayOvrrd itemToUpdate)
        {
            _db.CopayOvrrd.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CopayOvrrdSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

