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
	/// the AccountAddress Repository for Benefit Plan
	/// </summary>
	public class AccountAddressRepository : EFRepositoryBase<AcctAddr, BenefitPlanEntities>, IAccountAddressRepository
	{
		/// <summary>
		/// the Constructor for AccountAddress Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public AccountAddressRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Account Address to Add or Update</param>
        public override void AddOrUpdate(AcctAddr itemToUpdate)
        {
            _db.AcctAddr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.AcctAddrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

