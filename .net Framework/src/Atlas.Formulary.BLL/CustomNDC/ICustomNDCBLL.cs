using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.CustomNDC
{
    /// <summary>
    /// Business logic for custom NDC's.
    /// </summary>
    public interface ICustomNDCBLL
    {
        /// <summary>
        /// Get's all the formularies that a custom NDC is a part of. 
        /// </summary>
        /// <param name="ndc"></param>
        /// <returns></returns>
        List<CustomNDCFormularyVM> GetFormulariesForNDC(string ndc);
    }
}
