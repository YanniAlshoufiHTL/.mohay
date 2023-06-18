namespace temp;
using transpiler.Logic;
class Temp {
    static void Main(string[] args) {
        string[] values = StringHelper.GetRectValues("new Point(3, 3), 10, 10");

        foreach(var value in values) {
            Console.WriteLine(value);
        }
    }
}