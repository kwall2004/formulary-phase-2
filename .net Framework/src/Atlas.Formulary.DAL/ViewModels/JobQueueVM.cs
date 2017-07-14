using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class JobQueueVM
    {
        public long JobSK { get; set; }
        public long JobTypeSK { get; set; }
        public string JobTypeCode { get; set; }
        public long JobNbr { get; set; }
        public string JobDesc { get; set; }
        public DateTime? JobStartTs { get; set; }
        public DateTime? JobEndTs { get; set; }
        public string StatDesc { get; set; }
        public string UserId { get; set; }
        public string Actn { get; set; }
        public string Rslt { get; set; }
    }
}
