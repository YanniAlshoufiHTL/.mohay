using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic {
    internal static class StringHelper {
        internal static string[] GetRectValues(string value) {
            //value = new Point(..,..), 30, 1
            string[] results = new string[3];
            string[] strings = value.Split(",");
            //discard 0 1

            results[0] = GetStringBetweenChars(value, '(', ')');
            results[1] = strings[2];
            results[2] = strings[3];
            return results;
        }
        /// <summary>
        /// returns the string between two chars
        /// </summary>
        /// <param name="input"></param>
        /// <param name="startChar"></param>
        /// <param name="endChar"></param>
        /// <returns></returns>
        private static string GetStringBetweenChars(string input, char startChar, char endChar) {
            int startIndex = input.IndexOf(startChar);
            int endIndex = input.IndexOf(endChar);

            if (startIndex >= 0 && endIndex >= 0 && startIndex < endIndex) {
                return input.Substring(startIndex + 1, endIndex - startIndex - 1);
            }

            return string.Empty;
        }
    }

}