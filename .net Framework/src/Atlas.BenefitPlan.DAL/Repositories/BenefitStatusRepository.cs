using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the BenefitStatus Repository for Benefit Plan
    /// </summary>
    public class BenefitStatusRepository : EFRepositoryBase<BnftStat, BenefitPlanEntities>, IBenefitStatusRepository
    {
        /// <summary>
        /// the Constructor for BenefitStatus Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public BenefitStatusRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Benefit Status to Add or Update</param>
        public override void AddOrUpdate(BnftStat itemToUpdate)
        {
            _db.BnftStat.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.BnftStatSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
