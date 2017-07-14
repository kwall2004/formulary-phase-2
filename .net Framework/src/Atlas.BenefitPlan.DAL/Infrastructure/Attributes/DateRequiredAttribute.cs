using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.Infrastructure.Attributes
{
    /// <summary>
    /// Class DateRequiredAttribute. This class cannot be inherited.
    /// </summary>
    /// <seealso cref="System.ComponentModel.DataAnnotations.ValidationAttribute" />
    public sealed class DateRequiredAttribute : ValidationAttribute
    {
        /// <summary>
        /// The error message
        /// </summary>
        private const string _errorMessage = "The {0} field is required.";

        /// <summary>
        /// Initializes a new instance of the <see cref="DateRequiredAttribute"/> class.
        /// </summary>
        public DateRequiredAttribute()
            : base(_errorMessage)
        {
        }

        /// <summary>
        /// Applies formatting to an error message, based on the data field where the error occurred.
        /// </summary>
        /// <param name="name">The name to include in the formatted message.</param>
        /// <returns>An instance of the formatted error message.</returns>
        public override string FormatErrorMessage(string name)
        {
            return string.Format(_errorMessage, name);
        }

        /// <summary>
        /// Validates the specified value with respect to the current validation attribute.
        /// </summary>
        /// <param name="value">The value to validate.</param>
        /// <param name="validationContext">The context information about the validation operation.</param>
        /// <returns>An instance of the <see cref="T:System.ComponentModel.DataAnnotations.ValidationResult" /> class.</returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if ((DateTime)value == DateTime.MinValue)
            {
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
            }
            return null;
        }
    }
}