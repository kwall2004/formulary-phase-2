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
	/// the PopulationGroupPlanBenefitPackage Repository for Benefit Plan
	/// </summary>
	public class PopulationGroupPlanBenefitPackageRepository : EFRepositoryBase<PopGrpPBP, BenefitPlanEntities>, IPopulationGroupPlanBenefitPackageRepository
	{
		/// <summary>
		/// the Constructor for PopulationGroupPlanBenefitPackage Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PopulationGroupPlanBenefitPackageRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(PopGrpPBP itemToUpdate)
        {
            _db.PopGrpPBP.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PopGrpPBPSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

