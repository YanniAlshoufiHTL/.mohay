using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic {
    public class ShapeAttribute {
        public ShapeAttribute() {

        }
        public ShapeAttribute(ShapeAttribute attribute) {
            IsFillSet = attribute.IsFillSet;
            Fill = attribute.Fill;
            IsStrokeSet = attribute.IsStrokeSet;
            Stroke = attribute.Stroke;
        }
        public void ToJSCode(StringBuilder builder) {
            if (IsFillSet) {
                builder.AppendLine($"fill('{Fill}');");
            }

            if (IsStrokeSet) {
                builder.AppendLine($"stroke('{Stroke}');");
            }
        }
        public string GlobalColor { get; set; }
        public bool IsFillSet { get; set; } = true;
        public string Fill { get; set; } = "#000000"; //hex format
        public bool IsStrokeSet { get; set; } = true;
        public string Stroke { get; set; } = "#000000"; //hex format
    }
}