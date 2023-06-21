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
            Fill = attribute.Fill;
            Stroke = attribute.Stroke;
            GlobalColor = attribute.GlobalColor;
        }
        public void ToJSCode(StringBuilder builder) {
            builder.AppendLine($"fill('{Fill}');");
            builder.AppendLine($"stroke('{Stroke}');");
        }
        public string GlobalColor { get; set; }
        public string Fill { get; set; } = "#000000"; //hex format
        public string Stroke { get; set; } = "#000000"; //hex format
    }
}