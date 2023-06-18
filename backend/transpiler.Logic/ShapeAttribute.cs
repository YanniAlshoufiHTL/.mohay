using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic {
    public class ShapeAttribute {
        public ShapeAttribute(ShapeAttribute attribute) {
            IsFillSet = attribute.IsFillSet;
            Fill = attribute.Fill;
            IsStrokeSet = attribute.IsStrokeSet;
            Stroke = attribute.Stroke;
        }
        public void ToJSCode(StringBuilder builder) {
            if (IsFillSet) {
                builder.AppendLine($"fill('rgba({Fill.R},{Fill.G}, {Fill.B}, {Fill.A})');");
            }

            if (IsStrokeSet) {
                builder.AppendLine($"stroke('rgba({Fill.R},{Fill.G}, {Fill.B}, {Fill.A})');");
            }
        }
        public bool IsFillSet { get; set; } = true;
        public Color Fill { get; set; }
        public bool IsStrokeSet { get; set; } = true;
        public Color Stroke { get; set; }
    }
}