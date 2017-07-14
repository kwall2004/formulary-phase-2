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
    /// the Network Tier Repository for Benefit Plan
    /// </summary>
    public class NetworkTierRepository : EFRepositoryBase<NtwrkTier, BenefitPlanEntities>, INetworkTierRepository
	{
        /// <summary>
        /// the Constructor for Network Tier Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public NetworkTierRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>S
        /// <param name="itemToUpdate">the NtwrkTier to Add or Update</param>
        public override void AddOrUpdate(NtwrkTier itemToUpdate)
        {
            _db.NtwrkTier.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.NtwrkTierSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

