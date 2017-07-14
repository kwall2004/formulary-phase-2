using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Detail View Model
    /// </summary>
    public class BenefitDetailVM : BaseViewModel
    {
        /// <summary>
        /// the Benefit SK
        /// </summary>
        public long BnftSK { get; set; }

        /// <summary>
        /// The Benefit Name
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Benefit Name is required.")]
        [MaxLength(80)]
        public string BenefitName { get; set; }

        /// <summary>
        /// the Benefit Order
        /// </summary>
        [Required]
        public int BnftOrder { get; set; }

        /// <summary>
        /// the Benefit Code
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Benefit Code is required.")]
        [MaxLength(6)]
        public string BnftCode { get; set; }
        
        /// <summary>
        /// The Effective Start Date for the Account
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Account
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// The Date Time Offset for the last time the benefit was published to MCS.
        /// </summary>
        public System.DateTime? LastPblshTs { get; set; }

        /// <summary>
        /// The Date Time Offset for the last time the benefit was sent to testing.
        /// </summary>
        public System.DateTime? LastSubmtdForTestingTs { get; set; }

        /// <summary>
        /// The current status of the Benefit.
        /// </summary>
        public string StatDesc { get; set; }

        /// <summary>
        /// List of Service Types
        /// </summary>
        public List<ServiceTypeVM> ServiceTypes { get; set; }

        public BenefitDetailVM()
        {
            ServiceTypes = new List<ServiceTypeVM>();
        }
    }

}
