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
	/// the PopulationGroupPlanBenefitPlanStatusCurrent Repository for Benefit Plan
	/// </summary>
	public class PopulationGroupPlanBenefitPlanStatusCurrentRepository : EFRepositoryBase<vwCurrentPopGrpPBPStat, BenefitPlanEntities>, IPopulationGroupPlanBenefitPlanStatusCurrentRepository
	{
		/// <summary>
		/// the Constructor for PopulationGroupPlanBenefitPlanStatusCurrent Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PopulationGroupPlanBenefitPlanStatusCurrentRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        /// Get the current status for a Population Group Plan Benefit Package
        /// </summary>
        /// <param name="popGrpPBPSK">Population Group Plan Benefit Package Key</param>
        /// <returns>the Current Status</returns>
        public string GetCurrentStatus(long popGrpPBPSK)
        {
            return (FindOne(w => w.PopGrpPBPSK == popGrpPBPSK) ?? new vwCurrentPopGrpPBPStat()).StatDesc;
        }

        /// <summary>
        /// Check to see if there is an Approved Pop Group PBP for a specific Plan Benefit Package
        /// </summary>
        /// <param name="PBPSK">Plan Benefit Package Key</param>
        /// <returns>the Current Status</returns>
        public bool hasApprovedPopGrpPBP(long PBPSK)
        {
            return FindAll(w => w.PBPSK == PBPSK && (w.StatDesc == "Approved")).Any();
        }

        /// <summary>
        /// Check to see if there is a Status in PopGroup PBP that is not in Draft or Rejected
        /// </summary>
        /// <param name="PBPSK">Plan Benefit Package Key</param>
        /// <returns>is the PBP locked</returns>
        public bool isPBPLocked(long PBPSK)
        {
            return FindAll(w => w.PBPSK == PBPSK && !(w.StatDesc == "Draft" || w.StatDesc == "Rejected")).Any();
        }

    }
}

