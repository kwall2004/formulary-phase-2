﻿using Atlas.BenefitPlan.DAL.Models;
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
    /// the Tenant Repository for Benefit Plan
    /// </summary>
    public class TenantRepository : EFRepositoryBase<Tenant, BenefitPlanEntities>, ITenantRepository
    {
        /// <summary>
        /// the Constructor for Tenant Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public TenantRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(Tenant itemToUpdate)
        {
             _db.Tenant.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.TenantSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}
