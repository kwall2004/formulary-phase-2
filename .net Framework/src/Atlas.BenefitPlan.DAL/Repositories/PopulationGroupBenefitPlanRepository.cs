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
	/// the PopulationGroupBenefitPlan Repository for Benefit Plan
	/// </summary>
	public class PopulationGroupBenefitPlanRepository : EFRepositoryBase<PopGrpBnftPlan, BenefitPlanEntities>, IPopulationGroupBenefitPlanRepository
	{
		/// <summary>
		/// the Constructor for PopulationGroupBenefitPlan Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PopulationGroupBenefitPlanRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(PopGrpBnftPlan itemToUpdate)
        {
            _db.PopGrpBnftPlan.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PopGrpBnftPlanSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

