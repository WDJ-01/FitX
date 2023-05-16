using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using UserApi.Models;

namespace UserApi.Helper
{
    public class HashingPassword
    {
        public class Data
        {
            public string HashValue { get; set; }
            public byte[] SaltValue { get; set; }
        }


        public static Data HashPassword(string password)
        {
            byte[] salt;
            const int keySize = 64;
            const int iterations = 350000;
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;


            salt = RandomNumberGenerator.GetBytes(keySize);

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);
            var returnValue = new Data();
            returnValue.HashValue = Convert.ToHexString(hash);
            returnValue.SaltValue = salt;

            return returnValue;
        }
        public static Data Method(string password)
        {
            var data = HashPassword(password);

            return data;

        }

         public static bool VerifyPassword(string password, string hash, byte[] salt)
         {
            const int keySize = 64;
            const int iterations = 350000;
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

            //byte[] saltValue = Encoding.UTF8.GetBytes(salt);

            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, hashAlgorithm, keySize);

            return hashToCompare.SequenceEqual(Convert.FromHexString(hash));
         }

    }
}
