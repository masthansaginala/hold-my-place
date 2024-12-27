const { BlobServiceClient } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function uploadToAzure(fileBuffer, originalName, mimeType) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

  // Create blob service client
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

  // Get container client
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Generate a unique blob name
  const blobName = `${uuidv4()}-${originalName}`;

  // Get block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload file to Azure Blob
  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: mimeType, // Dynamically set the content type
    },
  });

  // Return the public URL of the uploaded image
  return blockBlobClient.url;
}

module.exports = uploadToAzure;
