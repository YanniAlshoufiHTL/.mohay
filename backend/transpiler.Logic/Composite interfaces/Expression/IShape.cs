using System.Text;

namespace transpiler.Logic.Composite_interfaces.Expression {
    public interface IShape : IExpression {
        public ShapeAttribute Attribute { get; set; }
        public void ToJSCode(StringBuilder builder);
    }
}