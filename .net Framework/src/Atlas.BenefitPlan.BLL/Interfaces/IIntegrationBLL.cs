using Atlas.BenefitPlan.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Integration BLL for Benefit Plan
    /// </summary>
    public interface IIntegrationBLL
    {
        /// <summary>
        /// Execute Benefit Plan to Merlin 
        /// </summary>
        /// <param name="benefitPlanToExport">the Benefits to Export</param>
        bool ExportBenefit(BenefitIntegration benefitToExport);

        /// <summary>
        /// Execute Benefit Plan to Merlin 
        /// </summary>
        /// <param name="benefitPlanToExport">the Benefit Plan to Export</param>
        bool ExportBenefitPlan(BenefitPlanIntegration benefitPlanToExport);
    }
}
