require('dotenv').config(); // Ensure environment variables are loaded
const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs-extra');
const path = require('path');

const uri = process.env.MONGO_URI || "mongodb+srv://rsj27:Romirowii122$@ccakescluster.9lh5hua.mongodb.net/?retryWrites=true&w=majority&appName=CCakesCluster";
const dbName = 'CCakes';

// MongoDB connection
const connectDB = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('MongoDB connected');
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Function to retrieve an image by filename
const retrieveImageByFilename = async (filename, outputPath, db) => {
  try {
    // Initialize GridFS
    const bucket = new GridFSBucket(db, { bucketName: 'cakePictures' });

    // Find the file by filename
    const files = await db.collection('cakePictures.files').find({ filename }).toArray();

    if (files.length === 0) {
      console.error('File not found');
      return;
    }

    const fileId = files[0]._id; // Get the file ID from the first result

    // Create a writable stream to save the file
    const writeStream = fs.createWriteStream(outputPath);
    
    // Create a read stream from GridFS
    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('data', (chunk) => {
      console.log('Downloading data chunk received.');
    });

    downloadStream.on('end', () => {
      console.log('Download complete.');
    });

    downloadStream.on('error', (err) => {
      console.error('Error downloading file:', err);
    });

    // Pipe the download stream to the writable stream
    downloadStream.pipe(writeStream);

    // Wait for the writable stream to finish
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

  } catch (error) {
    console.error('Error retrieving image:', error);
  }
};

// Main function to retrieve an image
const main = async () => {
  let client;
  try {
    const { client: connectedClient, db } = await connectDB(); // Ensure the DB is connected
    client = connectedClient;

    const filename = 'image_1720460786.jpg'; // Replace with your filename
    const outputPath = path.join(__dirname, 'downloaded_image.jpg'); // Path where the image will be saved

    await retrieveImageByFilename(filename, outputPath, db);

  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    if (client) {
      await client.close(); // Close the MongoDB client connection
    }
  }
};

main();
