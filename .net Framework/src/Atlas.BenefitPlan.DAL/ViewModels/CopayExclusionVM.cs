using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Copay Exclusion VM
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.DAL.ViewModels.BaseViewModel" />
    public class CopayExclusionVM : BaseViewModel
    {
        /// <summary>
        /// Gets or sets the copay ovrrd sk.
        /// </summary>
        /// <value>The copay ovrrd sk.</value>
        public long CopayOvrrdSK { get; set; }

        /// <summary>
        /// Gets or sets the BNFT plan sk.
        /// </summary>
        /// <value>The BNFT plan sk.</value>
        public long? BnftPlanSK { get; set; }

        /// <summary>
        /// Gets or sets the copay coinsurance logic type sk.
        /// </summary>
        /// <value>The copay coinsurance logic type sk.</value>
        public long CopayCoinsuranceLogicTypeSK { get; set; }

        /// <summary>
        /// Gets or sets the copay ovrrd qulfr type sk.
        /// </summary>
        /// <value>The copay ovrrd qulfr type sk.</value>
        public long CopayOvrrdQulfrTypeSK { get; set; }

        /// <summary>
        /// Gets or sets the copay ovrrd value.
        /// </summary>
        /// <value>The copay ovrrd value.</value>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Value is required")]
        [MaxLength(80)]
        public string CopayOvrrdVal { get; set; }

        /// <summary>
        /// Gets or sets the copay amt.
        /// </summary>
        /// <value>The copay amt.</value>
        [Required(AllowEmptyStrings = true)]
        [RegularExpression(@"(?!^0*$)(?!^0*\.0*$)^\d{1,8}(\.\d{1,2})?$")]
        public decimal? CopayAmt { get; set; }

        /// <summary>
        /// Gets or sets the coinsurance PCT.
        /// </summary>
        /// <value>The coinsurance PCT.</value>
        [Required(AllowEmptyStrings = true)]
        [RegularExpression(@"(?!^0*$)(?!^0*\.0*$)^\d{1,3}(\.\d{1,2})?$")]
        public decimal? CoinsurancePct { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is deleted.
        /// </summary>
        /// <value><c>true</c> if this instance is deleted; otherwise, <c>false</c>.</value>
        public bool isDeleted { get; set; }
    }
}