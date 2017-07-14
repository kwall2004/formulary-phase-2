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
	/// the ContactGroup Repository for Benefit Plan
	/// </summary>
	public class ContactGroupRepository : EFRepositoryBase<CntctGrp, BenefitPlanEntities>, IContactGroupRepository
	{
		/// <summary>
		/// the Constructor for ContactGroup Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ContactGroupRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
        public override void AddOrUpdate(CntctGrp itemToUpdate)
        {
            _db.CntctGrp.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CntctGrpSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

