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
	/// the Deductible Repository for Benefit Plan
	/// </summary>
	public class DeductibleRepository : EFRepositoryBase<Deducbl, BenefitPlanEntities>, IDeductibleRepository
	{
		/// <summary>
		/// the Constructor for Deductible Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public DeductibleRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Deducbl to Add or Update</param>
        public override void AddOrUpdate(Deducbl itemToUpdate)
        {
            _db.Deducbl.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.DeducblSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

