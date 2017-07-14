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
	/// the PopulationGroupAddress Repository for Benefit Plan
	/// </summary>
	public class PopulationGroupAddressRepository : EFRepositoryBase<PopGrpAddr, BenefitPlanEntities>, IPopulationGroupAddressRepository
	{
		/// <summary>
		/// the Constructor for PopulationGroupAddress Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PopulationGroupAddressRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Population Group Address to Add or Update</param>
        public override void AddOrUpdate(PopGrpAddr itemToUpdate)
        {
            _db.PopGrpAddr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PopGrpAddrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

