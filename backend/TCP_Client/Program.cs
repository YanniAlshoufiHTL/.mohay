namespace temp;

using Newtonsoft.Json;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using transpiler.Logic;
using transpiler.Logic.Composite_classes;
using transpiler.Logic.Composite_interfaces;

class TCP_Server {
    private static ShapeAttribute globalAttribute = new();
    private static List<IExpression> expressions = new();

    private static TcpListener? tcpListener;
    private static Thread? listenThread;
    static void Main() {
        listenThread = new Thread(new ThreadStart(ListenForClients));
        listenThread.Start();
        Console.WriteLine("Server started");
        //string output = Transpile();
        //Console.WriteLine(output);
    }

    private static void ListenForClients() {
        IPAddress ipAddress = IPAddress.Parse("172.17.220.168");
        int port = 6924;

        tcpListener = new TcpListener(ipAddress, port);
        tcpListener.Start();

        Console.WriteLine("listening...");

        while (true) {
            // Accept incoming client connections
            TcpClient client = tcpListener.AcceptTcpClient();

            Thread clientThread = new Thread(new ParameterizedThreadStart(HandleClientConnection)) {
                IsBackground = true
            };
            clientThread.Start(client);
        }
    }

    private static void HandleClientConnection(object clientObj) {
        TcpClient client = (TcpClient)clientObj;
        Console.WriteLine("Client connected: " + client.Client.RemoteEndPoint);
        while (client.Connected) {
            try {
                NetworkStream stream = client.GetStream();

                byte[] buffer = new byte[1024];
                int bytesRead = stream.Read(buffer, 0, buffer.Length);
                string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);

                string? output = Transpile(receivedData);
                Console.WriteLine(output);

                byte[] responseBytes = Encoding.UTF8.GetBytes(output);
                stream.Write(responseBytes, 0, responseBytes.Length);
            }
            catch (Exception ex) {
                client.Close();
                Console.WriteLine("Disconnected from Client\n\n");
                Console.WriteLine("Error: " + ex.Message);
            }
        }
        Console.WriteLine("Disconnected from Client\n\n");
    }
    static string Transpile(string input = null) {

        //input = "wow EEE = 10\r\nrect (EEE,EEE) EEE EEE\r\nline (1,1) (1,1)\r\npoint (1,1)\r\nrect (1,1) 10 10\r\ncircle (1,1) 10\r\narc (1,1) 10 20 30\r\nc #123456\r\nf true\r\nf false\r\ns true\r\ns false\r\nline (1,1) (1,1)";
        //input = "wow E = 10\r\nrect (E, E*20) 10 E";

        globalAttribute = new();
        expressions = new();

        input = input.Replace("\r", String.Empty);
        string[] values = input.Split("\n");

        values = values.Where(s => !string.IsNullOrEmpty(s)).ToArray();

        foreach (string value in values) {
            string firstvalue = value.Split(" ")[0];

            string line = StringHelper.RemoveCharBetween(value, '(', ')', ' ');

            switch (firstvalue) {
                case "wow":
                    //wow EEE = 10;
                    expressions.Add(new Constant(line));
                    break;
                case "line":
                    //line (1, 1) (1, 1)
                    expressions.Add(new Line(line, globalAttribute));
                    break;
                case "point":
                    //point (1, 1)
                    expressions.Add(new Point(line, globalAttribute));
                    break;
                case "rect":
                    //rect (1, 1) 10 10
                    expressions.Add(new Rect(line, globalAttribute));
                    break;
                case "circle":
                    //circle (1, 1) 10
                    expressions.Add(new Circle(line, globalAttribute));
                    break;
                case "arc":
                    //arc (1, 1) 10 20 30y
                    expressions.Add(new Arc(line, globalAttribute));
                    break;
                case "f":
                    //f true or f false
                    globalAttribute.Fill = line.Split(" ")[1] == "true" ?
                                        globalAttribute.GlobalColor : "#fff";
                    break;
                case "s":
                    //s true or s false
                    globalAttribute.Stroke = line.Split(" ")[1] == "true" ?
                                        globalAttribute.GlobalColor : "#fff";
                    break;
                case "c":
                    string color = line.Split(" ")[1];

                    globalAttribute.GlobalColor = color;
                    break;
                default:
                    expressions.Add(new Variable(line));
                    break;
            }
        }

        StringBuilder builder = new();

        foreach (var expression in expressions) {
            var toJsMethod = expression.GetType().GetMethod("ToJSCode");

            toJsMethod?.Invoke(expression, new object[] { builder });
        }

        string str = builder.ToString().Replace("\r", "").Replace("\n", "");

        return str;
    }
}
