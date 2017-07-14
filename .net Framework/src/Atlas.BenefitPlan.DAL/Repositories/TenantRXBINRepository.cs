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
	/// the TenantRXBIN Repository for Benefit Plan
	/// </summary>
	public class TenantRXBINRepository : EFRepositoryBase<TenantRXBIN, BenefitPlanEntities>, ITenantRXBINRepository
	{
		/// <summary>
		/// the Constructor for TenantRXBIN Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public TenantRXBINRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the TenantRXBIN to Add or Update</param>
        public override void AddOrUpdate(TenantRXBIN itemToUpdate)
        {
            _db.TenantRXBIN.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.TenantRXBINSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

