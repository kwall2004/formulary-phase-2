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
	/// the PlanBenefitPackage Repository for Benefit Plan
	/// </summary>
	public class PlanBenefitPackageRepository : EFRepositoryBase<PBP, BenefitPlanEntities>, IPlanBenefitPackageRepository
	{
		/// <summary>
		/// the Constructor for PlanBenefitPackage Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PlanBenefitPackageRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Plan Benefit Package to Add or Update</param>
        public override void AddOrUpdate(PBP itemToUpdate)
        {
            _db.PBP.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PBPSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

