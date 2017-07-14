using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions
{
    public static class XMLElements
    {
        public static IEnumerable<XElement> DescendantsOrEmpty(this XElement element, XName name)
        {
            return element != null
                   ? element.ElementsCaseInsensitive(name)
                   : Enumerable.Empty<XElement>();
        }

        public static XElement DescendantOrEmpty(this XElement element, XName name)
        {
            return element != null
                   ? element.ElementsCaseInsensitive(name).FirstOrDefault()
                   : null;
        }

        public static bool ElementExists(this XElement element, XName name)
        {
            return element.DescendantsOrEmpty(name).Any();
        }

        private static IEnumerable<XElement> ElementsCaseInsensitive(this XContainer source, XName name)
        {
            return source.Elements()
                .Where(e => e.Name.Namespace == name.Namespace
                    && e.Name.LocalName.Equals(name.LocalName, StringComparison.OrdinalIgnoreCase));
        }
    }
}
