using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Atlas.BenefitPlan.DAL.Infrastructure.Attributes
{
    /// <summary>
    /// Class PostalCodeAttribute. This class cannot be inherited.
    /// </summary>
    /// <seealso cref="System.ComponentModel.DataAnnotations.ValidationAttribute" />
    public sealed class PostalCodeAttribute : ValidationAttribute
    {
        /// <summary>
        /// The error message
        /// </summary>
        private const string _errorMessage = "That {0} is not a valid US or Canadian postal code.";
        /// <summary>
        /// The postal code reg ex
        /// </summary>
        private const string _postalCodeRegEx = @"(^\d{5}(-\d{4})?$)|(^([ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]\d[ABCEGHJKLMNPRSTVW‌​XYZabceghjklmnprstvx‌​y])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvxy]\d)$)";

        /// <summary>
        /// Initializes a new instance of the <see cref="PostalCodeAttribute"/> class.
        /// </summary>
        public PostalCodeAttribute()
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
            if (!Regex.Match((string)(value ?? string.Empty), _postalCodeRegEx).Success)
            {
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
            }
            return null;
        }
    }
}