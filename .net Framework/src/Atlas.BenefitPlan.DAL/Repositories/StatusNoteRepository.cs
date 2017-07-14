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
	/// the StatusNote Repository for Benefit Plan
	/// </summary>
	public class StatusNoteRepository : EFRepositoryBase<StatNote, BenefitPlanEntities>, IStatusNoteRepository
	{
		/// <summary>
		/// the Constructor for StatusNote Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public StatusNoteRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToInsert"></param>
        public override void AddOrUpdate(StatNote itemToInsert)
        {
            _db.StatNote.Attach(itemToInsert);
            _db.Entry(itemToInsert).State = itemToInsert.StatNoteSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

