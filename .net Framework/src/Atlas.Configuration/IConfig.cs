using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Configuration
{
    public interface IConfig
    {
        string DefaultConnectionString { get; }
        string AuditConnectionString { get; }
        string ReferenceConnectionString { get; }
        string InactiveTimestampColumn { get; }
        string DeletedTimestampColumn { get; }
    }
}
