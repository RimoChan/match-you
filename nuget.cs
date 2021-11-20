using System;
using System.IO;

var path = Path.Combine(
    Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".nuget");
Console.WriteLine(path);
if (Directory.Exists(path))
{
    Directory.Delete(path, true);
}

Console.WriteLine("您配吗？");
