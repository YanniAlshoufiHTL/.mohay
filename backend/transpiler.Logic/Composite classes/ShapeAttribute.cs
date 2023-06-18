using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic.Composite_interfaces {
    public class ShapeAttribute {
        public ShapeAttribute(ShapeAttribute attribute) {
            IsFillSet = attribute.IsFillSet;
            Fill = attribute.Fill;
            IsStrokeSet = attribute.IsStrokeSet;
            Stroke = attribute.Stroke;
        }
        public bool IsFillSet { get; set; } = true;
        public Color Fill { get; set; }
        public bool IsStrokeSet { get; set; } = true;
        public Color Stroke { get; set; }
    }
}