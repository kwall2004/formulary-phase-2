using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Dispense As Written Copay View Model
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.DAL.ViewModels.BaseViewModel" />
    public class DispenseAsWrittenCopayVM : BaseViewModel
    {
        /// <summary>
        /// Gets or sets the daw copay sk.
        /// </summary>
        /// <value>The daw copay sk.</value>
        public long DAWCopaySK { get; set; }

        /// <summary>
        /// Gets or sets the daw type sk.
        /// </summary>
        /// <value>The daw type sk.</value>
        public long DAWTypeSK { get; set; }

        /// <summary>
        /// Gets or sets the BNFT plan sk.
        /// </summary>
        /// <value>The BNFT plan sk.</value>
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [brand genrc difference ind].
        /// </summary>
        /// <value><c>true</c> if [brand genrc difference ind]; otherwise, <c>false</c>.</value>
        public bool BrandGenrcDifferenceInd { get; set; }

        /// <summary>
        /// Gets or sets the pctof drug cost.
        /// </summary>
        /// <value>The pctof drug cost.</value>
        [RegularExpression(@"(?!^0*$)(?!^0*\.0*$)^\d{1,3}(\.\d{1,2})?$", ErrorMessage = "Percentage of Drug Cost must be a positive percentage.")]
        public decimal? PctofDrugCost { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [apply copay ind].
        /// </summary>
        /// <value><c>true</c> if [apply copay ind]; otherwise, <c>false</c>.</value>
        public bool ApplyCopayInd { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [apply differenceto oop ind].
        /// </summary>
        /// <value><c>true</c> if [apply differenceto oop ind]; otherwise, <c>false</c>.</value>
        public bool ApplyDifferencetoOOPInd { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance is deleted.
        /// </summary>
        /// <value><c>true</c> if this instance is deleted; otherwise, <c>false</c>.</value>
        public bool isDeleted { get; set; }
    }
}