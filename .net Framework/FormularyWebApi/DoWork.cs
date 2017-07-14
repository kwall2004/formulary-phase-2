using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace AtlasWebApi
{
    public class DoWork : IDoWork
    {

        [AtlasPerformanceInterceptorAttribute]
        public void doSomething()
        {

             PerformanceCounter counter = new PerformanceCounter();
            counter.CategoryName = "Atlas";
            counter.CounterName = "Atlas." + "DoSomething";
            DateTime StartTime = DateTime.Now;
            System.Threading.Thread.Sleep(4000);

            try
            {
                counter.ReadOnly = false;
                counter.RawValue = (long)DateTime.Now.Subtract(StartTime).Milliseconds;

            }
            catch (Exception ex)
            {

                throw ex;
            }
            counter.Close();
 
        }
        public void doSomethingElse()
        {
    
            PerformanceCounter counter = new PerformanceCounter();
            counter.CategoryName = "Atlas";
            counter.CounterName = "Atlas." + "DoSomethingElse";
            DateTime StartTime = DateTime.Now;
            System.Threading.Thread.Sleep(100);
            try
            {
                counter.ReadOnly = false;
                counter.RawValue = (long)DateTime.Now.Subtract(StartTime).Milliseconds;

            }
            catch (Exception ex)
            {

                throw ex;
            }
            counter.Close();

        }
        

    }
}