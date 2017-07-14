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
	/// the PostalCode Repository for Benefit Plan
	/// </summary>
	public class PostalCodeRepository : EFRepositoryBase<PstlCode, BenefitPlanEntities>, IPostalCodeRepository
	{
		/// <summary>
		/// the Constructor for PostalCode Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PostalCodeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Postal Code to Add or Update</param>
        public override void AddOrUpdate(PstlCode itemToUpdate)
        {
            _db.PstlCode.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PstlCodeSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

