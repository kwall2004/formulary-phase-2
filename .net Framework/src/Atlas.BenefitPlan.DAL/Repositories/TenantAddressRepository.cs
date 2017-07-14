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
	/// the TenantAddress Repository for Benefit Plan
	/// </summary>
	public class TenantAddressRepository : EFRepositoryBase<TenantAddr, BenefitPlanEntities>, ITenantAddressRepository
	{
		/// <summary>
		/// the Constructor for TenantAddress Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public TenantAddressRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Tenant Address to Add or Update</param>
        public override void AddOrUpdate(TenantAddr itemToUpdate)
        {
            _db.TenantAddr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.TenantAddrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

