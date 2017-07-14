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
	/// the AllowedPrescribersDetail Repository for Benefit Plan
	/// </summary>
	public class AllowedPrescribersDetailRepository : EFRepositoryBase<AlwdPrescribersDtl, BenefitPlanEntities>, IAllowedPrescribersDetailRepository
	{
		/// <summary>
		/// the Constructor for AllowedPrescribersDetail Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public AllowedPrescribersDetailRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        /// Overrides Add or Update method for Allowed Prescribers Detail
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(AlwdPrescribersDtl itemToUpdate)
        {
            _db.AlwdPrescribersDtl.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.AlwdPrescribersDtlSK== 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

