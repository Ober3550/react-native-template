import React, { useState } from "react";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

export default function UploadForm() {
  const [file, setFile] = useState<any>(null);

  async function handleFilePick() {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result && result.output && result.output.length > 0) {
        setFile(result.output.item(0));
      } else {
        console.log("Document pick cancelled");
      }
    } catch (err) {
      console.error("Error picking document", err);
    }
  }

  return (
    <>
      <Button onPress={handleFilePick}>{file ? `Selected: ${file.name}` : "Select File"}</Button>
      <Button
        onPress={() => {
          console.log("Submit webform", file);
        }}
      >
        Submit
      </Button>
    </>
  );
}
