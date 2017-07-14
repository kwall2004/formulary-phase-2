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
	/// the ContactAccount Repository for Benefit Plan
	/// </summary>
	public class ContactAccountRepository : EFRepositoryBase<CntctAcct, BenefitPlanEntities>, IContactAccountRepository
	{
		/// <summary>
		/// the Constructor for ContactAccount Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ContactAccountRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        public override void AddOrUpdate(CntctAcct itemToUpdate)
        {
            _db.CntctAcct.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CntctAcctSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

