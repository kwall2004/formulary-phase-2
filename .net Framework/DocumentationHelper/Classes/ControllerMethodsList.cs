using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DocumentationHelper.Classes
{
    public class ControllerMethodsList
    {

        public List<MethodInfo> Methods { get; set; }
        public int ControllerId { get; set; }

        public ControllerMethodsList(List<MethodInfo> methods, int controllerId)
        {
            Methods = methods;
            ControllerId = controllerId;

            //loop methods. For each method, instantiate a ControllerMethod object
            foreach (var method in this.Methods)
            {   
                var ControllerMethod = new ControllerMethod(method, this.ControllerId);
            }
        }
    }
}
