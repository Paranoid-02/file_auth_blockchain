import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const projectId = '2QE51EoiR2Q8c8pA8B20c0VXynf';
  const projectSecret = 'c9ff0f3c14ddb3e9c193088ddd1fbb9f';
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const subdomain = 'https://data.infura-ipfs.io';
      try {
         const added = await client.add(file);
         const URL = `${subdomain}/ipfs/${added.path}`;
         await contract.add(account, URL);
         console.log(URL)
         return URL;
      } catch (error) {
         console.log('Error uploading file to IPFS.');
       }
      // try {
      //   const formData = new FormData();
      //   formData.append("file", file);

      //   const resFile = await axios({
      //     method: "post",
      //     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      //     data: formData,
      //     headers: {
      //       pinata_api_key: "dd932ae1bbc5bff828c8",
      //       pinata_secret_api_key:
      //         "d9c8a83e646c5fa66b7c368b2dc319b26584413818d4b31fc9bf1c40f893e01c",
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
       
      //   const FileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      //   await contract.add(account, FileHash);
      //   alert("File uploaded successfully");
      //   setFileName("No file selected");
      //   setFile(null);
      // } catch (e) {
      //   alert("Error uploading file to Pinata");
      // }
    }
  };

  const retrieveFile = async (e) => {
    const data = e.target.files[0];
    console.log(data)
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(data.name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label className="choose" htmlFor="file-upload">
          Choose file
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
