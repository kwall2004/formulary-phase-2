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
	/// the BenefitPlanPharmacyTypeDaySupply Repository for Benefit Plan
	/// </summary>
	public class BenefitPlanPharmacyTypeDaySupplyRepository : EFRepositoryBase<BnftPlanPharmTypeDaySupl, BenefitPlanEntities>, IBenefitPlanPharmacyTypeDaySupplyRepository
	{
		/// <summary>
		/// the Constructor for BenefitPlanPharmacyTypeDaySupply Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public BenefitPlanPharmacyTypeDaySupplyRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        /// Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(BnftPlanPharmTypeDaySupl itemToUpdate)
        {
            _db.BnftPlanPharmTypeDaySupl.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.BnftPlanPharmTypeDaySuplSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

