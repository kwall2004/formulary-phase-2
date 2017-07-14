using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DocumentationHelper.Classes
{
    public class ControllersList
    {

        public List<Type> Controllers { get; set; }

        public ControllersList(List<Assembly> assemblies)
        {
            //Create List of Controllers
            List<Type> controllers = new List<Type>();

            foreach(Assembly assembly in assemblies)
            {
                foreach (Type type in assembly.GetTypes())
                {
                    if (type.Name.Contains("Controller"))
                    {
                        controllers.Add(type);
                    }
                }
            }
            Controllers = controllers;
        }

        //Method to Loop List, inside this will instantiate a controller object for each controller in list 
        public void GetController()
        {
            foreach (var controller in this.Controllers)
            {
                var Controller = new Controller(controller);
            }
        }
    }
}
