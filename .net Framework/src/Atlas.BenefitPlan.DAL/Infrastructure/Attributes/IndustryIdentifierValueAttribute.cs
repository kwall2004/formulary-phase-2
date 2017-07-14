using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Atlas.BenefitPlan.DAL.Infrastructure.Attributes
{
    /// <summary>
    /// Class IndustryIdentifierValueAttribute. This class cannot be inherited.
    /// </summary>
    /// <seealso cref="System.ComponentModel.DataAnnotations.ValidationAttribute" />
    public sealed class IndustryIdentifierValueAttribute : ValidationAttribute
    {
        /// <summary>
        /// The value to compare
        /// </summary>
        private string _valueToCompare;
        /// <summary>
        /// The error message
        /// </summary>
        private const string _errorMessage = "The field {0} must be numeric with a maximum length of 6.";
        /// <summary>
        /// The industry identifier reg ex
        /// </summary>
        private const string _industryIdentifierRegEx = @"(^\d{6}$)";

        /// <summary>
        /// Initializes a new instance of the <see cref="IndustryIdentifierValueAttribute"/> class.
        /// </summary>
        /// <param name="valueToCompare">The value to compare.</param>
        public IndustryIdentifierValueAttribute(string valueToCompare)
            : base(_errorMessage)
        {
            _valueToCompare = valueToCompare;
        }

        /// <summary>
        /// Applies formatting to an error message, based on the data field where the error occurred.
        /// </summary>
        /// <param name="name">The name to include in the formatted message.</param>
        /// <returns>An instance of the formatted error message.</returns>
        public override string FormatErrorMessage(string name)
        {
            return string.Format(_errorMessage, name, _valueToCompare);
        }

        /// <summary>
        /// Validates the specified value with respect to the current validation attribute.
        /// </summary>
        /// <param name="value">The value to validate.</param>
        /// <param name="validationContext">The context information about the validation operation.</param>
        /// <returns>An instance of the <see cref="T:System.ComponentModel.DataAnnotations.ValidationResult" /> class.</returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var valueToCompare = validationContext.ObjectType.GetProperty(_valueToCompare);
            var valueToCompareValue = valueToCompare.GetValue(validationContext.ObjectInstance, null);

            if (valueToCompareValue.ToString() == Enum.GetName(typeof(TenantIndustryIdentifier), TenantIndustryIdentifier.BIN))
            {
                if (!Regex.Match((string)value, _industryIdentifierRegEx).Success)
                {
                    return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
                }
                return null;
            }
            return null;
        }
    }
}