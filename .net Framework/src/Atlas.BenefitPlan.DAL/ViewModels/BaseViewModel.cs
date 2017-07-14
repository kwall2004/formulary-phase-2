using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// Base View Model
    /// </summary>
    public class BaseViewModel
    {
        /// <summary>
        /// The Current User
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(50)]
        public string CurrentUser { get; set; }
    }
}