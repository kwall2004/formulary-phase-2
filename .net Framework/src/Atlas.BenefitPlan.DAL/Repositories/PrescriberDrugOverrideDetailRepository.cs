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
	/// the PrescriberDrugOverrideDetail Repository for Benefit Plan
	/// </summary>
	public class PrescriberDrugOverrideDetailRepository : EFRepositoryBase<PrescbrDrugOvrrdDtl, BenefitPlanEntities>, IPrescriberDrugOverrideDetailRepository
	{
		/// <summary>
		/// the Constructor for PrescriberDrugOverrideDetail Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PrescriberDrugOverrideDetailRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the PrescriberDrugOverrideDetail to Add or Update</param>
        public override void AddOrUpdate(PrescbrDrugOvrrdDtl itemToUpdate)
        {
            _db.PrescbrDrugOvrrdDtl.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PrescbrDrugOvrrdDtlSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

