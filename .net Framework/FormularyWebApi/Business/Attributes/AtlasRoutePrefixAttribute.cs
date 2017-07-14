using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
namespace MerlinApi.Business.Attributes
{
    public class MerlinRoutePrefixAttribute : RoutePrefixAttribute
    {
        public MerlinRoutePrefixAttribute(string prefix)
            : base(prefix)
        {

        }
        public override string Prefix
        {
            get
            {
                return "api/" + base.Prefix;
            }
        }



    }
}