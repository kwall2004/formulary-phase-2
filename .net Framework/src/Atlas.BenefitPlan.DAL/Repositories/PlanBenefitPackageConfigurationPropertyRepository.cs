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
	/// the PlanBenefitPackageConfigurationProperty Repository for Benefit Plan
	/// </summary>
	public class PlanBenefitPackageConfigurationPropertyRepository : EFRepositoryBase<PBPConfgPrpty, BenefitPlanEntities>, IPlanBenefitPackageConfigurationPropertyRepository
	{
		/// <summary>
		/// the Constructor for PlanBenefitPackageConfigurationProperty Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PlanBenefitPackageConfigurationPropertyRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Plan Benefit Package to Add or Update</param>
        public override void AddOrUpdate(PBPConfgPrpty itemToUpdate)
        {
            _db.PBPConfgPrpty.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PBPConfgPrptySK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

