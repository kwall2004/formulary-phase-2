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
	/// the ServiceAreaPostalCode Repository for Benefit Plan
	/// </summary>
	public class ServiceAreaPostalCodeRepository : EFRepositoryBase<SvcAreaPstlCode, BenefitPlanEntities>, IServiceAreaPostalCodeRepository
	{
		/// <summary>
		/// the Constructor for ServiceAreaPostalCode Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ServiceAreaPostalCodeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the SvcAreaPstlCode to Add or Update</param>
        public override void AddOrUpdate(SvcAreaPstlCode itemToUpdate)
        {
            _db.SvcAreaPstlCode.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.SvcAreaPstlCodeSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

