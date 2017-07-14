namespace Atlas.BenefitPlan.DAL.Models.DataCompare
{
    public class CompareResults
    {
        /// <summary>the Atlas Record ID</summary>
        public string AtlasRecordId { get; set; }

        /// <summary>the Class Name</summary>
        public string ClassName { get; set; }

        /// <summary>the Field or Node Name</summary>
        public string FieldName { get; set; }

        /// <summary>the Results Message</summary>
        public string Message { get; set; }

        /// <summary>the Atlas Value</summary>
        public string AtlasValue { get; set; }

        /// <summary>the Value from the System to compare</summary>
        public string SystemValue { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        public CompareResults()
        {

        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="atlasRecordId">the Atlas Record ID</param>
        /// <param name="className">the Class Name</param>
        /// <param name="fieldName">the Field or Node Name</param>
        /// <param name="message">the Results Message</param>
        /// <param name="atlasValue">the Atlas Value</param>
        /// <param name="systemValue">the System Value to Compare too</param>
        public CompareResults(string atlasRecordId = null, string className = null, string fieldName = null, string message = null, string atlasValue = null, string systemValue = null)
        {
            this.AtlasRecordId = atlasRecordId;
            this.ClassName = className;
            this.FieldName = fieldName;
            this.Message = message;
            this.AtlasValue = atlasValue;
            this.SystemValue = systemValue;
        }

        /// <summary>
        /// Override the ToString Method
        /// </summary>
        /// <returns>the String to Display</returns>
        public override string ToString()
        {
            return string.Format("{0}-{1}-{2}-{3}", this.ClassName, this.AtlasRecordId, this.FieldName, this.Message);
        }
    }
}