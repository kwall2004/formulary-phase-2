using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.Infrastructure.Attributes
{
    /// <summary>
    /// Class RequiredIfAttribute.
    /// </summary>
    /// <seealso cref="System.ComponentModel.DataAnnotations.ValidationAttribute" />
    public class RequiredIfAttribute : ValidationAttribute
    {
        /// <summary>
        /// The inner attribute
        /// </summary>
        private RequiredAttribute innerAttribute = new RequiredAttribute();

        /// <summary>
        /// Gets or sets the dependent property.
        /// </summary>
        /// <value>The dependent property.</value>
        public string[] DependentProperty { get; set; }
        /// <summary>
        /// Gets or sets the error MSG.
        /// </summary>
        /// <value>The error MSG.</value>
        public string ErrorMsg { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="RequiredIfAttribute"/> class.
        /// </summary>
        /// <param name="dependentProperty">The dependent property.</param>
        /// <param name="errorMessage">The error message.</param>
        public RequiredIfAttribute(string[] dependentProperty, string errorMessage)
        {
            this.DependentProperty = dependentProperty;
            this.ErrorMsg = errorMessage;
        }

        /// <summary>
        /// Validates the specified value with respect to the current validation attribute.
        /// </summary>
        /// <param name="value">The value to validate.</param>
        /// <param name="validationContext">The context information about the validation operation.</param>
        /// <returns>An instance of the <see cref="T:System.ComponentModel.DataAnnotations.ValidationResult" /> class.</returns>
        protected override ValidationResult IsValid(Object value, ValidationContext validationContext)
        {
            Object instance = validationContext.ObjectInstance;
            Type type = instance.GetType();
            if (value == null || value.ToString() == String.Empty)
            {
                foreach (string propertyName in DependentProperty)
                {
                    if (!string.IsNullOrEmpty(propertyName))
                    {
                        Object propertyValue = type.GetProperty(propertyName).GetValue(instance, null);
                        if (string.IsNullOrEmpty(propertyValue.ToString()))
                        {
                            return new ValidationResult(ErrorMsg);
                        }
                    }
                }
            }
            return ValidationResult.Success;
        }
    }
}