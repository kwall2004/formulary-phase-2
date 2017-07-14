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
	/// the ServiceArea Repository for Benefit Plan
	/// </summary>
	public class ServiceAreaRepository : EFRepositoryBase<SvcArea, BenefitPlanEntities>, IServiceAreaRepository
	{
		/// <summary>
		/// the Constructor for ServiceArea Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ServiceAreaRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the SvcArea to Add or Update</param>
        public override void AddOrUpdate(SvcArea itemToUpdate)
        {
            _db.SvcArea.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.SvcAreaSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

