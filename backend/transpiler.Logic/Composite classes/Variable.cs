using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_values;

namespace transpiler.Logic.Composite_classes {
    public class Variable : IVariable {
        public Variable(string value) {
            //x1 = ...
            string[] values = value.Split(" ");
            Name = new Value(values[0]);
            Value = new Value(values[2]);
        }
        public IValue Name { get; set; }
        public IValue Value { get; set; }
    }
}