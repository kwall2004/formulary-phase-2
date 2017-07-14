using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Copay Distribution LICS View Model
    /// </summary>
    public class CopayDistributionLICSVM : BaseViewModel
    {
        /// <summary>
        /// Id of the benefit Plan
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanSK field is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// The LICS 4 Deductible Amount
        /// </summary>
        public Nullable<decimal> LICS4DeducblAmt { get; set; }

        /// <summary>
        /// is LICS 4 Deductible Enabled
        /// </summary>
        public bool isEnabled { get; set; }
    }
}
