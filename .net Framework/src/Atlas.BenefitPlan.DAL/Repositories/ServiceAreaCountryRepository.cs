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
	/// the ServiceAreaCountry Repository for Benefit Plan
	/// </summary>
	public class ServiceAreaCountryRepository : EFRepositoryBase<SvcAreaCntryCode, BenefitPlanEntities>, IServiceAreaCountryRepository
	{
		/// <summary>
		/// the Constructor for ServiceAreaCountry Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ServiceAreaCountryRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the SvcAreaCntryCode to Add or Update</param>
        public override void AddOrUpdate(SvcAreaCntryCode itemToUpdate)
        {
            _db.SvcAreaCntryCode.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.SvcAreaCntryCodeSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

