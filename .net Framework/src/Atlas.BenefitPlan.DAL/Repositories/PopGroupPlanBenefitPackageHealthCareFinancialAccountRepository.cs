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
    /// the PopGroupPlanBenefitPackageHealthCareFinancialAccount Repository for Benefit Plan
    /// </summary>
    public class PopGroupPlanBenefitPackageHealthCareFinancialAccountRepository : EFRepositoryBase<PopGrpPBPHealthcareFinclAcct, BenefitPlanEntities>, IPopGroupPlanBenefitPackageHealthCareFinancialAccountRepository
    {
        /// <summary>
        /// the Constructor for PlanBenefitPackageHealthCareFinancialAccount Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public PopGroupPlanBenefitPackageHealthCareFinancialAccountRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Population Group PBP Healthcare Fincl Acct to Add or Update</param>
        public override void AddOrUpdate(PopGrpPBPHealthcareFinclAcct itemToUpdate)
        {
            _db.PopGrpPBPHealthcareFinclAcct.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PopGrpPBPHealthcareFinclAcctSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

