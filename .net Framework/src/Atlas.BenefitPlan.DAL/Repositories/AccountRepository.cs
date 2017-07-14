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
    /// the Account Repository for Benefit Plan
    /// </summary>
    public class AccountRepository : EFRepositoryBase<Acct, BenefitPlanEntities>, IAccountRepository
    {
        /// <summary>
        /// the Constructor for Account Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public AccountRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(Acct itemToUpdate)
        {
             _db.Acct.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.AcctSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}
