using System.Text;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    public class Circle : IShape {
        public Circle(string value, ShapeAttribute attribute) {
            //value = new Point(..,..), 10
            string[] values = StringHelper.GetCircleVaues(value);
            //values = [..,..], [..]

            Attribute = new ShapeAttribute(attribute);
        }
        public ShapeAttribute Attribute { get; set; }

        public void ToJSCode(StringBuilder builder) {
            throw new NotImplementedException();
        }
    }
}