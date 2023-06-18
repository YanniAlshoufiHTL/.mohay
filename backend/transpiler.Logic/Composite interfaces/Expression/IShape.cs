using System.Text;

namespace transpiler.Logic.Composite_interfaces.Expression {
    public interface IShape : IExpression {
        public ShapeAttribute Attributes { get; set; }
        public IKeyword Keyword { get; set; }
        public void ToJSCode(StringBuilder builder);
    }
}