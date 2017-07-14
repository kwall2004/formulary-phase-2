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
	/// the ContactPopulationGroup Repository for Benefit Plan
	/// </summary>
	public class ContactPopulationGroupRepository : EFRepositoryBase<CntctPopGrp, BenefitPlanEntities>, IContactPopulationGroupRepository
	{
		/// <summary>
		/// the Constructor for ContactPopulationGroup Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ContactPopulationGroupRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
        public override void AddOrUpdate(CntctPopGrp itemToUpdate)
        {
            _db.CntctPopGrp.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CntctPopGrpSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

