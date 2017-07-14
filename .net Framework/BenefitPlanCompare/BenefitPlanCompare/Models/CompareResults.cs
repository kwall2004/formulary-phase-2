using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace BenefitPlanCompare.Models
{
    public class CompareResults
    {
        public string AtlasRecordId { get; set; }
        public string ClassName { get; set; }
        public string FieldName { get; set; }
        public string Message { get; set; }
        public string AtlasValue { get; set; }
        public string SystemValue { get; set; }

        public CompareResults()
        {

        }

        public CompareResults(string atlasRecordId = null, string className = null, string fieldName = null, string message = null, string atlasValue = null, string systemValue = null)
        {
            this.AtlasRecordId = atlasRecordId;
            this.ClassName = className;
            this.FieldName = fieldName;
            this.Message = message;
            this.AtlasValue = atlasValue;
            this.SystemValue = systemValue;
        }

        public override string ToString()
        {
            return string.Format("{0}-{1}-{2}-{3}", this.ClassName, this.AtlasRecordId, this.FieldName, this.Message);
        }

    }
}