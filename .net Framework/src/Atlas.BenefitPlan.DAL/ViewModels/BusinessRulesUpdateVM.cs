using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Business Rules Update View Model
    /// </summary>
    public class BusinessRulesUpdateVM : BaseViewModel
    {
        /// <summary>
        /// the Sk for the Question - configPrptyType table
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "ConfgPrptyTypeSK field is required.")]
        public long ConfgPrptyTypeSK { get; set; }

        /// <summary>
        /// the Parent Sk for the Question - configPrptyType table
        /// </summary>
        public long? ConfgPrptyTypeChildSK { get; set; }

        /// <summary>
        /// the Sk for the PBP config prop intersection
        /// </summary>
        public long PBPConfgPrptySK { get; set; }

        /// <summary>
        /// the Sk for the PBP
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "PBPSK field is required.")]
        public long PBPSK { get; set; }

        /// <summary>
        /// configPrptyVal  - matches the code???
        /// </summary>
        public string CurrentAnswer { get; set; }

        /// <summary>
        /// ConfgPrptyChildVal  - matches the code???
        /// </summary>
        public string ChildCurrentAnswer { get; set; }

        /// <summary>
        /// ConfgPrptyChildVal  - matches the code???
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}
