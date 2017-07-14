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
	/// the Group Repository for Benefit Plan
	/// </summary>
	public class GroupRepository : EFRepositoryBase<Grp, BenefitPlanEntities>, IGroupRepository
	{
		/// <summary>
		/// the Constructor for Group Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public GroupRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(Grp itemToUpdate)
        {
             _db.Grp.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.GrpSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

