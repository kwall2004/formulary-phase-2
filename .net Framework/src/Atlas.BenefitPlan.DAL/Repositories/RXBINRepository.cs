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
	/// the RXBIN Repository for Benefit Plan
	/// </summary>
	public class RXBINRepository : EFRepositoryBase<RXBIN, BenefitPlanEntities>, IRXBINRepository
	{
		/// <summary>
		/// the Constructor for RXBIN Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public RXBINRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the RXBIN to Add or Update</param>
        public override void AddOrUpdate(RXBIN itemToUpdate)
        {
            _db.RXBIN.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.RXBINSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

