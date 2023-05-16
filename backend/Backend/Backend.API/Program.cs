using System.Text.Json.Nodes;
using Backend.API;
using Microsoft.AspNetCore.Mvc;

// const string DIST_PATH = "../../../frontend/dist/index.html";

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", ([FromQuery] string code) =>
{
  JsonNode? node = null;
  
  if (Json.TryParse(code, out JsonNode? json))
    node = json?.ToJsonString();
  
  return  node != null ? node.ToJsonString() : "Not a JSON";
});

app.Run();