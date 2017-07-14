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
	/// the GroupAddress Repository for Benefit Plan
	/// </summary>
	public class GroupAddressRepository : EFRepositoryBase<GrpAddr, BenefitPlanEntities>, IGroupAddressRepository
	{
		/// <summary>
		/// the Constructor for GroupAddress Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public GroupAddressRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Group Address to Add or Update</param>
        public override void AddOrUpdate(GrpAddr itemToUpdate)
        {
            _db.GrpAddr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.GrpAddrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

