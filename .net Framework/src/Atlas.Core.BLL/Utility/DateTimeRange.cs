using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.BLL.Utility
{
    /// <summary>
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
    public class DateTimeRange
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }

        /// <summary>
        /// Check to see if the Date Range overlaps with provided Date Range
        /// </summary>
        /// <param name="test">Date Range to Test</param>
        /// <returns>true if it overlaps</returns>
        public bool Intersects(DateTimeRange test)
        {
            if (this.Start > this.End || test.Start > test.End)
                throw new Exception("Invalid Date Range");

            if (this.Start == this.End || test.Start == test.End)
                return false; // No actual date range

            if (this.Start == test.Start || this.End == test.End || this.Start == test.End || this.End == test.Start)
                return true; // If any set is the same time, then by default there must be some overlap. 

            if (this.Start < test.Start)
            {
                if (this.End > test.Start && this.End < test.End)
                    return true; // Condition 1

                if (this.End > test.End)
                    return true; // Condition 3
            }
            else
            {
                if (test.End > this.Start && test.End < this.End)
                    return true; // Condition 2

                if (test.End > this.End)
                    return true; // Condition 4
            }

            return false;
        }

        /// <summary>
        /// Check to see if the Date Range is in side the Test Date Range
        /// </summary>
        /// <param name="test">the Test Date Range</param>
        /// <returns>true if it is inside the date range</returns>
        public bool Inside(DateTimeRange test)
        {
            if ((this.Start >= test.Start && this.Start <= test.End) && (test.End >= this.Start && this.End <= test.End))
            {
                return true;
            }
            return false;
        }

        #region " Constructor "
        /// <summary>
        /// Date Time Range Class
        /// </summary>
        public DateTimeRange()
        {

        }

        /// <summary>
        /// Date Time Range Class
        /// </summary>
        public DateTimeRange(DateTime? _start, DateTime? _end)
        {
            Start = _start ?? DateTime.MinValue;
            End = _end ?? DateTime.MaxValue;
        }
        #endregion
    }
}
