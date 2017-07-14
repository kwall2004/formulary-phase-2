using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class TierNamesVM
    {
        public long FormularySK { get; set; }
        public string TierNumber_List { get; set; }
        public string TierName_List { get; set; }
        public DateTime EffectiveStartDate { get; set; }
        public DateTime EffectiveEndDate { get; set; }
        public DateTimeOffset InactiveTimestamp { get; set; }
        public DateTimeOffset DeletedTimestamp { get; set; }
        public string UserID { get; set; }

    }
}