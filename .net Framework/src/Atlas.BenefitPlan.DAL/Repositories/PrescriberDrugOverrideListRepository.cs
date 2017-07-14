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
	/// the PrescriberDrugOverrideList Repository for Benefit Plan
	/// </summary>
	public class PrescriberDrugOverrideListRepository : EFRepositoryBase<PrescbrDrugOvrrdList, BenefitPlanEntities>, IPrescriberDrugOverrideListRepository
	{
		/// <summary>
		/// the Constructor for PrescriberDrugOverrideList Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PrescriberDrugOverrideListRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the PrescriberDrugOverrideList to Add or Update</param>
        public override void AddOrUpdate(PrescbrDrugOvrrdList itemToUpdate)
        {
            _db.PrescbrDrugOvrrdList.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PrescbrDrugOvrrdListSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

