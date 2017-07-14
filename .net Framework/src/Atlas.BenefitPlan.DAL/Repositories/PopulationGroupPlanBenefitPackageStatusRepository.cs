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
	/// the PopulationGroupPlanBenefitPackageStatus Repository for Benefit Plan
	/// </summary>
	public class PopulationGroupPlanBenefitPackageStatusRepository : EFRepositoryBase<PopGrpPBPStat, BenefitPlanEntities>, IPopulationGroupPlanBenefitPackageStatusRepository
	{
		/// <summary>
		/// the Constructor for PopulationGroupPlanBenefitPackageStatus Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PopulationGroupPlanBenefitPackageStatusRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(PopGrpPBPStat itemToUpdate)
        {
            _db.PopGrpPBPStat.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PopGrpPBPStatSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

