using Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions
{
    public static class Compare
    {
        public static List<CompareResults> CompareClass<T>(this T obj, T another) where T : class
        {
            List<CompareResults> results = new List<CompareResults>();

            switch (obj.GetType().Name)
            {
                case "AtlasBenefitPlanForMerlin":
                    AtlasBenefitPlanForMerlin rootBase = (AtlasBenefitPlanForMerlin)Convert.ChangeType(obj, typeof(AtlasBenefitPlanForMerlin));
                    AtlasBenefitPlanForMerlin rootComp = (AtlasBenefitPlanForMerlin)Convert.ChangeType(another, typeof(AtlasBenefitPlanForMerlin));
                    results.AddRange(rootBase.Compare(rootComp));
                    break;
                case "Group":
                    Group groupBase = (Group)Convert.ChangeType(obj, typeof(Group));
                    Group groupComp = (Group)Convert.ChangeType(another, typeof(Group));
                    results.AddRange(groupBase.Compare(groupComp));
                    break;
                case "Benefit":
                    Benefit benefitBase = (Benefit)Convert.ChangeType(obj, typeof(Benefit));
                    Benefit benefitComp = (Benefit)Convert.ChangeType(another, typeof(Benefit));
                    results.AddRange(benefitBase.Compare(benefitComp));
                    break;
                default:
                    break;
            }
            return results;
        }

        public static List<CompareResults> CompareEx<T>(this T obj, T another) where T : class
        {
            PropertyInfo propAtlasRecordId = obj.GetType().GetProperty("AtlasRecordId");
            string valAtlasRecordId = (propAtlasRecordId == null)
               ? string.Empty
               : (string)propAtlasRecordId.GetValue(obj, null);

            PropertyInfo propExcludedEntity = obj.GetType().GetProperty("ExcludedEntity");
            List<string> valExcludedEntity = (propExcludedEntity == null)
                ? new List<string>()
                : new List<string>((IEnumerable<string>)propExcludedEntity.GetValue(obj, null));

            List<CompareResults> results = new List<CompareResults>();

            if (ReferenceEquals(obj, another)) return results;
            if ((obj == null) || (another == null))
            {
                results.Add(CompareFunctions.PopulateErrorMessage(className: obj.GetType().Name, message: "There was nothing to Compare"));
                return results;
            }

            //properties: int, double, DateTime, etc, not class
            if (!obj.GetType().IsClass)
            {
                if (!obj.Equals(another))
                {
                    results.Add(CompareFunctions.PopulateErrorMessage(
                        className: obj.GetType().Name
                        , message: "System Class did not Match"
                        , atlasValue: obj == null ? null : obj.ToString()
                        , systemValue: another == null ? null : another.ToString()));
                }
                return results;
            }

            foreach (PropertyInfo property in obj.GetType().GetProperties().Where(w => !valExcludedEntity.Contains(w.Name)))
            {
                Type propertyType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                var objValue = CleanseData(property.GetValue(obj), propertyType);
                var anotherValue = CleanseData(property.GetValue(another), propertyType);

                if (!(objValue == null && anotherValue == null))
                {
                    if ((objValue == null && anotherValue != null) || !objValue.Equals(anotherValue))
                    {
                        results.Add(CompareFunctions.PopulateErrorMessage(
                            atlasRecordId: valAtlasRecordId
                            , className: obj.GetType().Name
                            , fieldName: property.Name
                            , message: string.Format("Item does not match ({0}) ({1})"
                                    , objValue == null ? "NULL" : objValue.ToString()
                                    , anotherValue == null ? "NULL" : anotherValue.ToString())
                            , atlasValue: objValue == null ? null : objValue.ToString()
                            , systemValue: anotherValue == null ? null : anotherValue.ToString()));
                    }
                }
            }

            results.AddRange(obj.CompareClass(another));
            return results;
        }

        private static object CleanseData(object input, Type propertyType)
        {
            switch (propertyType.ToString())
            {
                case "System.Boolean":
                    input = (input == null) ? false : input;
                    break;
                case "System.String":
                    input = (input == null) ? string.Empty : input;
                    break;
                case "System.Int32":
                case "System.Int64":
                    input = (input == null) ? 0 : input;
                    break;
                case "System.Decimal":
                    input = (input == null) ? (decimal)0.0 : input;
                    break;
                default:
                    break;
            }
            return input;
        }
    }
}
