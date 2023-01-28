VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "clsMatchYou"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False

Option Explicit

Private FS As Object
Private Const ForReading = 1
Private Const ForWriting = 2

Public Sub MatchYou()
    Dim File As Variant, ProjectFile As Object
    Dim ProjectFileContent As String, Line As String
    Set FS = CreateObject("Scripting.FileSystemObject")
    'Iterate through the folder to find the VBP project file
    For Each File In FS.GetFolder(App.Path).Files
        If LCase(Right$(File.Name, 3)) = "vbp" Then
            Set ProjectFile = FS.OpenTextFile(File.Path, ForReading)
            ProjectFileContent = ""
            'Remove added object references and external widgets
            While Not ProjectFile.AtEndOfStream
                Line = ProjectFile.ReadLine
                If Not ((Left$(Line, 9) = "Reference" And Right$(Line, 14) <> "OLE Automation") Or _
                   (Left$(Line, 6) = "Object"))
                   ProjectFileContent = ProjectFileContent & Line & vbCrLf
                End If
            Wend
            ProjectFile.Close
            Set ProjectFile = FS.OpenTextFile(File.Path, ForWriting)
            ProjectFile.Write Trim(ProjectFileContent)
            ProjectFile.Close
            Exit For
        End If
    Next
End Sub
