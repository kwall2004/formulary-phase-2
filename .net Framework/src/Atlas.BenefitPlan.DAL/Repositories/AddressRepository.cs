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
	/// the Address Repository for Benefit Plan
	/// </summary>
	public class AddressRepository : EFRepositoryBase<Addr, BenefitPlanEntities>, IAddressRepository
	{
        /// <summary>
        /// the Constructor for Address Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public AddressRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Address to Add or Update</param>
        public override void AddOrUpdate(Addr itemToUpdate)
        {
            _db.Addr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.AddrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

