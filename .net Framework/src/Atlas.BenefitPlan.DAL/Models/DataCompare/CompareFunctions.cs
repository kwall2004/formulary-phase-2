namespace Atlas.BenefitPlan.DAL.Models.DataCompare
{
    /// <summary>
    /// Static Compare Class
    /// </summary>
    public static class CompareFunctions
    {
        /// <summary>
        /// Populate the Data Compare Result
        /// </summary>
        /// <param name="atlasRecordId">the Atlas Record ID</param>
        /// <param name="className">the Class Name</param>
        /// <param name="fieldName">the Field or Node Name</param>
        /// <param name="message">the Results Message</param>
        /// <param name="atlasValue">the Atlas Value</param>
        /// <param name="systemValue">the System Value to Compare too</param>
        /// <returns>Populate DataCompareResults record</returns>
        public static CompareResults PopulateErrorMessage(string atlasRecordId = null, string className = null, string fieldName = null, string message = null, string atlasValue = null, string systemValue = null)
        {
            return new CompareResults()
            {
                AtlasRecordId = atlasRecordId,
                ClassName = className,
                FieldName = fieldName,
                Message = message,
                AtlasValue = atlasValue,
                SystemValue = systemValue
            };
        }
    }
}
