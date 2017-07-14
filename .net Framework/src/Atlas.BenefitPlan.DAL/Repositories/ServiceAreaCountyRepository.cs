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
	/// the ServiceAreaCounty Repository for Benefit Plan
	/// </summary>
	public class ServiceAreaCountyRepository : EFRepositoryBase<SvcAreaCntyCode, BenefitPlanEntities>, IServiceAreaCountyRepository
	{
		/// <summary>
		/// the Constructor for ServiceAreaCounty Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ServiceAreaCountyRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the SvcAreaCntyCode to Add or Update</param>
        public override void AddOrUpdate(SvcAreaCntyCode itemToUpdate)
        {
            _db.SvcAreaCntyCode.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.SvcAreaCntyCodeSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

