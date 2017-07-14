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
	/// the AccountPCN Repository for Benefit Plan
	/// </summary>
	public class AccountPCNRepository : EFRepositoryBase<AcctPCN, BenefitPlanEntities>, IAccountPCNRepository
	{
		/// <summary>
		/// the Constructor for AccountPCN Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public AccountPCNRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the AccountPCN to Add or Update</param>
        public override void AddOrUpdate(AcctPCN itemToUpdate)
        {
            _db.AcctPCN.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.AcctPCNSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

