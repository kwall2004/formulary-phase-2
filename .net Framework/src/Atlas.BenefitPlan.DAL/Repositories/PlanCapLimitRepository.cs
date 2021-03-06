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
	/// the PlanCapLimit Repository for Benefit Plan
	/// </summary>
	public class PlanCapLimitRepository : EFRepositoryBase<PlanCapLim, BenefitPlanEntities>, IPlanCapLimitRepository
	{
		/// <summary>
		/// the Constructor for PlanCapLimit Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PlanCapLimitRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Plan Cap Limit to Add or Update</param>
        public override void AddOrUpdate(PlanCapLim itemToUpdate)
        {
            _db.PlanCapLim.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PlanCapLimSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

