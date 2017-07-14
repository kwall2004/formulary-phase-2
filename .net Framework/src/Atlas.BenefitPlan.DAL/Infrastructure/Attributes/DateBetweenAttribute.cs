using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.Infrastructure.Attributes
{
    /// <summary>
    /// Class DateBetweenAttribute. This class cannot be inherited.
    /// </summary>
    /// <seealso cref="System.ComponentModel.DataAnnotations.ValidationAttribute" />
    public sealed class DateBetweenAttribute : ValidationAttribute
    {
        /// <summary>
        /// The dates to compare
        /// </summary>
        private string _datesToCompare;
        /// <summary>
        /// The error message
        /// </summary>
        private const string _errorMessage = "{0} must be between {1:d} and {2:d}.";

        /// <summary>
        /// Initializes a new instance of the <see cref="DateBetweenAttribute"/> class.
        /// </summary>
        /// <param name="datesToCompare">The dates to compare.</param>
        public DateBetweenAttribute(string datesToCompare)
            : base(_errorMessage)
        {
            _datesToCompare = datesToCompare;
        }

        /// <summary>
        /// Formats the error message.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="dateFrom">The date from.</param>
        /// <param name="dateTo">The date to.</param>
        /// <returns>System.String.</returns>
        public string FormatErrorMessage(string name, DateTime dateFrom, DateTime dateTo)
        {
            return string.Format(_errorMessage, name, dateFrom, dateTo);
        }

        /// <summary>
        /// Validates the specified value with respect to the current validation attribute.
        /// </summary>
        /// <param name="value">The value to validate.</param>
        /// <param name="validationContext">The context information about the validation operation.</param>
        /// <returns>An instance of the <see cref="T:System.ComponentModel.DataAnnotations.ValidationResult" /> class.</returns>
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string[] dates = _datesToCompare.Split(',');
            var dateToCompareFrom = validationContext.ObjectType.GetProperty(dates[0]);
            var dateToCompareTo = validationContext.ObjectType.GetProperty(dates[1]);
            var dateFrom = dateToCompareFrom.GetValue(validationContext.ObjectInstance, null);
            var dateTo = dateToCompareTo.GetValue(validationContext.ObjectInstance, null);

            if (!((DateTime)dateFrom <= (DateTime)value && (DateTime)value <= (DateTime)dateTo))
            {
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName, (DateTime)dateFrom, (DateTime)dateTo));
            }
            return null;
        }
    }
}