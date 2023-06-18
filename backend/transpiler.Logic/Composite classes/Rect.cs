﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    internal class Rect : IShape {
        public Rect(string value, ShapeAttribute attribute) {
            //value = new Point(..,..), 30, 1 
            string[] values = StringHelper.GetRectValues(value);
            //values = [..,..], [..], [..]
            Keyword!.Name.Value = "rect";

            RectPosition = new Position(values[0], attribute);
            Size1!.Value = values[1];
            Size2!.Value = values[2];
            Attribute = new ShapeAttribute(attribute);
        }
        public void ToJSCode(StringBuilder builder) {
            Attribute.ToJSCode(builder);

            builder.AppendLine($"rect({RectPosition!.X},{RectPosition.Y},{Size1},{Size2});");
        }
        public IKeyword? Keyword { get; set; }
        public IPosition? RectPosition { get; set; }
        public IValue? Size1 { get; set; }
        public IValue? Size2 { get; set; }
        public ShapeAttribute Attribute { get; set; }
    }
}