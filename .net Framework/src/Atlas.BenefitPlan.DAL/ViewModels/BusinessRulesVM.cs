using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.BenefitPlan.DAL.Models;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Business Rule View Model
    /// </summary>
    public class BusinessRulesVM : BusinessRulesUpdateVM
    {
        /// <summary>
        /// the business rules question
        /// ConfgPrptyTypeDesc
        /// </summary>
        public string Question { get; set; }

        /// <summary>
        /// the possible answers for the question (we will store description and no code.
        /// </summary>
        public List<string> PossibleAnswers { get; set; }

        /// <summary>
        /// the business rules Child Question
        /// ConfgPrptyTypeDesc
        /// </summary>
        public string ChildQuestion { get; set; }

        /// <summary>
        /// the possible answers for the child question (we will store description and no code.
        /// </summary>
        public List<string> ChildPossibleAnswers { get; set; }

        /// <summary>
        /// the Parent Sk for the Question - configPrptyType table
        /// </summary>
        public long? ConfgPrptyTypeParentSK { get; set; }

        /// <summary>
        /// Check to see if this is a Child Business Rule
        /// </summary>
        public bool ChildBusinessRule
        {
            get
            {
                return ((ConfgPrptyTypeParentSK ?? 0) > 0);
            }
        }
    }
}
