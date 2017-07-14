using Atlas.Formulary.DAL;
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
    public class CustomNDCBLL : ICustomNDCBLL
    {
        private IFormularyRepositoryFactory _repoFactory;

        public CustomNDCBLL(IFormularyRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get's all the formularies that a custom NDC is a part of. 
        /// </summary>
        /// <param name="ndc"></param>
        /// <returns></returns>
        public List<CustomNDCFormularyVM> GetFormulariesForNDC (string ndc)
        {
            var mappings = new Dictionary<string, CustomNDCFormularyVM>();

            using (var repo = _repoFactory.CustomNDC())
            {
                var result = repo.GetFormulariesByNDC(ndc);

                foreach (var cndc in result)
                {
                    var formulary = new CustomNDCFormularyVM.CustomNDCFormularyFormularyVM();
                    formulary.EfctvStartDt = cndc.EfctvStartDt;
                    formulary.FormularyId = cndc.FormularyId;
                    formulary.FormularySK = cndc.FormularySK;
                    formulary.FormularyVersion = cndc.FormularyVersion;
                    formulary.FrmlryName = cndc.FrmlryName;

                    if (!mappings.ContainsKey(cndc.TenantOwner))
                    {
                        var vm = new CustomNDCFormularyVM() { TenantOwner = cndc.TenantOwner };

                        mappings.Add(cndc.TenantOwner, vm);
                    }

                    mappings[cndc.TenantOwner].Formularies.Add(formulary);
                }

                return mappings.Values.ToList();
            }
        }

    }
}
