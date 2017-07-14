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
	/// the TenantFamilyAddress Repository for Benefit Plan
	/// </summary>
	public class TenantFamilyAddressRepository : EFRepositoryBase<TenantFamAddr, BenefitPlanEntities>, ITenantFamilyAddressRepository
	{
		/// <summary>
		/// the Constructor for TenantFamilyAddress Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public TenantFamilyAddressRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Tenant Family Address to Add or Update</param>
        public override void AddOrUpdate(TenantFamAddr itemToUpdate)
        {
            _db.TenantFamAddr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.TenantFamAddrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

