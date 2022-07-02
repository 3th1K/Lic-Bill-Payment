using System.Security.Principal;
using System.Collections.Generic;
using System.Threading;
using System.Web;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace LifeInsuranceAPI.Models
{
    public static class JwtHelper
    {
        public static readonly byte[] _signInKey = Encoding.UTF8.GetBytes("D*G-KaPdSgVkYp3s");
        public static string CreateJwtToken(LoginRequest request) {

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, request.EmailAddress));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, request.EmailAddress));
            claims.Add(new Claim(ClaimTypes.Role, request.Role));

            var id = new ClaimsIdentity(claims);

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateJwtSecurityToken(new SecurityTokenDescriptor()
            {
                Expires = System.DateTime.Now.AddDays(1),
                Subject = id,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_signInKey), SecurityAlgorithms.HmacSha256)
            });

            return handler.WriteToken(token);
        }

        public static IPrincipal ValidateToken(string token) {
            var handler = new JwtSecurityTokenHandler();

            handler.ValidateToken(token, new TokenValidationParameters()
            {

                ValidAlgorithms = new[] { SecurityAlgorithms.HmacSha256 },
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuer = false,
                IssuerSigningKey = new SymmetricSecurityKey(_signInKey),
                ValidateIssuerSigningKey = true

            }, out var securityToken);
            var jwt = securityToken as JwtSecurityToken;

            var id = new ClaimsIdentity(jwt.Claims, "jwt", "email", "role");

            return new ClaimsPrincipal(id);
        }

        public static void AuthenticateRequest() {

            try
            {
                var token = HttpContext.Current.Request.Headers.Get("Authorization");
                var principal = ValidateToken(token);

                HttpContext.Current.User = principal;
                Thread.CurrentPrincipal = principal;

            }
            catch { }
        }
    }
}