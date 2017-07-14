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
	/// the NetworkNetworkTier Repository for Benefit Plan
	/// </summary>
	public class NetworkNetworkTierRepository : EFRepositoryBase<NtwrkNtwrkTier, BenefitPlanEntities>, INetworkNetworkTierRepository
	{
		/// <summary>
		/// the Constructor for NetworkNetworkTier Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public NetworkNetworkTierRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>S
        /// <param name="itemToUpdate">the NtwrkNtwrkTier to Add or Update</param>
        public override void AddOrUpdate(NtwrkNtwrkTier itemToUpdate)
        {
            _db.NtwrkNtwrkTier.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.NtwrkNtwrkTierSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

