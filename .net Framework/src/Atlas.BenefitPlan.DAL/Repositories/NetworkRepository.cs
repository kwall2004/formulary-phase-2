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
	/// the Network Repository for Benefit Plan
	/// </summary>
	public class NetworkRepository : EFRepositoryBase<Ntwrk, BenefitPlanEntities>, INetworkRepository
	{
		/// <summary>
		/// the Constructor for Network Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public NetworkRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>S
        /// <param name="itemToUpdate">the Ntwrk to Add or Update</param>
        public override void AddOrUpdate(Ntwrk itemToUpdate)
        {
            _db.Ntwrk.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.NtwrkSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

