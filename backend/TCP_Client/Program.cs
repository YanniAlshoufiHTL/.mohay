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
    }

    private static void ListenForClients() {
        IPAddress ipAddress = IPAddress.Parse("172.17.210.91");
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

                var variable = JsonConvert.DeserializeObject(receivedData);

                string? output = Transpile(variable!.ToString());

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
        //string input = "wow EEE = 10";

        globalAttribute = new();
        expressions = new();
        
        input = input.Replace("\r", String.Empty);
        string[] values = input.Split('\n');

        foreach (string value in values) {

            string[] vaasdawad = value.Split(" ");
            string firstvalue = value.Split(" ")[0];

            if (vaasdawad.Length == 1)
                Console.WriteLine();

            switch (firstvalue) {
                case "wow":
                    //wow EEE = 10;
                    expressions.Add(new Constant(value));
                    break;
                case "line":
                    //line (1, 1) (1, 1)
                    expressions.Add(new Line(value, globalAttribute));
                    break;
                case "point":
                    //point (1, 1)
                    expressions.Add(new Point(value, globalAttribute));
                    break;
                case "rect":
                    //rect (1, 1) 10 10
                    expressions.Add(new Rect(value, globalAttribute));
                    break;
                case "circle":
                    //circle (1, 1) 10
                    expressions.Add(new Circle(value, globalAttribute));
                    break;
                case "arc":
                    //arc (1, 1) 10 20 30y
                    expressions.Add(new Arc(value, globalAttribute));
                    break;
                case "f":
                    //f true or f false
                    globalAttribute.IsFillSet = value.Split(" ")[1] == "true";
                    break;
                case "s":
                    //s true or s false
                    globalAttribute.IsStrokeSet = value.Split(" ")[1] == "true";
                    break;
                case "c":
                    string color = value.Split(" ")[1];

                    if (globalAttribute.IsFillSet) {
                        globalAttribute.Fill = color;
                    }

                    if (globalAttribute.IsStrokeSet) {
                        globalAttribute.Stroke = color;
                    }
                    break;
                default:
                    expressions.Add(new Variable(value));
                    break;
            }
        }

        StringBuilder builder = new();

        builder.AppendLine(
            @"
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <title>Canvas Application</title>
                </head>
                <body>
                <script type='text/javascript'>
                    function loadP5JS() {
                        var script = document.createElement('script');
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js';
                        script.async = true;

                        script.onload = function() {
                            console.log('p5.js has been loaded!');
                        };

                        document.head.appendChild(script);
                    }

                    loadP5JS();

                    function setup() {
                        createCanvas(400, 400);
                    }
                    function draw() {
                        background(255);
                    ");

        foreach (var expression in expressions) {
            var toJsMethod = expression.GetType().GetMethod("ToJSCode");

            toJsMethod?.Invoke(expression, new object[] { builder });
        }
  
        builder.AppendLine(
            @"        }
                      </script>
                  </body>
              </html>
             ");

        string str = builder.ToString().Replace("\r", "").Replace("\n", "");

        return str;
    }
}
