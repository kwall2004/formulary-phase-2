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
    /// the Tenant Family Repository for Benefit Plan
    /// </summary>
    public class TenantFamilyRepository : EFRepositoryBase<TenantFam, BenefitPlanEntities>, ITenantFamilyRepository
    {
        /// <summary>
        /// the Constructor for Tenant Family Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public TenantFamilyRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(TenantFam itemToUpdate)
        {
            _db.TenantFam.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.TenantFamSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}
