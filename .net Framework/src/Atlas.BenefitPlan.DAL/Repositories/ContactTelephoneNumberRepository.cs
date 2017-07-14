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
	/// the ContactTelephoneNumber Repository for Benefit Plan
	/// </summary>
	public class ContactTelephoneNumberRepository : EFRepositoryBase<CntctTelNbr, BenefitPlanEntities>, IContactTelephoneNumberRepository
	{
		/// <summary>
		/// the Constructor for ContactTelephoneNumber Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ContactTelephoneNumberRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(CntctTelNbr itemToUpdate)
        {
            _db.CntctTelNbr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CntctTelNbrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

