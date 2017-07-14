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
	/// the PCN Repository for Benefit Plan
	/// </summary>
	public class PCNRepository : EFRepositoryBase<PCN, BenefitPlanEntities>, IPCNRepository
	{
		/// <summary>
		/// the Constructor for PCN Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PCNRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the PCN to Add or Update</param>
        public override void AddOrUpdate(PCN itemToUpdate)
        {
            _db.PCN.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PCNSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

