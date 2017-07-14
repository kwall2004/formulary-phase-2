using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Atlas.Formulary.BLL.Formulary.FormularyReviewBLL;

namespace Atlas.Formulary.BLL.Formulary
{
    /// <summary>
    /// Business logic for formulary review.
    /// </summary>
    public interface IFormularyReviewBLL
    {
        /// <summary>
        /// Gets the drugs for a formulary review based on the paramters passed. Only one param should be passed 
        /// as the stored proc makes a determination of what to return based on the parameter passed.
        /// </summary>
        /// <param name="formularySK"></param>
        /// <param name="DrugCatgSK"></param>
        /// <param name="ETC_ID"></param>
        /// <param name="AHFS_Id"></param>
        /// <param name="tierSK"></param>
        /// <returns></returns>
        List<spFormularyReview_GetV2_Result> GetFormularyReview(long formularySK, long? DrugCatgSK = null, long? ETC_ID = null, string AHFS_Id = null, string GPI = null, long? tierSK = null, Criteria criteria = null);

        /// <summary>
        /// Builds ETC tree for formulary review.
        /// </summary>
        /// <param name="formularySK"></param>
        /// <returns></returns>
        TreeChildren FormularyEtcTree(long formularySK); // TODO: Move this to a better home.

        /// <summary>
        /// Builds the AHFS tree for a formulary review.
        /// </summary>
        /// <param name="formularySK"></param>
        /// <returns></returns>
        TreeChildrenAHFS FormularyAhfsTree(long formularySK); // TODO: Move this to a better home.

        GpiTreeNode FormularyGpiTree(long formularySK);
    }
}
