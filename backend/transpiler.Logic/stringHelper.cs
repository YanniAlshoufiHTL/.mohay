namespace transpiler.Logic {
    public static class StringHelper {
        public static string[] GetRectValues(string value) {
            //value = new Point(..,..), 30, 1
            string[] results = new string[3];
            string[] strings = value.Split(",");
            //discard 0 1

            results[0] = GetStringBetweenChars(value, '(', ')').Trim();
            results[1] = strings[2].Trim();
            results[2] = strings[3].Trim();

            return results;
        }

        public static string[] GetCircleVaues(string value) {
            //value = new Point(..,..), 10
            string[] results = new string[2];
            string[] strings = value.Split(",");
            //discard 0 1

            results[0] = GetStringBetweenChars(value, '(', ')').Trim();
            results[1] = strings[2].Trim();

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