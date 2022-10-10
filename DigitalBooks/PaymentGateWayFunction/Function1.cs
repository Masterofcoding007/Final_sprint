using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;

namespace PaymentGateWayFunction
{
    public static class Function1
    {
        [FunctionName("PaymentFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Payment HTTP trigger function processed a request.");

            string purchaseId = req.Query["purchaseId"];
            string emailID = req.Query["emailID"];
            string bookID = req.Query["bookID"];
            string paymentMode = req.Query["paymentMode"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            purchaseId = purchaseId?? data?.purchaseId;
            emailID = emailID ?? data?.emailID;
            bookID = bookID ?? data?.bookID;
            paymentMode = paymentMode ?? data?.paymentMode;

            try
            {
                using (SqlConnection connection = new SqlConnection(Environment.GetEnvironmentVariable("SqlConnectionString")))
                {
                    connection.Open();
                    if (!String.IsNullOrEmpty(emailID) && !String.IsNullOrEmpty(bookID)
                        && !String.IsNullOrEmpty(paymentMode))
                    {
                        var query = $"INSERT INTO Purchase (PurchaseId, EmailId,BookId,PurchaseDate,PaymentMode) VALUES('{purchaseId}','{emailID}','{bookID}'," +
                            $"'{DateTime.Now.ToString("MM/dd/yyyy")}','{paymentMode}')";
                        SqlCommand command = new SqlCommand(query, connection);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e)
            {
                log.LogError(e.ToString());
                return new BadRequestResult();
            }
            return new OkResult();
        }
    }
}
