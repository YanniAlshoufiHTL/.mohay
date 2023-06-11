using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_classes {
    internal class Arc : IKeyword {
        public IString? Name { get; set; }
        public IPosition? pos { get; set; }
        public INumeric? radius { get; set; }
        public IAngle? angl1 { get; set; }
        public IAngle? angl2 { get; set; }
    }
}