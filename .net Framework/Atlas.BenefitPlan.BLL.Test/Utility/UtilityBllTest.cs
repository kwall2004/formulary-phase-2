using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.BenefitPlan.BLL.Utility;

namespace Atlas.BenefitPlan.BLL.Test.Utility
{
    [TestClass]
    public class UtilityBllTest
    {
        [TestInitialize]
        public void SetupTest()
        {

        }

        [TestMethod]
        public void TestItemActive()
        {
            // Arrange
            DateTime EfctvStartDtPast = new DateTime(2016, 1, 1, 2, 3, 4);
            DateTime EfctvStartDtFuture = new DateTime(2100, 1, 1, 2, 3, 4);
            DateTime EfctvEndDtPast = new DateTime(2016, 5, 20, 2, 3, 4);
            DateTime EfctvEndDtFuture = new DateTime(2100, 1, 1, 2, 3, 4);
            DateTimeOffset? InctvTsFuture = new DateTimeOffset(2100, 1,1,2,3,4, new TimeSpan(0,1,0));
            DateTimeOffset? InctvTsPast = new DateTimeOffset(2016, 1, 1, 2, 3, 4, new TimeSpan(0,1,0));

            Boolean result;
            // Act and Assert
            //start in past, end in future, inctv null should return active
            result = UtilityBll.itemActive(EfctvStartDtPast, EfctvEndDtFuture, null);
            Assert.IsTrue(result);


            // Act and Assert
            //start in future, end irrelevant, inctv null should return not active
            result = UtilityBll.itemActive(EfctvStartDtFuture, EfctvEndDtFuture, null);
            Assert.IsFalse(result);


            // Act and Assert
            //start in past, end in past, inctv null should return not active
            result = UtilityBll.itemActive(EfctvStartDtPast, EfctvEndDtPast, null);
            Assert.IsFalse(result);

            // Act and Assert
            //start in past, end in future, inctv in Past should return not active
            result = UtilityBll.itemActive(EfctvStartDtPast, EfctvEndDtFuture, InctvTsPast);
            Assert.IsFalse(result);

            // Act and Assert
            //start in past, end in future, inctv in Future should return active
            result = UtilityBll.itemActive(EfctvStartDtPast, EfctvEndDtFuture, InctvTsFuture);
            Assert.IsTrue(result);
        }
    }
}
