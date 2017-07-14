using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Repositories.Interfaces
{
	/// <summary>
	/// the interface for the PopulationGroupPlanBenefitPlanStatusCurrent Repository in Benefit Plan
	/// </summary>
	public interface IPopulationGroupPlanBenefitPlanStatusCurrentRepository : IRepository<vwCurrentPopGrpPBPStat>
	{
        /// <summary>
        /// Get the current status for a Population Group Plan Benefit Package
        /// </summary>
        /// <param name="popGrpPBPSK">Population Group Plan Benefit Package Key</param>
        /// <returns>the Current Status</returns>
        string GetCurrentStatus(long popGrpPBPSK);

        /// <summary>
        /// Check to see if there is an Approved Pop Group PBP for a specific Plan Benefit Package
        /// </summary>
        /// <param name="PBPSK">Plan Benefit Package Key</param>
        /// <returns>the Current Status</returns>
        bool hasApprovedPopGrpPBP(long PBPSK);

        /// <summary>
        /// Check to see if there is a Status in PopGroup PBP that is not in Draft or Rejected
        /// </summary>
        /// <param name="PBPSK">Plan Benefit Package Key</param>
        /// <returns>is the PBP locked</returns>
        bool isPBPLocked(long PBPSK);
    }
}

