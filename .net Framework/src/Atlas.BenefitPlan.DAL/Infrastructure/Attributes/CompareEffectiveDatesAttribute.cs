using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.Infrastructure.Attributes
{
    /// <summary>
    /// Class CompareEffectiveDatesAttribute. This class cannot be inherited.
    /// </summary>
    /// <seealso cref="System.ComponentModel.DataAnnotations.ValidationAttribute" />
    public sealed class CompareEffectiveDatesAttribute : ValidationAttribute
    {
        /// <summary>
        /// The date to compare
        /// </summary>
        private string _dateToCompare;

        /// <summary>
        /// The error message
        /// </summary>
        private const string _errorMessage = "{0} must be greater than {1}";

        /// <summary>
        /// Initializes a new instance of the <see cref="CompareEffectiveDatesAttribute"/> class.
        /// </summary>
        /// <param name="dateToCompare">The date to compare.</param>
        public CompareEffectiveDatesAttribute(string dateToCompare)
            : base(_errorMessage)
        {
            _dateToCompare = dateToCompare;
        }

        /// <summary>
        /// Applies formatting to an error message, based on the data field where the error occurred.
        /// </summary>
        /// <param name="name">The name to include in the formatted message.</param>
        /// <returns>An instance of the formatted error message.</returns>
        public override string FormatErrorMessage(string name)
        {
            return string.Format(_errorMessage, name, _dateToCompare);
        }

        /// <summary>
        /// Validates the specified value with respect to the current validation attribute.
        /// </summary>
        /// <param name="value">The value to validate.</param>
        /// <param name="validationContext">The context information about the validation operation.</param>
        /// <returns>An instance of the <see cref="T:System.ComponentModel.DataAnnotations.ValidationResult" /> class.</returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var dateToCompare = validationContext.ObjectType.GetProperty(_dateToCompare);
            var dateToCompareValue = dateToCompare.GetValue(validationContext.ObjectInstance, null);
            if (dateToCompareValue != null && value != null && (DateTime)value < (DateTime)dateToCompareValue)
            {
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
            }
            return null;
        }
    }
}