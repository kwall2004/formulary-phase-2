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
    /// the AccountRXBIN Repository for Benefit Plan
    /// </summary>
    public class AccountPayerIdRepository : EFRepositoryBase<AcctPayerID, BenefitPlanEntities>, IAccountPayerIdRepository
    {
        /// <summary>
        /// the Constructor for AccountPayerId Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public AccountPayerIdRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the AccountPayerId to Add or Update</param>
        public override void AddOrUpdate(AcctPayerID itemToUpdate)
        {
            _db.AcctPayerID.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.AcctPayerIDSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}
