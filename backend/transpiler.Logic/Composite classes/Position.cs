using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    public class Position : IShape, IPosition {
        public Position(string value) {
            //value = 3,3
            string[] values = value.Split(",");
            X!.Value = Convert.ToDouble(values[0]);
            Y!.Value = Convert.ToDouble(values[1]);
        }
        public INumeric? X { get; set; }
        public INumeric? Y { get ; set; }
        public ShapeAttribute Attribute { get; set; }

        public string ToJSCode() {
            throw new NotImplementedException();
        }
    }
}