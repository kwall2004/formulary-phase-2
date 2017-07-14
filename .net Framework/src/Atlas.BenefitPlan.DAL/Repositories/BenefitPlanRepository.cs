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
    /// the BenefitPlan Repository for Benefit Plan
    /// </summary>
    public class BenefitPlanRepository : EFRepositoryBase<BnftPlan, BenefitPlanEntities>, IBenefitPlanRepository
    {
        /// <summary>
        /// the Constructor for BenefitPlan Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public BenefitPlanRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the BenefitPlan to Add or Update</param>
        public override void AddOrUpdate(BnftPlan itemToUpdate)
        {
            _db.BnftPlan.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.BnftPlanSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

