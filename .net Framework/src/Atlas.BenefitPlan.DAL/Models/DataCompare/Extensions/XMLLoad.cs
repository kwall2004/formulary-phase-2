using Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Xml.Linq;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions
{
    public static class XMLLoad
    {
        public static T Load<T>(this T entity, XElement elements) where T : new()
        {
            foreach (PropertyInfo propertyInfo in entity.GetType().GetProperties())
            {
                switch (propertyInfo.Name)
                {
                    case "Processed":
                    propertyInfo.SetValue(entity, false);
                    break;
                default:
                    if (elements.ElementExists(propertyInfo.Name))
                    {
                        if (propertyInfo.IsNonStringEnumerable())
                        {
                            MultipleNodes(entity, elements, propertyInfo);
                        }
                        else
                        {
                            SingleNode(entity, elements, propertyInfo);
                        }
                    }
                    break;
                }
            }
            return entity;
        }

        public static List<T> LoadList<T>(this List<T> entities, IEnumerable<XElement> nodes) where T : new()
        {
            foreach (XElement node in nodes)
            {
                T entity = new T().Load(node);
                entities.Add(entity);
            }
            return entities;
        }

        private static object CleanseData(string input, Type propertyType)
        {
            switch (propertyType.ToString())
            {
                case "System.Boolean":
                    input = (input == "0" || input == string.Empty) ? "false" : (input == "1") ? "true" : input;
                    break;
                case "System.Int32":
                case "System.Int64":
                    input = (input == string.Empty) ? "0" : input;
                    break;
                case "System.Decimal":
                    input = (input == string.Empty) ? "0.0" : input;
                    break;
                default:
                    break;
            }
            return (input == string.Empty) ? null : Convert.ChangeType(input, propertyType);
        }
     
        private static void MultipleNodes<T>(T entity, XElement elements, PropertyInfo propertyInfo) where T : new()
        {
            IEnumerable<XElement> nodes = elements.DescendantsOrEmpty(propertyInfo.Name);

            switch (propertyInfo.Name)
            {
                case "AllowedPrescriber":
                    propertyInfo.SetValue(entity, new List<AllowedPrescriber>().LoadList(nodes));
                    break;
                case "Benefit":
                    propertyInfo.SetValue(entity, new List<Benefit>().LoadList(nodes));
                    break;
                case "Copay":
                    propertyInfo.SetValue(entity, new List<Copay>().LoadList(nodes));
                    break;
                case "CopayDistribution":
                    propertyInfo.SetValue(entity, new List<CopayDistribution>().LoadList(nodes));
                    break;
                case "CoveragePhase":
                    propertyInfo.SetValue(entity, new List<CoveragePhase>().LoadList(nodes));
                    break;
                case "DAWCopay":
                    propertyInfo.SetValue(entity, new List<Merlin.DAWCopay>().LoadList(nodes));
                    break;
                case "Group":
                    propertyInfo.SetValue(entity, new List<Group>().LoadList(nodes));
                    break;
                case "LocationCoverage":
                    propertyInfo.SetValue(entity, new List<LocationCoverage>().LoadList(nodes));
                    break;
                case "PharmaLimits":
                    propertyInfo.SetValue(entity, new List<PharmaLimits>().LoadList(nodes));
                    break;
                case "ProgramCode":
                    propertyInfo.SetValue(entity, new List<ProgramCode>().LoadList(nodes));
                    break;
                default:
                    break;
            }
        }

        private static void SingleNode<T>(T entity, XElement elements, PropertyInfo propertyInfo) where T : new()
        {
            XElement node = elements.DescendantOrEmpty(propertyInfo.Name);

            switch (propertyInfo.Name)
            {
                case "AllowedPrescriber":
                    propertyInfo.SetValue(entity, new AllowedPrescriber().Load(node));
                    break;
                case "Benefit":
                    propertyInfo.SetValue(entity, new Benefit().Load(node));
                    break;
                case "Copay":
                    propertyInfo.SetValue(entity, new Copay().Load(node));
                    break;
                case "CopayDistribution":
                    propertyInfo.SetValue(entity, new CopayDistribution().Load(node));
                    break;
                case "CoveragePhase":
                    propertyInfo.SetValue(entity, new CoveragePhase().Load(node));
                    break;
                case "DAWCopay":
                    propertyInfo.SetValue(entity, new Merlin.DAWCopay().Load(node));
                    break;
                case "Group":
                    propertyInfo.SetValue(entity, new Group().Load(node));
                    break;
                case "LocationCoverage":
                    propertyInfo.SetValue(entity, new LocationCoverage().Load(node));
                    break;
                case "PharmaLimits":
                    propertyInfo.SetValue(entity, new PharmaLimits().Load(node));
                    break;
                case "ProgramCode":
                    propertyInfo.SetValue(entity, new ProgramCode().Load(node));
                    break;
                default:
                    Type propertyType = Nullable.GetUnderlyingType(propertyInfo.PropertyType) ?? propertyInfo.PropertyType;
                    propertyInfo.SetValue(entity, CleanseData(node.Value, propertyType), null);
                    break;
            }
        }
    }
}
