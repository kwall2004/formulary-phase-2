using Atlas.Core.BLL.Utility;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Atlas.Core.BLL.Test.Utility
{
    /// <summary>
    /// Summary description for DateTimeRangeTests
    /// 
    /// Date Time Range Class - Check for Overlapping Ranges.
    ///  -----------------------------------------
    ///  Condition 1
    ///  -----------------------------------------
    ///    |--- Date 1 ---|
    ///          | --- Date 2 --- |
    ///  -----------------------------------------
    ///  Condition 2
    ///  -----------------------------------------
    ///      | --- Date 1 --- |
    /// | --- Date 2 ---- |
    ///  -----------------------------------------
    ///  Condition 3
    ///  -----------------------------------------
    /// | -------- Date 1 -------- |
    ///      | --- Date 2 --- |
    ///  -----------------------------------------
    ///  Condition 4
    ///  -----------------------------------------
    ///      | --- Date 1 --- |
    /// | -------- Date 2 -------- |
    /// </summary>
    [TestClass]
    public class DateTimeRangeTests
    {
        DateTime baseTime = DateTime.Now;

        [TestMethod]
        public void OverlapDatesIsIntersectedSecondNewer()
        {
            // Arrange
            // Act
            // Assert

            //|--- Date 1 ---|
            //    | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));
            var r2 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-1));

            Assert.IsTrue(r1.Intersects(r2));
        }

        [TestMethod]
        public void OverlapDatesIsIntersectedSecondOlder()
        {
            // Arrange
            //        |--- Date 1 ---|
            //    | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-1));
            var r2 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));

            // Act
            // Assert
            Assert.IsTrue(r1.Intersects(r2));
        }

        [TestMethod]
        public void OverlapDatesIsIntersectedSecondSubsetOfFirst()
        {
            // Arrange
            //| -------- Date 1 -------- |
            //   | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-1));
            var r2 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-2));

            // Act
            // Assert
            Assert.IsTrue(r1.Intersects(r2));
        }

        [TestMethod]
        public void OverlapDatesIsIntersectedSecondSupersetOfFirst()
        {
            // Arrange
            //| -------- Date 1 -------- |
            //   | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-2));
            var r2 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-1));

            // Act
            // Assert
            Assert.IsTrue(r1.Intersects(r2));
        }

        [TestMethod]
        public void NonIntersectsDatesWhenSecondBeforeFirst()
        {
            // Arrange
            //                        | --- Date 1 -------- |
            //   | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-1), baseTime.AddDays(0));
            var r2 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));

            // Act
            // Assert
            Assert.IsFalse(r1.Intersects(r2));
        }

        [TestMethod]
        public void NonIntersectsDatesWhenSecondAfterFirst()
        {
            // Arrange
            //   | --- Date 1 ------ |
            //                          | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));
            var r2 = new DateTimeRange(baseTime.AddDays(-1), baseTime.AddDays(-0));

            // Act
            // Assert
            Assert.IsFalse(r1.Intersects(r2));
        }

        [TestMethod]
        public void OverlapDatesIsIntersectedSecondStartSameFirstEnd()
        {
            // Arrange
            //  |--- Date 1 ---|
            //                 | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));
            var r2 = new DateTimeRange(baseTime.AddDays(-2), baseTime.AddDays(-1));

            // Act
            // Assert
            Assert.IsTrue(r1.Intersects(r2));
        }

        [TestMethod]
        public void OverlapDatesIsIntersectedSecondEndSameFirstStart()
        {
            // Arrange
            //                     |--- Date 1 ---|
            //    | --- Date 2 --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-2), baseTime.AddDays(-1));
            var r2 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));

            // Act
            // Assert
            Assert.IsTrue(r1.Intersects(r2));
        }

        [TestMethod]
        public void InvalidDateRangeException()
        {
            // Arrange
            DateTime baseTime = DateTime.Now;
            string expetedMessage = "Invalid Date Range";
            string message = string.Empty;
            var r1 = new DateTimeRange(baseTime.AddDays(-1), baseTime.AddDays(-2));
            var r2 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));

            // Act
            try
            {
                bool intersects = r1.Intersects(r2);
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

            // Assert
            Assert.AreEqual(expetedMessage, message);
        }

        [TestMethod]
        public void CheckRangeStartsBeforeTest()
        {
            // Arrange
            // Act
            // Assert

            //|--- Check Range ---|
            //    | --- Test Range --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));
            var r2 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-1));

            Assert.IsFalse(r1.Inside(r2));
        }

        [TestMethod]
        public void CheckRangeEndsAfterTest()
        {
            // Arrange
            //        |--- Check Range ---|
            //    | --- Test Range --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-1));
            var r2 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-2));

            // Act
            // Assert
            Assert.IsFalse(r1.Inside(r2));
        }

        [TestMethod]
        public void CheckRangeContainsTest()
        {
            // Arrange
            //| -------- Check Range -------- |
            //   | --- Test Range --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-1));
            var r2 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-2));

            // Act
            // Assert
            Assert.IsFalse(r1.Inside(r2));
        }

        [TestMethod]
        public void CheckRangeSubsetTest()
        {
            // Arrange
            //| -------- Check Range -------- |
            //   | --- Test Range --- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-1));
            var r2 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-2));

            // Act
            // Assert
            Assert.IsFalse(r1.Inside(r2));
        }

        [TestMethod]
        public void CheckRangeInsidetTest()
        {
            // Arrange
            //    | -- Check Range -- |
            //   | ----- Test Range ----- |
            DateTime baseTime = DateTime.Now;
            var r1 = new DateTimeRange(baseTime.AddDays(-3), baseTime.AddDays(-2));
            var r2 = new DateTimeRange(baseTime.AddDays(-4), baseTime.AddDays(-0));

            // Act
            // Assert
            Assert.IsTrue(r1.Inside(r2));
        }
    }
}
