using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Xml.Linq;

namespace BenefitPlanCompare.Models
{
    public static class XMLExtensions
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
        
        private static List<T> LoadList<T>(this List<T> entities, IEnumerable<XElement> nodes) where T : new()
        {
            foreach (XElement node in nodes)
            {
                T entity = new T().Load(node);
                entities.Add(entity);
            }
            return entities;
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
                    propertyInfo.SetValue(entity, new DAWCopay().Load(node));
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
                    propertyInfo.SetValue(entity, new List<DAWCopay>().LoadList(nodes));
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

        private static IEnumerable<XElement> DescendantsOrEmpty(this XElement element, XName name)
        {
            return element != null
                   ? element.ElementsCaseInsensitive(name)
                   : Enumerable.Empty<XElement>();
        }

        private static XElement DescendantOrEmpty(this XElement element, XName name)
        {
            return element != null
                   ? element.ElementsCaseInsensitive(name).FirstOrDefault()
                   : null;
        }

        private static bool ElementExists(this XElement element, XName name)
        {
            return element.DescendantsOrEmpty(name).Any();
        }

        private static IEnumerable<XElement> ElementsCaseInsensitive(this XContainer source, XName name)
        {
            return source.Elements()
                .Where(e => e.Name.Namespace == name.Namespace
                    && e.Name.LocalName.Equals(name.LocalName, StringComparison.OrdinalIgnoreCase));
        }

        private static bool IsNonStringEnumerable(this PropertyInfo pi)
        {
            return pi != null && pi.PropertyType.IsNonStringEnumerable();
        }

        public static bool IsUserDefined(this PropertyInfo pi)
        {
            return pi != null && pi.PropertyType.IsClass && !pi.PropertyType.FullName.StartsWith("System");
        }

        private static bool IsNonStringEnumerable(this object instance)
        {
            return instance != null && instance.GetType().IsNonStringEnumerable();
        }

        private static bool IsNonStringEnumerable(this Type type)
        {
            if (type == null || type == typeof(string))
                return false;
            return typeof(IEnumerable).IsAssignableFrom(type);
        }

        private static Type GetBaseTypeOfEnumerable(IEnumerable enumerable)
        {
            if (enumerable == null)
            {
                //you'll have to decide what to do in this case
            }

            var genericEnumerableInterface = enumerable
                .GetType()
                .GetInterfaces()
                .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IEnumerable<>));

            if (genericEnumerableInterface == null)
            {
                //If we're in this block, the type implements IEnumerable, but not IEnumerable<T>;
                //you'll have to decide what to do here.

                //Justin Harvey's (now deleted) answer suggested enumerating the 
                //enumerable and examining the type of its elements; this 
                //is a good idea, but keep in mind that you might have a
                //mixed collection.
            }

            var elementType = genericEnumerableInterface.GetGenericArguments()[0];
            return elementType.IsGenericType && elementType.GetGenericTypeDefinition() == typeof(Nullable<>)
                ? elementType.GetGenericArguments()[0]
                : elementType;
        }
    }
}