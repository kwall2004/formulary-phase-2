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
	/// the TenantPayerId Repository for Benefit Plan
	/// </summary>
	public class TenantPayerIdRepository : EFRepositoryBase<TenantPayerID, BenefitPlanEntities>, ITenantPayerIdRepository
	{
		/// <summary>
		/// the Constructor for TenantPayerId Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public TenantPayerIdRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the TenantPayerID to Add or Update</param>
        public override void AddOrUpdate(TenantPayerID itemToUpdate)
        {
            _db.TenantPayerID.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.TenantPayerIDSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

