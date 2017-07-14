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
    /// the Criteria Operator Type Repository for Benefit Plan
    /// </summary>
    public class CriteriaOperatorTypeRepository : EFRepositoryBase<CrtriaOperType, BenefitPlanEntities>, ICriteriaOperatorTypeRepository
    {
        /// <summary>
        /// the Constructor for CrtriaOperType Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public CriteriaOperatorTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(CrtriaOperType itemToUpdate)
        {
            _db.CrtriaOperType.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CrtriaOperTypeSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
