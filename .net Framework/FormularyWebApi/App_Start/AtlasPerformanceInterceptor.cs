using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using Microsoft.Practices.Unity.InterceptionExtension;

namespace AtlasWebApi
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AtlasPerformanceInterceptorAttribute : Attribute
    { }

    public class AtlasPerformanceInterceptor : ICallHandler
    {
        public int Order
        {
            get;
            set;
        }

        public IMethodReturn Invoke(IMethodInvocation input, GetNextHandlerDelegate getNext)
        {
       
            CreateCounter(input.MethodBase.Name);
            PerformanceCounter counter = new PerformanceCounter();
            counter.CategoryName = "Atlas";
            counter.CounterName = "Atlas." + input.MethodBase.Name;
            DateTime StartTime = DateTime.Now;
            IMethodReturn result = getNext()(input, getNext);
            counter.RawValue = StartTime.Subtract(DateTime.Now).Milliseconds;
            counter.Close();
            return result;    
        }
        public static void CreateCounter(string functionName)
        {
            if (!PerformanceCounterCategory.Exists("Atlas"))
            {
                PerformanceCounterCategory.Create("Atlas",
                               "Atlas Applicaiton Monitoring", "Atlas."+ functionName,
               "");
            }
            else
            {
                Console.WriteLine("Counter already exists");
            }
        }

      
    }

}


