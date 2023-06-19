namespace transpiler.Logic {
    public static class StringHelper {
        internal static string[] GetArcValues(string value) {
            //value = arc (1, 1) 10 20 30 
            //values = [(..,..)], [..] [..] [..]
            string[] values = value.Split(' ');

            string[] results = new string[4];

            results[0] = "(" + GetStringBetweenChars(value, '(', ')') + ")";
            results[1] = values[3];
            results[2] = values[4];
            results[3] = values[5];

            return results;
        }
        public static string[] GetCircleVaues(string value) {
            //value = circle (1, 1) 10
            //values = [(..,..)] [..]

            string[] results = new string[2];

            string[] values = value.Split(' ');

            results[0] = "(" + GetStringBetweenChars(value, '(', ')') + ")";
            results[1] = values[3];

            return results;
        }
        internal static string[] GetConstantValues(string value) {
            //wow EEE = ...
            //[EEE] [...]

            string[] results = new string[2];

            string[] values = value.Split(" ");

            results[0] = values[1];
            results[1] = values[3];

            return results;
        }
        internal static string[] GetLineValues(string value) {
            //value = line (1, 1) (1, 1)
            //values = [(..,..)] [(..,..)]

            string[] results = new string[2];

            return null;
        }
        internal static string[] GetPointValues(string value) {
            //value = point (1, 1)
            //[..] [..]
            string cords = GetStringBetweenChars(value, '(', ')');
            //1, 1
            string[] values = cords.Split(",");

            string[] results = new string[2];

            results[0] = values[0].Trim();
            results[1] = values[1].Trim();

            return results;
        }
        public static string[] GetRectValues(string value) {
            //value = rect (1, 1) 10 30
            //values = [(..,..)] [..] [..]

            string[] results = new string[3];

            return null;
        }
        #region string methods

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
        public static List<string> GetStringsBetweenChars(string input, char startChar, char endChar) {
            List<string> result = new List<string>();
            int startIndex = -1;
            int endIndex = -1;

            for (int i = 0; i < input.Length; i++) {
                if (input[i] == startChar) {
                    startIndex = i;
                }
                else if (startIndex != -1 && input[i] == endChar) {
                    endIndex = i;
                    string substring = input.Substring(startIndex + 1, endIndex - startIndex - 1);
                    result.Add(substring);
                    startIndex = -1;
                    endIndex = -1;
                }
            }

            return result;
        }


        #endregion string methods
    }

}