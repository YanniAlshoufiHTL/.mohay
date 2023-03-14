using System.Text.Json.Nodes;

namespace Backend.API;

public static class Json
{
  public static bool TryParse(string str, out JsonNode? json)
  {
    bool isJson = true;
    json = null;
    
    try
    {
      json = JsonNode.Parse(str);
    }
    catch
    {
      isJson = false;
    }

    return isJson;
  }
}